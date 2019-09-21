const express 	= require("express");

const router 	= express.Router();


const reportController = require('../controllers/report');

router.post('/usersdata', reportController.user_activity);

router.get('/get/dashboardtab', reportController.dasboard_tab);

router.get('/get/colorlist', reportController.color_list1);

router.get('/votersupdatedcount', reportController.voters_updated_count);

router.post('/votersupdatedbyuser', reportController.voters_updated_by_user);


module.exports = router;