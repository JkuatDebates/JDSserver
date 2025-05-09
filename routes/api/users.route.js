const express=require('express');
const router=express.Router();
const usersController=require('../../controllers/usersController');

router.route('/')
    .get(usersController.getUsers);

router.route('/:id')
    .delete(usersController.deleteAccount);

router.route('/login')
    .post(usersController.login);
router.route('/signup')
    .post(usersController.register);

router.route('/changePwd')
    .patch(usersController.changePwd);
router.route('/resetPwd')
    .patch(usersController.resetPwd);
router.route('/changeUsn')
    .patch(usersController.changeUsn);
router.route('/changeRole')
    .patch(usersController.changeRole);


module.exports=router;