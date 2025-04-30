const express=require('express');
const router= express.Router();
const motionsController=require('../../controllers/motionsController');

router.route('/')
    .get(motionsController.getMotions);

module.exports=router;