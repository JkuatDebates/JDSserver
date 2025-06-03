const express=require('express');
const multer=require('multer');
const { CloudinaryStorage }=require('multer-storage-cloudinary');
const cloudinary= require('cloudinary').v2;
const router=express.Router();
const articlesController=require('../../controllers/articlesController');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const cloudinaryStorage= new CloudinaryStorage({
    cloudinary,
    params:{
        folder: 'JDSweb',
        allowed_formats:['jpg','png','jpeg'],
    }
});

const upload= multer({ storage: cloudinaryStorage });

router.route('/')
    .get(articlesController.getArticles)
    .post(upload.array('images'),articlesController.postArticle)
    .delete(articlesController.deleteArticle);


module.exports=router