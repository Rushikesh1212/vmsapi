const express 	= require("express");
const router 	= express.Router();

const searchPropertiesController = require('../controllers/search');

router.post('/voters', searchPropertiesController.searchVoters);


module.exports = router;