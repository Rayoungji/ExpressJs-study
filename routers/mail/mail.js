var express= require('express')
var router = express.Router()
var mysql= require('mysql')
var path=require('path')

var connection=mysql.createConnection({
    host:'localhost',
    port: 3306,
    user: 'youngji',
    password:'tjrud2509026@@',
    database:'nodeServerViemo'
})

connection.connect();

router.get('/',function(req,res){
    console.log('form.html upload success!!')
    res.sendFile(path.join(__dirname,'../../public/form.html'))
})

router.post('/submit-ejs', function(req,res){
    //get : req.param('email') -> email이라는 변수로 url을 통해 넘어도 데이터를 받는다
        console.log(req.body.email);
        res.render('email.ejs', {'email': req.body.email});
    })
    
router.post('/submit-ajax', function(req,res){
        console.log("클라이언트가 보낸 값: "+req.body.email);
        var email=req.body.email;
        var responsedata={};
        var query=connection.query('select * from user where email="' + email + '"', function(err,rows){
            if(err) err;
            if(rows[0]){
                console.log(rows[0].username)
                responsedata.result="ok";
                responsedata.name=rows[0].username;
            }
            else{
                console.log("none: "+rows[0])
                responsedata.result="not ok";
                responsedata.name="none";
            }
            res.json(responsedata)
        })
    })

    module.exports=router;