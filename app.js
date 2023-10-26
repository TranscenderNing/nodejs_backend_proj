const express = require('express')
const joi = require('@hapi/joi')

const app = express()

//导入跨域中间件
const cors = require('cors')
app.use(cors())
//配置解析表单数据的中间件 x-www-form-urlencoded
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//封装res.cc函数，处理返回码等信息
app.use((req,res,next)=>{
    res.cc = function(err,status = 400){
        res.send({
            status,
            msg: err instanceof Error? err.message:err
        })
    }
    next()
})

//在路由之前配置解析token的中间件
const config = require('./config')
const expressJwt = require('express-jwt')
app.use(expressJwt({secret:config.jwtSecretKey}).unless({path:[/^\/api\//]}))



//导入用户路由
const userRouter = require('./router/user.js')
app.use('/api',userRouter)  // 统一路由前缀
//导入用户信息路由
const userinfoRouter = require('./router/userinfo.js')
app.use('/my',userinfoRouter)
//导入文章模块路由
const articleRouter = require('./router/artcate.js')
app.use('/my/article',articleRouter)

//错误级别的中间件
app.use((err,req,res,next)=>{
    if(err instanceof joi.ValidationError){
        return res.cc(err.message)
    }
    if(err.name === 'UnauthorizedError'){
        return res.cc('身份认证失败...')
    }
    res.cc(err.message)
})


app.listen(8888,(req,res)=>{
    console.log('express server is running at localhost:8888')
})