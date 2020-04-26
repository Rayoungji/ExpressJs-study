var express=require('express')  //router모듈을 불러오기 위해 express 모듈 추출
var router=express.Router()

//라우터 모듈
var main=require('./main/main')
var mail=require('./mail/mail')
var join=require('./join/join')
var login=require('./login/login')
var logout=require('./logout/logout')

//라우터 레벨에 미들웨어 정의
router.use('/main',main)
router.use('/mail',mail)
router.use('/join',join)
router.use('/login',login)
router.use('/logout',logout)

module.exports=router;