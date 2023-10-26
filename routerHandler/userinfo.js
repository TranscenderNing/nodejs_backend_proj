const db = require('../db/index.js')
const bcrypt = require('bcryptjs')

//获取用户基本信息
exports.getUserInfo = (req,res)=>{
    const sqlStr = 'select id,username,nickname,email from ev_users where id = ?'
    db.query(sqlStr,req.user.id,(err,result)=>{
        if(err) return res.cc(err)

        if(result.length !== 1) return res.cc('获取用户信息失败')

        res.send({
            status:200,
            msg:'获取用户数据成功',
            data: result[0]
        })
    })
}

//更新用户基本信息
exports.updateUserInfo = (req,res)=>{
    const updateSql = 'update ev_users set ? where id = ?'
    console.log(req.body)
    db.query(updateSql,[req.body,req.body.id],(err,result)=>{
        if(err) return res.send(err.message)
        if(result.affectedRows !== 1){
            return res.cc('更新用户的基本信息失败')
        }

        res.cc('更新用户信息成功',200)
    })
}

//重置密码路由
exports.updatePassword = (req,res)=>{
    //判断用户是否存在

    const sql = 'select * from ev_users where id = ?'
    db.query(sql,req.user.id,(err,results)=>{
        if(err) return res.cc(err.message)

        if(results.length !== 1){return res.cc('用户不存在')}
        
        //判断旧密码是否正确
        const isSame = bcrypt.compareSync(req.body.oldPwd,results[0].password)
        if(!isSame) return res.cc('旧的密码错误')

        //更新密码
        const newPwd = bcrypt.hashSync(req.body.newPwd,10)
        const updateSql = 'update ev_users set password = ? where id = ?'
        
        db.query(updateSql,[newPwd,req.user.id],(err,result)=>{
            if(err) return res.cc(err)
            console.log(req.user.id)
            console.log(updateSql)
            if(result.affectedRows !== 1){
                return res.cc('更新密码失败')
            }

            res.cc('更新密码成功',200)
        })


    })
    




}

exports.updateAvator = (req,res)=>{
    const updataSql = 'update ev_users set user_pic = ? where id = ?'

    db.query(updataSql,[req.body.avator,req.user.id],(err,result)=>{
        if(err) return res.cc(err.message)
        if(result.affectedRows !== 1) return res.cc('更新头像失败')
        return res.cc('更新头像成功',200)
    })
}
