const mongoose       = require("mongoose");
const Lastdayvoting  = require('../models/lastdayvoting');

//post last day value
exports.add_last_day_voting = function (req, res,next) {
    const lastdayvoting = new Lastdayvoting({
                 _id              : new mongoose.Types.ObjectId(),
                lastdayvoting     : req.body.lastDayVotingStatus,
            });
        lastdayvoting.save()
        .then(lastdayvoting=>{
            res.status(200).json(lastdayvoting);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

//get last day value
exports.last_day_voting = function (req, res,next) {
    Lastdayvoting.find({})
        .exec()
        .then(lastdayvoting=>{
          console.log("lastdayvoting",lastdayvoting)
            res.status(200).json(lastdayvoting);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

//updated last day value
exports.last_day_active = function (req, res,next) {
    Lastdayvoting.updateOne(
      { _id:req.body.lastDayVotingId},  
      {
          $set:{
           "lastdayvoting"  : req.body.lastDayVotingStatus, 
          }
         }
        )
        .exec()
        .then(data=>{
            console.log('data ',data);
            if(data.nModified == 1){
        // console.log('data =========>>>',data);
                res.status(200).json("lastdayvoting "+req.body.lastDayVotingStatus);
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

