const mongoose	= require("mongoose");
const Voters   = require('../models/voter');
const User          = require('../models/users');


// Activity Log
exports.user_activity = (req,res,next)=>{
  console.log("req.body.fromDate",req.body.fromDate)
  console.log("req.body.fromDate",req.body.toDate)
    Voters.find({"voterUpdateStatus" : {
      $elemMatch: {
        UserId : 1,
        'updatedBy' :1,
        'updatedAt' : {
                $gte : new Date(req.body.fromDate),
                $lte : new Date(req.body.toDate)
              }
            }
          }
        })
        .exec()
        .then(voters=>{
          res.status(200).json(voters);
        })
      .catch(err =>{
          console.log(err);
          res.status(500).json({
              message : "No Data Found",
              error   : err
          });
      });
    
}

