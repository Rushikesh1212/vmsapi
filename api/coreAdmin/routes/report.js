const express 	= require("express");

const router 	= express.Router();


const reportController = require('../controllers/report');

router.post('/usersData', reportController.user_activity);


module.exports = router;