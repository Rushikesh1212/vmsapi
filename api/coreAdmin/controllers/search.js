//////////////New Code for VMS///////////////
const mongoose  = require("mongoose");

const Voters        = require('../models/voter');


// ===================== round robin ================
exports.searchVoters = (req,res,next)=>{
  var selector = [];

// for voterName ----------------------------------------------------
    if(req.body.voterName != ""){
    var voterName = req.body.voterName.trim();
    var voterNameArray = [];

    voterNameArray.push({"firstName" : voterName.trim()});      
    voterNameArray.push({"middleName" : voterName.trim()});
    voterNameArray.push({"lastName" : voterName.trim()});

    selector.push({$or : locArray });

  }



  console.log("selector = ", JSON.stringify(selector));

  Voters.find({ $and : selector })
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

