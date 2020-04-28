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

router.get('/list',function(req,res){
    res.render('movie.ejs')
})

//1./movie , GET
router.get('/', function(req,res){
    var Data={};
var query=connection.query('select title from movie', function(err,rows){
    if(err) throw err;
    if(rows.length){
        Data.result=1;
        Data.data=rows;
    }else{
        Data.result=0;
    }
    res.json(Data)
})
})

//2./movie , POST
router.post('/',function(req,res){
    var title=req.body.title
    var type=req.body.type
    var grade=req.body.grade
    var actor=req.body.actor

    var sql={title,type,grade,actor};
    var query=connection.query('insert into movie set ?', sql, function(err,rows){
        if(err) throw err;
        return res.json({'result':1})
    })
})

//3./movie/:title, GET 
router.get('/:title', function(req,res){
var title=req.params.title;
var Data={};
var query=connection.query('select * from movie where title=?',[title],function(err,rows){
if(err) throw err;
if(rows.length){
    Data.result=1;
    Data.data=rows;
    console.log(rows)
}
else{
    Data.result=0;
}
res.json(Data)
})
})

//4./movie/:title DELETE
router.delete('/:title',function(req,res){
    var title=req.params.title;
    var Data={};

    var query=connection.query('delete from movie where title =?',[title],function(err,rows){
    if(err) throw err;
    console.log(rows)
    if(rows.affectedRows>0){
        Data.result=1;
        Data.data=title;
    }
    else{
        Data.result=0;
    }
    res.json(Data)
    })
})

module.exports=router;