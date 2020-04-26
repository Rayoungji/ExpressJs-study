var express=require('express')
var router=express.Router()
var path=require('path')
var mysql= require('mysql')
var passport=require('passport')
var LocalStrategy=require('passport-local').Strategy

var connection=mysql.createConnection({
    host:'localhost',
    port: 3306,
    user: 'youngji',
    password:'tjrud2509026@@',
    database:'nodeServerViemo'
})

connection.connect();

router.get('/',function(req,res){
    var msg;
    var errmsg=req.flash('error')
    if(errmsg)msg=errmsg;
    res.render('join.ejs',{'message':msg})

})

passport.serializeUser(function(user, done) {
	console.log('passport session save : ', user.id)
  done(null, user.id)  //세션에 user.id를 저장
})

passport.deserializeUser(function(userid, done) {
	console.log('passport session get id: ', userid)
	done(null, userid);  //클라이언트의 rep.user에 세션값(userid)전달
})

passport.use('local-join', new LocalStrategy({  
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},function(req,email,password,done){
    var query = connection.query('select * from user where email=?', [email],function(err,rows){
        if(err) return done(err);
        if(rows.length){
            console.log('이미 회원이십니당')
            return done(null,false, {message:'your email is already used'})  //클라이언트의 req.flash에 에러메세지 전달
        }
        else{
            var sql={email:email, password:password};
            var query=connection.query('insert into user set ?',sql, function(err,rows){
                if(err) throw err;
                return done(null,{'id':rows.insertId})  //Serializeuser의 user파라미터에 값을 전달
            })
        }
    })
}
))


router.post('/',passport.authenticate('local-join',{  
    //전략함수 실행 후 리턴값에 따라 해당 경로로 이동
    successRedirect: '/main',  //여기에서 최초로 세션값을 쿠키(req.user-자바에서는 헤더에 쿠키 넘겨주는 것과 비슷한 방식인듯?)로 넘겨주는 것 같음 
	failureRedirect: '/join',
	failureFlash: true }))

module.exports=router;

/*콜백함수란: 특정함수 내에서 인자값으로 받은 함수가 특정 시점에 실행되는 함수 
- done()함수인경우 passport 내에 정의된 함수가 실행되는 것이므로 자세히 할 수 없지만 실행순서를 보며 어떤 일을 실행하는지 알 수 있다*/

/*join 프로세스
클라이언트가 passport모듈로 인증을 요청한다
authenticate함수가 local-join(local strategy함수를 실행한다)
로컬 전략 함수에서 인증이 성공되었을 경우 SerializeUser함수로 세션을 생성하여 값을 저장한다 / 실패일 경우 에러메세지 생성
전략 함수 실행 결과에 따라 Redirect를 처리한다 (리다이렉트 부분도 콜백함수인듯? 그래서 로컬전략 실행후 바로 리다이렉트처리함)
인증 성공 시 클라이언트가 요청을 할때는 항상 deserializeUser가 실행되어 세션이 불려진다 (
    위의 코드일 경우 성공하면 메인으로 가는데 메인에서 get요청을 할때 req.user로 deserializeUser가 실행된다 그후 로그아웃 전까지는 모든 
    http 요청에 대하여 deserializeUser가 실행된다!!
)
*/