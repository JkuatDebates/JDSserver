const express=require('express');
const multer=require('multer');
const { CloudinaryStorage }=require('multer-storage-cloudinary');
const cloudinary= require('cloudinary').v2;
const eventsController=require('../../controllers/eventsController');
const router= express.Router();

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
    .get(eventsController.getEvents)
    .post(upload.single('poster'),eventsController.newEvent)
    .put(upload.single('poster'),eventsController.updateEvent);

router.route('/:id')
    .delete(eventsController.deleteEvent);
    
module.exports=router;