const mongoose	= require("mongoose");
const Voters        = require('../models/schema');

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