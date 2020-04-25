var express=require('express')
var router=express.Router()
var path= require('path') 

router.get('/',function(req,res){
    console.log('라우트 분리 성공-')
    console.log("main: ",req.user)
    console.log(res.user)
    var id=req.user
    res.render('main.ejs',{'id':id})
})

module.exports=router; 