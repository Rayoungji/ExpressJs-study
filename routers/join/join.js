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
    console.log('join 라우팅 성공!!')
    res.render('join.ejs',{'message':msg})

})

//passport.serialize
passport.serializeUser(function(user, done) {
	console.log('passport session save : ', user.id)
  done(null, user.id)  
})

passport.deserializeUser(function(userid, done) {
	console.log('passport session get id: ', userid)
	done(null, userid);
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
            return done(null,false, {message:'your email is already used'})
        }
        else{
            var sql={email:email, password:password};
            var query=connection.query('insert into user set ?',sql, function(err,rows){
                if(err) throw err;
                return done(null,{'id':rows.insertId})
            })
        }
    })
}
))

router.post('/',passport.authenticate('local-join',{
    successRedirect: '/main',
	failureRedirect: '/join',
	failureFlash: true }))

module.exports=router;