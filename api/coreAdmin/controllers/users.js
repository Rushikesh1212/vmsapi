const mongoose		= require("mongoose");
const bcrypt		= require("bcrypt");
const jwt			= require("jsonwebtoken");
const plivo 		= require('plivo');
const User 			= require('../models/users');
const axios 		= require('axios');

//*******************VMS********************
//VMS SIgnUP
exports.add_user = (req,res,next)=>{
	User.findOne({"emails.address":req.body.email})
		.exec()
		.then(user =>{
			console.log("user",user)
			if(user){
				return res.status(200).json({
					message:"USER-ALREADY-EXIST"
				});
			}else{
				if(req.body.role === "User"){
				var userName =""
				var pwd 		= "madha"+Math.floor(Math.random() * 1000) + 1;
				User.find()
                  .exec()
                  .then(data =>{
                  	var data1=data.length+101
						 userName    = "Madha"+data1;
						console.log("userName",userName);
					 })
	                  .catch(err =>{
	                      console.log(err);
	                      res.status(500).json({
	                          error: err
	                      });
	                  });
				}else{
					var pwd =req.body.pwd;
				}	
				console.log("pwd",pwd);
				bcrypt.hash(pwd,10,(err,hash)=>{
					if(err){
						return res.status(500).json({
							error:err
						});
					}else{
						const user = new User({
							_id: new mongoose.Types.ObjectId(),
							createdAt		: new Date,
							services		: {
								password	:{
											bcrypt:hash
											},
							},
							countryCode 	: req.body.countryCode,
							mobileNumber  	: req.body.mobileNumber,
							emails			: [
									{
										address  : req.body.email,
										userName : userName,
										verified : true 
									}
							],
							profile		:{
										firstName     : req.body.firstName,
										lastName      : req.body.lastName,
										fullName      : req.body.firstName+' '+req.body.lastName,
										emailId       : req.body.email,
										mobileNumber  : req.body.mobileNumber,
										countryCode   : "+91",
										status		  : "Active"
							},
							roles 		   : (req.body.role),
			            });	
						user.save()
							.then(newUser =>{
								if(newUser){
								var text = "Dear "+req.body.firstName+',\n'+"Your credential for app as follows: \n"+"Username : "+userName+"\nPassword : "+pwd+"\nThank You!"; 	
								const url="http://smsgateway.digitalkarbhar.com/submitsms.jsp?user=Sidharth&key=3bd47e3528XX&mobile=+91"+req.body.mobileNumber+"&message="+text+"&senderid=TESTBK&accusage=1"
								axios.get(url)
							      .then(response => {
		                            return res.status(200).json({
		                                "message" : 'NEW-USER-CREATED',
		                                "user_id" : newUser._id,
		                            });			
		                        })
		                        .catch(msgError=>{
		                            return res.status(501).json({
		                                message: "Some Error occurred during sending message",
		                                error: msgError
		                            });        
		                        });       
		                    }
							})
							.catch(err =>{
								console.log(err);
								res.status(500).json({
									error: err
								});
							});
					}			
				});
			}
		})
		.catch(err =>{
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
};


//VMS Login
 exports.user_login = (req,res,next)=>{
 	console.log("req.body.userName",req.body.userName)
	User.findOne({"emails.userName":req.body.userName,roles:"User"})
		.exec()
		.then(user => {
			console.log("user",user)
			if(user){
				console.log("PWD===>",user);
			var pwd = user.services.password.bcrypt;
			}else{
				return res.status(401).json({
					message: 'Auth failed'
				});	
			}
			console.log("pwd",req.body.pwd)
			if(pwd){
				console.log("PWD===>");
				bcrypt.compare(req.body.pwd,pwd,(err,result)=>{
					if(err){
						console.log("Inside 1")
						return res.status(401).json({
							message: 'Auth failed'
						});		
					}
					if(result){
						console.log("Inside 2")

						const token = jwt.sign({
							email 	: req.body.email,
							userId	:  user._id,
						},global.JWT_KEY,
						{
							expiresIn: "24h"
						}
						);
						res.header("Access-Control-Allow-Origin","*");

						return res.status(200).json({
							message: 'Auth successful',
							token: token,
							user_ID:user._id,
						});	
					}
						console.log("Inside 1")

					return res.status(401).json({
						message: 'Auth failed'
					});
				})
			}
		})
		.catch(err =>{
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
};

//admin Login
 exports.admin_login = (req,res,next)=>{
 	console.log("req.body.email",req.body.email)
	User.findOne({"emails.address":req.body.email,"roles":"Admin"})
		.exec()
		.then(user => {
			console.log("user",user)
			if(user){
				console.log("PWD===>",user);
			var pwd = user.services.password.bcrypt;
			}
			console.log("pwd",req.body.pwd)
			if(pwd){
				console.log("PWD===>");
				bcrypt.compare(req.body.pwd,pwd,(err,result)=>{
					if(err){
						console.log("Inside 1")
						return res.status(401).json({
							message: 'Auth failed'
						});		
					}
					if(result){
						console.log("Inside 2")

						const token = jwt.sign({
							email 	: req.body.email,
							userId	:  user._id,
						},global.JWT_KEY,
						{
							expiresIn: "24h"
						}
						);
						res.header("Access-Control-Allow-Origin","*");

						return res.status(200).json({
							message: 'Auth successful',
							token: token,
							user_ID:user._id,
						});	
					}
						console.log("Inside 1")

					return res.status(401).json({
						message: 'Auth failed'
					});
				})
			}
		})
		.catch(err =>{
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
};

// Users List
exports.users_list = (req,res,next)=>{
	User.find({roles : {$ne : "Admin"}})
		.sort({createdAt:-1})
		.exec()
		.then(users =>{
			console.log('users ',users);
			res.status(200).json(users);
		})
		.catch(err =>{
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
	
}

//update user
exports.update_user = (req,res,next)=>{
	// var roleData = req.body.role;

    User.updateOne(
            { _id:req.body.userId},  
            {
                $set:{
				
					"profile.firstName"     : req.body.firstName,
					"profile.lastName"      : req.body.lastName,
					"profile.fullName"      : req.body.firstName+' '+req.body.lastName,
					"profile.emailId"       : req.body.emailId,
					"profile.mobileNumber"  : req.body.mobileNumber			
                }
            }
        )
        .exec()
        .then(data=>{
            console.log('data ',data);
            if(data.nModified == 1){
				console.log('data =========>>>',data);
                res.status(200).json("User Updated");
            }else{
                res.status(401).json("User Not Found");
            }
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

//delete user
exports.delete_user = function (req, res,next) {
    User.deleteOne({
        _id: req.params.userID
    }, function (err) {
        if(err){
            return res.json({
                error: err
            });
        }
        res.json({
            status: "success",
            message: 'Users deleted'
        });
    });
};

//Active Inactive
exports.user_status = function (req, res,next) {
    User.updateOne(
	    { _id:req.body.userId},  
	    {
	        $set:{
				"profile.status"     : req.body.userStatus,	
	        }
         }
        )
        .exec()
        .then(data=>{
            console.log('data ',data);
            if(data.nModified == 1){
				// console.log('data =========>>>',data);
                res.status(200).json("User "+req.body.userStatus);
            }else{
                res.status(401).json("Not Updated");
            }
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};


//Regenerate Password
exports.reset_password = (req,res,next)=>{
	// var roleData = req.body.role;
	console.log("req.params.userID",req.params.userID);
		var pwd = "madha"+Math.floor(Math.random() * 1000) + 1;

			bcrypt.hash(pwd,10,(err,hash)=>{
				if(err){
					return res.status(500).json({
						error:err
					});
				}else{
				User.updateOne(
			    { _id:req.params.userID},  
			    {
			        $set:{
						services		: {
									password	:{
												bcrypt:hash
												},
								},		
			        }
			    }
			)
			.exec()
			.then(resetPassword=>{
			    console.log('resetPassword ',resetPassword);
			    if(resetPassword.nModified == 1){
			    	User.find({_id:req.params.userID})
					.exec()
					.then(user=>{
						console.log("user",user);
						if(user && user.length>0){
								console.log("inside=>>>>")
								var text = "Dear "+user[0].profile.firstName+',\n'+"Your New credential for app as follows: \n"+"Username : "+user[0].emails[0].userName+"\nPassword : "+pwd+"\nThank You!"; 	
								const url="http://smsgateway.digitalkarbhar.com/submitsms.jsp?user=Sidharth&key=3bd47e3528XX&mobile=+91"+user[0].profile.mobileNumber+"&message="+text+"&senderid=TESTBK&accusage=1"
								axios.get(url)
							      .then(response => {
			                        return res.status(200).json({
			                            "message" : 'RESET-PASSWORD',
			                        });			
			                    })
			                    .catch(msgError=>{
			                        return res.status(501).json({
			                            message: "Some Error occurred during sending message",
			                            error: msgError
			                        });        
			                    });
	                		}
	                   	})
	                   	.catch(err =>{
						    console.log(err);
						    res.status(500).json({
						        error: err
						    });
						});     
			    }else{
			        res.status(401).json("PASSWORD_RESET_FAILED");
			    }
			})
			.catch(err =>{
			    console.log(err);
			    res.status(500).json({
			        error: err
			    });
			});

			}			
		});
   
}
