//////////////New Code for VMS///////////////
const mongoose  = require("mongoose");

const Voters        = require('../models/voter');


// ===================== round robin ================
exports.searchVoters = (req,res,next)=>{
  var selector = [];

// for voterName ----------------------------------------------------
    if(req.body.voterName && req.body.voterName != ""){
    var voterName = req.body.voterName;
    var voterNameArray = [];
    var tempVoter = voterName.split(" ");
    console.log("tempVoter",tempVoter);
    if(tempVoter && tempVoter.length==2){
      voterNameArray.push({$and : [{"firstName"  : {"$regex": tempVoter[0], $options: "i"}},{"lastName" : {"$regex": tempVoter[1], $options: "i"}}]});
      voterNameArray.push({$and : [{"mFirstName"  : {"$regex": tempVoter[0], $options: "i"}},{"mLastName" : {"$regex": tempVoter[1], $options: "i"}}]});
    }

    if(tempVoter && tempVoter.length!==2){
      voterNameArray.push({"mFullName"  : {"$regex": voterName, $options: "i"}});
      voterNameArray.push({"fullName"   : {"$regex": voterName, $options: "i"}});
    }

    selector.push({$or : voterNameArray });

  }

  // for age ----------------------------------------------------
  if(req.body.voterAgeFrom !== "" && req.body.voterAgeTo){
    selector.push({"age" : {$gt : req.body.voterAgeFrom, $lte : req.body.voterAgeTo } });
  }

  // for idNumber ----------------------------------------------------
  if(req.body.idNumber && req.body.idNumber !== ""){
    selector.push({"idNumber" : {"$regex":req.body.idNumber,$options: "i"}});
  }

   // for boothName ----------------------------------------------------
  if(req.body.boothName && req.body.boothName !== ""){
    selector.push({"boothName" : req.body.boothName});
  }

  if(req.body.mBoothName && req.body.mBoothName !== ""){
    selector.push({"mBoothName" : req.body.mBoothName});
  }

    // for areaName ----------------------------------------------------
  if(req.body.areaName && req.body.areaName !== ""){
    selector.push({"areaName" : {"$regex":req.body.areaName,$options: "i"}});
  }
    // for cast ----------------------------------------------------
  if(req.body.cast && req.body.cast !== ""){
    selector.push({"cast" : {"$regex":req.body.cast,$options: "i"}});
  }
  // for aadharCard ----------------------------------------------------
  if(req.body.aadharCard && req.body.aadharCard !== ""){
    selector.push({"aadharCard" : {"$regex":req.body.aadharCard,$options: "i"}});
  }

   // for favourite ----------------------------------------------------
  if(req.body.featured && req.body.featured !== ""){
    selector.push({"featured" : req.body.featured});
  }

  // for dead ----------------------------------------------------
  if(req.body.dead && req.body.dead !== ""){
    selector.push({"dead" : req.body.dead});
  }

  // for visited ----------------------------------------------------
  if(req.body.visited && req.body.visited !== ""){
    selector.push({"visited" : req.body.visited});
  }

    // for voted ----------------------------------------------------
  if(req.body.voted && req.body.voted !== ""){
    selector.push({"voted" : req.body.voted});
  }

     // for mobileNumber ----------------------------------------------------
  if(req.body.mobileNumber && req.body.mobileNumber !== ""){
    selector.push({"mobileNumber" : req.body.mobileNumber});
  }

   // for mobileNumber ----------------------------------------------------
  if(req.body.color && req.body.color !== ""){
    selector.push({"color" : req.body.color});
  }

  // console.log("selector = ", JSON.stringify(selector));

  Voters.find({ $and : selector},{serialNo:1,fullName:1,mFullName:1,mobileNumber:1,boothName:1,idNumber:1,age:1,gender:1,mBoothName:1})
      .sort({"fullName" : -1})
      .skip(0)
      .limit(200)
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

};







