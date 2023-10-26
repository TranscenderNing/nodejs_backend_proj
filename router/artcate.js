const express = require('express')
const router = express.Router()
const {getCates,addCates,deleteCateById,getArtById,updateCateById} = require('../routerHandler/artcate.js')
const expressJoi = require('@escook/express-joi')
const {add_cate_schema,delete_cate_schema,update_cate_schema}= require('../schema/artcate.js')
//获取所有文章列表
router.get('/cates',getCates)
//新增文章分类
router.post('/addcates',expressJoi(add_cate_schema),addCates)
//删除文章分类
router.get('/deletecate/:id',expressJoi(delete_cate_schema),deleteCateById)
//根据文章id获取文章分类
router.get('/cates/:id',expressJoi(delete_cate_schema),getArtById)
//更新文章分类
router.post('/updatecate',expressJoi(update_cate_schema),updateCateById)
module.exports = router