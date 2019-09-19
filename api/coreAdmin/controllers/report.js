const mongoose	= require("mongoose");
const Voters   = require('../models/voter');
const Users          = require('../models/users');


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

// dasboard tab
exports.dasboard_tab = (req,res,next)=>{
    Voters.find({}).count()
        .exec()
        .then(voters=>{
          Voters.find({"visited":true}).count()
              .exec()
              .then(updated=>{
                 Users.find({}).count()
                  .exec()
                  .then(users=>{
                      Users.find({"profile.status":"Active"}).count()
                        .exec()
                        .then(active=>{
                          return res.status(200).json({
                            totalVoters:voters,
                            updatedVoters:updated,
                            totalUsers:users,
                            activeUesr:active
                          }); 
                          
                        })
                      .catch(err =>{
                          console.log(err);
                          res.status(500).json({
                              message : "No Data Found",
                              error   : err
                          });
                      });  
                  })
                .catch(err =>{
                    console.log(err);
                    res.status(500).json({
                        message : "No Data Found",
                        error   : err
                    });
                });
                
              })
            .catch(err =>{
                console.log(err);
                res.status(500).json({
                    message : "No Data Found",
                    error   : err
                });
            });
        })
      .catch(err =>{
          console.log(err);
          res.status(500).json({
              message : "No Data Found",
              error   : err
          });
      });
    
}

//color list
exports.color_list1 = (req,res,next)=>{
    Voters.aggregate([
            {
              $group : { _id:"$color", count:{$sum:1} }
            }
        ])
        .exec()
        .then(colorList=>{
            var filtered = colorList.filter(function (el) {
              return el._id != null;
            });
            var colorList1 = [];
            var color="";
            for (var i = filtered.length - 1; i >= 0; i--) {
                for (var j = 5; j > 0; j--) {
                    if(filtered[i]._id===j){
                        color={
                            color : filtered[i]._id,
                            count : filtered[i].count
                        }
                    colorList1.push(color);

                    }else if(i==filtered.length-1){
                         color={
                            color : j,
                            count : 0,
                        }
                    colorList1.push(color);

                    }
                }
                
            }
                res.status(200).json(colorList1);
            
        })
          .catch(err =>{
            console.log(err);
            res.status(500).json({
                error2: err
            });
        });
}
