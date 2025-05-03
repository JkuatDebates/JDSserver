const express=require('express');
const router=express.Router();
const articlesController=require('../../controllers/articlesController');

router.route('/')
    .get(articlesController.getArticles)
    .post(articlesController.postArticle)
    .delete(articlesController.deleteArticle);


module.exports=router