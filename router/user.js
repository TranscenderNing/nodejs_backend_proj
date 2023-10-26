const express = require('express')
const expressJoi = require('@escook/express-joi')
const {reg_login_schema} = require('../schema/user.js')
//初始化路由模块
const router = express.Router()

//导入处理的函数
const userHandler = require('../routerHandler/user.js')

router.post('/reguser',expressJoi(reg_login_schema),userHandler.regUser)

router.post('/login',expressJoi(reg_login_schema),userHandler.login)


module.exports = router