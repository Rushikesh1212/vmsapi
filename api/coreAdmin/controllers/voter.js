const mongoose	= require("mongoose");
const Voters        = require('../models/voter');
const User          = require('../models/users');

exports.create_Voters = (req,res,next)=>{
    console.log('req=>',req.body.length);
        for (var i = 0; i <= req.body.length-1; i++) {
            console.log("Inside",req.body[i].age);
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
                color             : 0,
                cast              : "",
                favourite         : false,
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
                voterUpdateStatus: [],
                voterCreatedAt    : new Date(),
            });
            console.log("voters",voters)
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

// Voters List
exports.voters_list = (req,res,next)=>{
    Voters.find({})
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
    User.findOne({"_id" : req.body.userId})
        .exec()
        .then(user=>{
            console.log("user",user);
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
                    favourite         : req.body.favourite,
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
                    error: err
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

