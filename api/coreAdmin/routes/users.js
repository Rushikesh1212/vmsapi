const express 	= require("express");

const router 	= express.Router();

const checkAuth     = require('../middlerware/check-auth');

const UserController = require('../controllers/users');

//VMS url
router.post('/post', UserController.add_user); 

router.post('/post/userLogin',UserController.user_login);

router.post('/post/adminLogin',UserController.admin_login);

router.get('/get/list', UserController.users_list); 

router.delete('/delete/one/:userID',UserController.delete_user);

router.patch('/patch/one/updateUser/',UserController.update_user);

router.patch('/patch/one/resetPassword/:userID',UserController.reset_password); 

module.exports = router;