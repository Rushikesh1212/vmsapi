const mongoose	= require("mongoose");
const Voters        = require('../models/voter');
const User          = require('../models/users');
const booth         = require('../models/booth');
const axios         = require('axios');

exports.create_Voters = (req,res,next)=>{
    // console.log('req=>',req.body.length);
        for (var i = 0; i <= req.body.length-1; i++) {
            // console.log("Inside",req.body[i].age);
            const voters = new Voters({
                 _id              : new mongoose.Types.ObjectId(),
                age               : req.body[i].age,
                boothName         : req.body[i].boothName,
                constituencyName  : req.body[i].constituencyName,
                firstName         : req.body[i].firstName,
                middleName        : req.body[i].middleName,
                lastName          : req.body[i].lastName,
                fullName          : req.body[i].firstName+" "+req.body[i].middleName+" "+req.body[i].lastName,
                gender            : req.body[i].gender,
                houseNumber       : req.body[i].houseNumber,
                idNumber          : req.body[i].idNumber,
                partNo            : req.body[i].partNo,
                partName          : req.body[i].partName,
                pinCode           : req.body[i].pinCode,
                relation          : req.body[i].relation,
                relativeName      : req.body[i].relativeName,
                villageName       : req.body[i].villageName,
                mobileNumber      : "",
                whatsAppNumber    : "",
                dead              : false,
                visited           : false,
                voted             : false,
                changeAddress     : "",
                areaName          : "",
                otherInfo         : "",
                dob               : "",
                emailId           : "",
                aadharCard        : "",
                color             : 2,
                cast              : "",
                featured          : false,
                mAge              : req.body[i].mAge,
                mBoothName        : req.body[i].mBoothName,
                mConstituencyName : req.body[i].mConstituencyName,
                mFirstName        : req.body[i].mFirstName,
                mMiddleName       : req.body[i].mMiddleName,
                mLastName         : req.body[i].mLastName,
                mFullName         : req.body[i].mFirstName+" "+req.body[i].mMiddleName+" "+req.body[i].mLastName,
                mGender           : req.body[i].mGender,
                mHouseNumber      : req.body[i].mHouseNumber,
                mIdNumber         : req.body[i].mIdNumber,
                mPartNo           : req.body[i].mPartNo,
                mPartName         : req.body[i].mPartName,
                mPinCode          : req.body[i].mPinCode,
                mRelation         : req.body[i].mRelation,
                mRelativeName     : req.body[i].mRelativeName,
                mVillageName     : req.body[i].mVillageName,
                voterUpdateStatus: [],
                voterCreatedAt    : new Date(),
            });
            // console.log("vsssoters",voters)
             voters.save()
                  .then(data=>{                                            
                     return res.status(200).json({
                        "message" : 'Voter Added',
                        "Voter"   :     data,
                    }); 
                  })
                  .catch(err =>{
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                  });
        }      
};


exports.create_single_voter = (req,res,next)=>{
    console.log('req=>',req.body);
    const voters = new Voters({
         _id              : new mongoose.Types.ObjectId(),
        age               : req.body.age,
        boothName         : req.body.boothName,
        constituencyName  : req.body.constituencyName,
        firstName         : req.body.firstName,
        middleName        : req.body.middleName,
        lastName          : req.body.lastName,
        fullName          : req.body.firstName+" "+req.body.middleName+" "+req.body.lastName,
        gender            : req.body.gender,
        houseNumber       : req.body.houseNumber,
        idNumber          : req.body.idNumber,
        partNo            : req.body.partNo,
        partName          : req.body.partName,
        pinCode           : req.body.pinCode,
        relation          : req.body.relation,
        relativeName      : req.body.relativeName,
        villageName       : req.body.villageName,
        mobileNumber      : "",
        whatsAppNumber    : "",
        dead              : false,
        visited           : false,
        voted             : false,
        changeAddress     : "",
        areaName          : "",
        otherInfo         : "",
        dob               : "",
        emailId           : "",
        aadharCard        : "",
        color             : req.body.color,
        cast              : "",
        featured         : false,
        mAge              : req.body.mAge,
        mBoothName        : req.body.mBoothName,
        mConstituencyName : req.body.mConstituencyName,
        mFirstName        : req.body.mFirstName,
        mMiddleName       : req.body.mMiddleName,
        mLastName         : req.body.mLastName,
        mFullName         : req.body.mFirstName+" "+req.body.mMiddleName+" "+req.body.mLastName,
        mGender           : req.body.mGender,
        mHouseNumber      : req.body.mHouseNumber,
        mIdNumber         : req.body.mIdNumber,
        mPartNo           : req.body.mPartNo,
        mPartName         : req.body.mPartName,
        mPinCode          : req.body.mPinCode,
        mRelation         : req.body.mRelation,
        mRelativeName     : req.body.mRelativeName,
        mVillageName     : req.body.mVillageName,
        voterUpdateStatus: [],
        voterCreatedAt    : new Date(),
    });
    // console.log("vsssoters",voters)
     voters.save()
          .then(data=>{                                            
             return res.status(200).json({
                "message" : 'Voter Added',
                "Voter"   :     data,
            }); 
          })
          .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
          });
};

// Voters List
exports.voters_list = (req,res,next)=>{
    Voters.find({})
        .skip(0)
        .limit(50)
        // .sort({createdAt:-1})
        .exec()
        .then(voters =>{
            res.status(200).json(voters);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    
}

// single voter detail
exports.single_voter = (req,res,next)=>{
    Voters.findOne({"_id":req.params.voterId})
        // .sort({createdAt:-1})
        .exec()
        .then(voters =>{
            res.status(200).json(voters);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    
}


exports.update_VoterData = (req,res,next)=>{
    console.log("req.body.userId",req.body.userId);
    // var d = new Date();
    // var month = '' + (d.getMonth() + 1);  
    // var day   = '' + d.getDate();         
    // var year  = d.getFullYear();          

    // var currDate =  day+'-'+month+'-'+year;

    User.findOne({"_id" : req.body.userId})
        .exec()
        .then(user=>{
            console.log("user",user);
            console.log("req.body.voter_id",req.body.voter_id);
            Voters.updateOne(
            { "_id" : req.body.voter_id },                        
            {
                $set:{
                    mobileNumber      : req.body.mobileNumber,
                    whatsAppNumber    : req.body.whatsAppNumber,
                    dead              : req.body.dead,
                    visited           : req.body.visited,
                    voted             : req.body.voted,
                    changeAddress     : req.body.changeAddress,
                    areaName          : req.body.areaName,
                    otherInfo         : req.body.otherInfo,
                    dob               : req.body.dob,
                    emailId           : req.body.emailId,
                    aadharCard        : req.body.aadharCard,
                    color             : req.body.color,
                    cast              : req.body.cast,
                    featured          : req.body.featured,
                },
                $push:{
                    voterUpdateStatus : {
                        "UserId"          : user._id,
                        "updatedBy"       : user.profile.fullName,
                        "updatedAt"       : new Date(),
                        },
                    }
                }
            )
            .exec()
            .then(data=>{
                if(data.nModified == 1){                
                    res.status(200).json("Voter Updated");
                }else{
                    res.status(401).json("Voter Not Found");
                }
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json({
                    error1: err
                });
            });

        })
          .catch(err =>{
            console.log(err);
            res.status(500).json({
                error2: err
            });
        });
}

//delete voter
exports.delete_voter = function (req, res,next) {
    console.log("a");
    Voters.deleteOne({
        _id: req.params.voterId
    }, function (err) {
        if(err){
            return res.json({
                error: err
            });
        }
        res.json({
            status: "success",
            message: 'Voter deleted'
        });
    });
};
//delete all voter
exports.deleteall_voters = (req,res,next)=>{
    Voters.deleteMany({})
        .exec()
        .then(data=>{
            res.status(200).json("All Voters deleted");
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}




//voter  Family
 exports.voter_family = (req,res,next)=>{
 var selector=[]
  Voters.findOne({"_id":req.params.voterId})
    .skip(0)
    .limit(50)
    .exec()
    .then(voter => {
        if(voter){
        var voterNameArray = [];
        voterNameArray.push({"firstName"  : voter.middleName,"lastName"   : voter.lastName});      
        voterNameArray.push({"middleName" : voter.firstName,"lastName"   : voter.lastName});
        selector.push({$or : voterNameArray });
             Voters.find({ $or : selector})
              .sort({"voterCreatedAt" : -1})
              .exec()
              .then(searchResults=>{
                  res.status(200).json(searchResults);
                })
              .catch(err =>{
                  console.log(err);
                  res.status(500).json({
                      message : "No Data Found",
                      error   : err
                  });
              });
        }else{
            res.status(401).json("Voter Not Found");
        }
    })
    .catch(err =>{
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};


//distinct booth
 exports.distinct_booth = (req,res,next)=>{
            Voters.aggregate([
               {$group: { _id: "$boothName",
                        total: {$sum: 1},
                        Gender: {
                            $push: {
                                male: {$cond: [{$eq: ["$gender", "M"]}, 1, 0]},
                                female: {$cond: [{$eq: ["$gender", "F"]}, 1, 0]},
                            }
                          }
              },
            },       
            ])
            .exec()
            .then(boothName => {
                var boothList=[] 
                
                for (var i = boothName.length - 1; i > 0; i--) {
                    var male = 0;
                    var female = 0;
                    var total =0;
                    for (var j = boothName[i].Gender.length - 1; j >= 0; j--) {
                        if(boothName[i].Gender[j].male===1){
                                male=male+1;
                        }else{
                            female =female+1;
                        }
                        total=male+female

                        }
                        var booth={
                            boothName : boothName[i]._id,
                            male      : male,
                            female    : female,
                            total     : total,
                        }
                        if(i<boothName.length){
                            boothList.push(booth)
                            axios.post("/api/booth/post",booth)
                                  .then(response => {
                                    return res.status(200).json({
                                        "message" : 'Booth Added',
                                    });         
                                })
                                .catch(msgError=>{
                                    return res.status(501).json({
                                        message: "Some Error occurred during sending message",
                                        error: msgError
                                    });        
                                }); 
                        }
                    }

                res.status(200).json(boothList);
                 
            })
            .catch(err =>{
              console.log(err);
              res.status(500).json({
                error: err
              });
            });
};

//display voters as per booth
 exports.booth_voters = (req,res,next)=>{
  Voters.find({'boothName':req.body.boothName})
    .exec()
    .then(boothName => {
        res.status(200).json(boothName);
    })
    .catch(err =>{
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};



//display duplicate voters as per booth
 exports.duplicate_voters = (req,res,next)=>{
  Voters.aggregate([
        {$group:{"_id":"$fullName","fullName":{$first:"$fullName"},"count":{$sum:1}}},
        {$match:{"count":{$gt:1}}},
        {$project:{"fullName":1,"_id":0}},
        {$group:{"_id":null,"duplicateNames":{$push:"$fullName"}}},
        {$project:{"_id":0,"duplicateNames":1}}
        ])
    .exec()
    .then(duplicateVoters => {
        res.status(200).json(duplicateVoters);
    })
    .catch(err =>{
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

//update featured
exports.update_featured = (req,res,next)=>{
    console.log("req.body.userId",req.body.userId);
    User.findOne({"_id" : req.body.userId})
        .exec()
        .then(user=>{
            console.log("user",user);
            Voters.updateOne(
            { "_id" : req.body.voterId },                        
            {
                $set:{
                    featured         : req.body.featured,
                },
                $push:{
                    voterUpdateStatus : {
                        "UserId"          : user._id,
                        "updatedBy"       : user.profile.fullName,
                        "updatedAt"       : new Date(),
                        },
                    }
                }
            )
            .exec()
            .then(data=>{
                if(data.nModified == 1){                
                    res.status(200).json("Voter Updated");
                }else{
                    res.status(401).json("Voter Not Found");
                }
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json({
                    error1: err
                });
            });

        })
          .catch(err =>{
            console.log(err);
            res.status(500).json({
                error2: err
            });
        });
}

//diplay surname list
exports.surname_list = (req,res,next)=>{
    Voters.aggregate([
            {
              $match : {"boothName": req.body.boothName}
            },
            {
              $group : { _id:"$lastName", count:{$sum:1} }
            }
        ])
        .exec()
        .then(surname=>{
            var filtered = surname.filter(function (el) {
              return el._id != null;
            });
                res.status(200).json(filtered);
            
        })
          .catch(err =>{
            console.log(err);
            res.status(500).json({
                error2: err
            });
        });
}

//color list
exports.color_list = (req,res,next)=>{
    Voters.aggregate([
            {
              $match : {"boothName": req.body.boothName}
            },
            {
              $group : { _id:"$color", count:{$sum:1} }
            }
        ])
        .exec()
        .then(colorList=>{
            var filtered = colorList.filter(function (el) {
              return el._id != null;
            });
            res.status(200).json(filtered);
            
        })
          .catch(err =>{
            console.log(err);
            res.status(500).json({
                error2: err
            });
        });
}


//pincode list
 exports.pincode_list = (req,res,next)=>{
  Voters.distinct('pinCode')
    .exec()
    .then(pinCode => {
        res.status(200).json(pinCode);
    })
    .catch(err =>{
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};


//village list
 exports.village_list = (req,res,next)=>{
  Voters.distinct('villageName')
    .exec()
    .then(villageName => {
        res.status(200).json(villageName);
    })
    .catch(err =>{
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};


//boothname village wise
 exports.booth_by_village = (req,res,next)=>{
  Voters.aggregate([
            {
              $match : {"villageName": req.body.villageName}
            },
            {
              $group : { _id:"$boothName"}
            }
        ])
    .exec()
    .then(boothList => {
        res.status(200).json(boothList);
    })
    .catch(err =>{
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};


//send messgae
exports.send_msg = (req,res,next)=>{
    Voters.findOne({"_id":req.body.voterId})
        .exec()
        .then(voter=>{
            console.log("voter",voter);
            console.log("inside=>>>>")
            // var text = "Dear "+voter.fullName+',\n'+"your data updated";    
            var text="मतदाराचे नाव";
           const url = "http://smsgateway.digitalkarbhar.com/submitsms.jsp?user=Sidharth&key=3bd47e3528XX&mobile=+91"+voter.mobileNumber+"&message="+text+"&senderid=RANJIT&accusage=1&unicode=1"
            console.log("url",url)
            axios.get(url)
              .then(response => {
                return res.status(200).json({
                    "message" : 'MESSAGE_SEND',
                });         
            })
            .catch(msgError=>{
                return res.status(501).json({
                    message: "Some Error occurred during sending message",
                    error: msgError
                });        
            });
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });     
}  

exports.update_voting = (req,res,next)=>{
    User.findOne({"_id" : req.body.userId})
        .exec()
        .then(user=>{
            console.log("user",user);
            Voters.updateOne(
            { "_id" : req.body.voter_id },                        
            {
                $set:{
                    voted             : req.body.voted,
                },
                $push:{
                    voterUpdateStatus : {
                        "UserId"          : user._id,
                        "updatedBy"       : user.profile.fullName,
                        "updatedAt"       : new Date(),
                        },
                    }
                }
            )
            .exec()
            .then(data=>{
                if(data.nModified == 1){                
                    res.status(200).json("Voter voted");
                }else{
                    res.status(401).json("Voter Not Found");
                }
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json({
                    error1: err
                });
            });

        })
          .catch(err =>{
            console.log(err);
            res.status(500).json({
                error2: err
            });
        });
}         
   

