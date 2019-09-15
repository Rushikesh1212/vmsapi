const express 	= require("express");
const router 	= express.Router();

const SchemaController = require('../controllers/voter');

router.post('/post/', SchemaController.create_Voters);
router.get('/get/', SchemaController.voters_list);
router.get('/get/one/:voterId', SchemaController.single_voter);
router.patch('/patch/', SchemaController.update_VoterData);
router.delete('/delete/one/:voterId', SchemaController.delete_voter);

//Find voter family
router.get('/voterFamily/:voterId', SchemaController.voter_family);

//Display distinct booths
router.get('/distinctBooth', SchemaController.distinct_booth);

//display voters as per booth
router.post('/boothVoters', SchemaController.booth_voters);

router.get('/duplicateVoters', SchemaController.duplicate_voters);

module.exports = router;