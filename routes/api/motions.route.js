const express=require('express');
const router= express.Router();
const motionsController=require('../../controllers/motionsController');

router.route('/')
    .get(motionsController.getMotions)
    .post(motionsController.addMotion)
    .put(motionsController.updateMotion);

router.route('/:id')
    .delete(motionsController.deleteMotion);
module.exports=router;