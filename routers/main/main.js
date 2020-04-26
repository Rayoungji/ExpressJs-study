var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')

//main page 는 login이 될 때만(즉 세션정보가 있을때만) 접근이 가능하게 하자.
router.get('/', function(req,res) {
	console.log("main loaded")
	console.log("회원가입 성공시 req.user가 있을까요?",req.user)
	var id = req.user;
	if(!id) res.render('login.ejs');
	res.render('main.ejs', {'id' : id});
});

module.exports = router;