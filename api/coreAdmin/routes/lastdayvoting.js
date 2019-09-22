const express 	= require("express");
const router 	= express.Router();

const SchemaController = require('../controllers/lastdayvoting');

router.post('/post/addlastdayvoting', SchemaController.add_last_day_voting);

router.get('/get/lastdayvoting', SchemaController.last_day_voting);

router.patch('/patch/lastdayactive', SchemaController.last_day_active);

module.exports = router;