const express=require('express');
const profilesController=require('../../controllers/profilesController');
const multer=require('multer');
const { CloudinaryStorage }=require('multer-storage-cloudinary');
const cloudinary= require('cloudinary').v2;
const router= express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const cloudinaryStorage= new CloudinaryStorage({
    cloudinary,
    params:{
        folder: 'profiles',
        allowed_formats:['jpg','png','jpeg'],
    }
});

const upload= multer({ storage: cloudinaryStorage });

router.route('/')
    .get(profilesController.getProfiles)
    .post(upload.single('photo'),profilesController.newProfile)
    .put(upload.single('photo'),profilesController.replaceProfile);

router.route('/:id')
    .delete(profilesController.deleteProfile)
    .patch(upload.single('photo'),profilesController.updateProfile);

module.exports=router;