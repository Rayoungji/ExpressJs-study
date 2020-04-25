/*
파일설명:
require(모듈이름) 함수는 node.js에서 기본적으로 주어지는 함수로, modules폴더 안에 설치된 
모듈을 불러오는 함수이다. express 모듈을 express 변수에 담고 express()로 app을 초기화 하는 것은
Express Framework에서 항상 가장 처음하는 것이므로 알아두어야 한다
-Express 홈페이지에 안내서-라우팅에 코드있음

보충 설명:
express 서버는 비동기 방식으로 동작한다 - 동기적인 코드(ex.for문)먼저 실행 후 마지막에 비동기적인 코드가 실행된다
(비동기 방식 뭔지 알아보기)

참고 링크:
https://brunch.co.kr/@topherlee/27
*/

//express 모듈 추출 & 서버 생성
var express=require('express')  
var app=express()  

//외부 모듈
var bodyParser = require('body-parser')
var passport=require('passport')
var LocalStrategy=require('passport-local').Strategy
var session=require('express-session')
var flash=require('connect-flash')

//라우터 모듈
var router=require('./routers/index')

//서버 실행
app.listen(3000, function(){  
    console.log("start! express server on port 3000");
}) 

//미들웨어 정의
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true})); 
app.set('view engine', 'ejs');
app.use(session({                 //세션등록
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize()) //passport 연결
app.use(passport.session())  //세션 연결
app.use(flash())  //flash 연결
app.use(router)

