const db = require('../db/index.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config.js')

exports.regUser = (req,res)=>{
    const userinfo = req.body
    // if(!userinfo.username || !userinfo.password){
    //     return res.send({
    //         status: 400,
    //         msg: '用户名或密码不合法'
    //     })
    // }
    //查询数据库中用户名是否被占用
    console.log(userinfo.username)
    const sqlStr = 'select * from ev_users where username = ?'
    db.query(sqlStr,userinfo.username,(err,result)=>{
        if(err){
            return res.send({
                status: 400,
                msg: err.message
            })
        } 
        if(result.length > 0){
            console.log(result.length)
            return res.send({status:400,msg:'用户名已经被占用，请更换用户名'})
        }

        //加密用户的密码
        userinfo.password = bcrypt.hashSync(userinfo.password,10)
        console.log(userinfo)

        //数据库中插入新的用户
        const insertSql = 'insert into ev_users set ?'
        db.query(insertSql,{username: userinfo.username,password:userinfo.password},(err,result)=>{
            if(err) return res.send({status:400,msg:err.message})
            if(result.affectedRows !== 1){
                return res.cc('注册用户失败')
            }
            res.cc('注册成功',200)
        })



    })

}

exports.login = (req,res)=>{
    const userinfo = req.body
    const sqlStr = 'select * from ev_users where username = ?'
    db.query(sqlStr,userinfo.username,(err,result)=>{
        if(err){
            return res.cc(err)
        } 
        if(result.length !== 1){
            console.log(result.length)
            return res.cc('登录失败')
        }

        const compareResult = bcrypt.compareSync(userinfo.password,result[0].password)
        if(!compareResult) return res.cc('登录失败')

        //到此处登录成功，生成token
        const user = {...result[0],password:'',user_pic:''}
        console.log(config.jwtSecretKey)
        const tokenStr = jwt.sign(user,config.jwtSecretKey,{
            expiresIn: '24h'
        })

        res.send({
            status: 200,
            msg: '登录成功',
            token: 'Bearer ' + tokenStr
        })
    })

}