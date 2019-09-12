const express 	= require("express");
const router 	= express.Router();

const searchVoterController = require('../controllers/search');

router.post('/voters', searchVoterController.searchVoters);


module.exports = router;