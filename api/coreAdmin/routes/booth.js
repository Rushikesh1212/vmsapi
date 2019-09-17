const express 	= require("express");
const router 	= express.Router();

const SchemaController = require('../controllers/voter');

router.post('/post/', SchemaController.create_Voters);

module.exports = router;