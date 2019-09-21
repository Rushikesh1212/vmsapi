const express 	= require("express");
const router 	= express.Router();

const SchemaController = require('../controllers/voter');

router.post('/post/', SchemaController.create_Voters);
router.get('/get/', SchemaController.voters_list);
router.get('/get/one/:voterId', SchemaController.single_voter);
router.patch('/patch/', SchemaController.update_VoterData);
router.delete('/delete/one/:voterId', SchemaController.delete_voter);

router.delete('/deleteAllVoters', SchemaController.deleteall_voters);

//Find voter family
router.get('/voterFamily/:voterId', SchemaController.voter_family);

//Display distinct booths
router.get('/distinctBooth', SchemaController.distinct_booth);

//display voters as per booth
router.post('/boothVoters', SchemaController.booth_voters);

router.get('/duplicateVoters', SchemaController.duplicate_voters);

router.post('/updateFeatured', SchemaController.update_featured);

//surnameList
router.post('/surnameList', SchemaController.surname_list);

//surnameList
router.post('/colorList', SchemaController.color_list);

//pincodeList
router.get('/pincodeList', SchemaController.pincode_list);

//VillageList
router.get('/villagelist', SchemaController.village_list);

//pincodeList
router.post('/boothbyvillage', SchemaController.booth_by_village);


module.exports = router;