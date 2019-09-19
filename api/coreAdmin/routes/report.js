const express 	= require("express");

const router 	= express.Router();


const reportController = require('../controllers/report');

router.post('/usersData', reportController.user_activity);

router.get('/get/dasboardTab', reportController.dasboard_tab);

router.get('/get/colorList', reportController.color_list1);

router.get('/votersUpdatedCount', reportController.voters_updated_count);

router.post('/votersUpdatedByUser', reportController.voters_updated_by_user);


module.exports = router;