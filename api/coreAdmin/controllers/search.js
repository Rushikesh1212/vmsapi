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

    voterNameArray.push({"firstName" : {"$regex": voterName, $options: "i"}});      
    voterNameArray.push({"middleName" : {"$regex": voterName, $options: "i"}});
    voterNameArray.push({"lastName" : {"$regex": voterName, $options: "i"}});

    selector.push({$or : voterNameArray });

  }

  // for age ----------------------------------------------------
  if(req.body.voterAgeFrom != "" && req.body.voterAgeTo){
    selector.push({"age" : {$gt : req.body.voterAgeFrom, $lte : req.body.voterAgeTo } });
  }

  // for idNumber ----------------------------------------------------
  if(req.body.idNumber && req.body.idNumber != ""){
    selector.push({"idNumber" : req.body.idNumber });
  }

   // for boothName ----------------------------------------------------
  if(req.body.boothName && req.body.boothName != ""){
    selector.push({"boothName" : {"$regex":req.body.boothName,$options: "i"}});
  }

  console.log("selector = ", JSON.stringify(selector));

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

};

