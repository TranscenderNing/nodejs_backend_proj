const db = require('../db/index.js')
//获取所有文章列表
exports.getCates = (req,res)=>{
    const sql = 'select * from ev_article_cate where is_delete = 0 order by id asc'
    db.query(sql,(err,result)=>{
        if(err) return res.cc(err.message)
        res.send({
            status:200,
            msg:'获取文章列表',
            data: result
        }
        )
    })
}

//新增文章分类
exports.addCates = (req,res)=>{
    const sql = 'select * from ev_article_cate where name = ? or alias = ?'
    db.query(sql,[req.body.name,req.body.alias],(err,result)=>{
        if(err) return res.cc(err.message)

        if(result.length === 2) return res.cc('分类名称和别名被占用')
        if(result.length === 1 && result[0].name === req.body.name && result[0].alias === req.body.alias)
            return res.cc('分类名称和别名被占用')
        if(result.length === 1 && result[0].name === req.body.name) 
            return res.cc('分类名称被占用')
        if(result.length === 1 && result[0].alias === req.body.alias)
            return res.cc('别名被占用')

        const insertSql = 'insert into ev_article_cate set ?'
        const cate = {...req.body,is_delete:0}
        db.query(insertSql,cate,(err,result)=>{
            if(err) return res.cc(err.message)

            if(result.affectedRows !== 1) return res.cc('新增文章分类失败')

            res.cc('新增文章分类成功',200)
        })
    })
}

//删除文章分类
exports.deleteCateById = (req,res)=>{
    //标记删除
    const sql = 'update ev_article_cate set is_delete = 1 where id = ?'
    db.query(sql,req.params.id,(err,result)=>{
        if(err) return res.cc(err.message)
        if(result.affectedRows !== 1){
            return res.cc('删除文章分类失败')
        }
        return res.cc('删除文章分类成功',200)
    })
}

//根据文章id获取文章分类
exports.getArtById = (req,res)=>{
  const sql = 'select * from ev_article_cate where id = ?'
  db.query(sql,req.params.id,(err,r)=>{
    if(err) return res.cc(err.message)
    if(r.length !== 1) return res.cc('获取文章列表失败')
    res.send({
        status:200,
        msg:'获取文章类型成功',
        data:r[0]
    })
  }) 
}

//更新文章分类
exports.updateCateById = (req,res)=>{
    const sql = `select * from ev_article_cate where id <> ? and  (name = ? or alias = ?)`
    db.query(sql,[req.body.id,req.body.name,req.body.alias],(err,result)=>{
        if(err) {
            console.log('sql error')
            return res.cc(err)
        }

        if(result.length === 2) return res.cc('分类名称和别名被占用')
        if(result.length === 1 && result[0].name === req.body.name && result[0].alias === req.body.alias)
            return res.cc('分类名称和别名被占用')
        if(result.length === 1 && result[0].name === req.body.name) 
            return res.cc('分类名称被占用')
        if(result.length === 1 && result[0].alias === req.body.alias)
            return res.cc('别名被占用')

        const updateSql = 'update ev_article_cate set ? where id = ?'
        const cate = {...req.body,is_delete:0}
        db.query(updateSql,[cate,req.body.id],(err,result)=>{
            if(err) return res.cc(err.message)

            if(result.affectedRows !== 1) return res.cc('更新文章分类失败')

            res.cc('新增文章分类成功',200)
        })
    })
}