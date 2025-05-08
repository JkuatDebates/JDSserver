const express=require('express');
const router=express.Router();
const usersController=require('../../controllers/usersController');

router.route('/login')
    .post(usersController.login);
router.route('/signup')
    .post(usersController.register);


module.exports=router