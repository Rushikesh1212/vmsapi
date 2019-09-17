	const express 						= require ('express');
	const app 							= express();
	const morgan 						= require('morgan');// morgan call next function if problem occure
	const bodyParser 					= require('body-parser');// this package use to formate json data 
	const mongoose 						= require ('mongoose');
	var nodeMailer   					= require('nodemailer');
	const axios 		= require('axios');

	const dbname = "vms";
	global.JWT_KEY = "secret";

	mongoose.connect('mongodb://localhost/'+dbname,{
		useNewUrlParser: true
	})

	axios.defaults.baseURL = 'http://localhost:5014/';
	// axios.defaults.baseURL = 'http://vmsapi.ranjitsinhshinde.in/';
	axios.defaults.headers.post['Content-Type'] = 'application/json';

	mongoose.promise = global.Promise;

	app.use(morgan("dev"));
	app.use('/uploads', express.static('uploads'));
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

	app.use((req, res, next) => {
		res.header("Access-Control-Allow-Origin", "*");
		res.header(
			"Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept, Authorization"
		);
		if (req.method === "OPTIONS") {
			res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
			return res.status(200).json({});
		}
		next();
	});

	// CoreAdmin Routes 
	const usersUrl 							= require("./api/coreAdmin/routes/users");	
	const VotersUrl 						= require("./api/coreAdmin/routes/voter");
	const SearchUrl 						= require("./api/coreAdmin/routes/searchVoter");
	const ReportUrl 						= require("./api/coreAdmin/routes/report");
	const BoothUrl 						    = require("./api/coreAdmin/routes/booth");

	app.use("/api/users",usersUrl);
	app.use("/api/voters",VotersUrl);
	app.use("/api/search",SearchUrl);
	app.use("/api/booth",BoothUrl);

	

	app.use((req, res, next) => {
		const error = new Error("Not found");
		error.status = 404;
		next(error);
	});

	app.use((error, req, res, next) => {
		res.status(error.status || 500);
		res.json({
				error: {
				message: error.message
				}
			});
	});

	module.exports = app;