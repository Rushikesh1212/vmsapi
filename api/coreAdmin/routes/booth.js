const express 	= require("express");
const router 	= express.Router();

const SchemaController = require('../controllers/booth');

router.post('/post/', SchemaController.add_booth);

router.post('/post/searchBooth', SchemaController.search_booth);

router.get('/get/boothList', SchemaController.booth_list);

module.exports = router;