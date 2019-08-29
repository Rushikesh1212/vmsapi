const express 	= require("express");
const router 	= express.Router();

const SchemaController = require('../controllers/schema');

router.post('/post/', SchemaController.create_Voters);
router.get('/get/', SchemaController.voters_list);


module.exports = router;