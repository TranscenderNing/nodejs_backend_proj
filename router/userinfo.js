const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')
const {update_userinfo_schema,update_password_schema,update_avator_schema} = require('../schema/user.js')
const {getUserInfo,updateUserInfo,updatePassword,updateAvator} = require('../routerHandler/userinfo.js')

//获取用户基本信息
router.get("/userinfo",getUserInfo)
//更新用户信息
router.post("/userinfo",expressJoi(update_userinfo_schema),updateUserInfo)
//重置用户密码
router.post("/updatepwd",expressJoi(update_password_schema),updatePassword)
//更换用户头像
router.post("/updateAvator",expressJoi(update_avator_schema),updateAvator)
module.exports = router