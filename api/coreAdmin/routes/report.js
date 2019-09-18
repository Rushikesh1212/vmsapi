const express 	= require("express");

const router 	= express.Router();


const reportController = require('../controllers/report');

router.post('/usersData', reportController.user_activity);

router.get('/get', reportController.dasboard_tab);


module.exports = router;