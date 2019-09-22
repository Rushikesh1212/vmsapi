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
        .sort({"color":1})
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


//voters_updated_by_user
exports.voters_updated_count = (req,res,next)=>{
    Users.find({})
        .exec()
        .then(users=>{
          Voters.find({})
            .exec()
            .then(voters=>{
              var userList = [];
                  for (var i = users.length - 1; i >= 0; i--) {
                    var voterCount = 0;
                   for (var j = voters.length - 1; j >= 0; j--) {
                      for (var k = voters[j].voterUpdateStatus.length - 1; k >= 0; k--) {
                        if(users[i]._id.toString() === voters[j].voterUpdateStatus[k].UserId.toString())
                          {
                              voterCount = voterCount + 1;
                              break;
                          }
                      }
                    }
                    var user = {
                      "userId"          : users[i]._id,
                      "userName"        : users[i].profile.fullName,
                      "mobileNo"        : users[i].mobileNumber,
                      "visitedCount"    : voterCount,
                    }
                    userList.push(user);
                  }
                res.status(200).json(userList);

            })
              .catch(err =>{
                console.log(err);
                res.status(500).json({
                    error2: err
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

//voters_updated_by_user
exports.voters_updated_by_user = (req,res,next)=>{
  console.log("req.body.userId",req.body.userId)
  Users.find({"_id":mongoose.Types.ObjectId(req.body.userId)},{"profile.fullName":1,mobileNumber:1})
      .exec()
      .then(users=>{
        console.log(Users)
        Voters.find({"voterUpdateStatus":{$elemMatch:{"UserId":mongoose.Types.ObjectId(req.body.userId)}}},{fullName:1,mobileNumber:1,"voterUpdateStatus.UserId":1,"voterUpdateStatus.updatedAt":1,idNumber:1})
          .exec()
          .then(voters=>{

              var List = [];
              var voterList = [];
               for (var j = voters.length - 1; j >= 0; j--) {
                  for (var k = voters[j].voterUpdateStatus.length - 1; k >= 0; k--) {
                    if(users[0]._id.toString() === voters[j].voterUpdateStatus[k].UserId.toString())
                      {
                          var voter ={
                            "_id"          : voters[j]._id,
                            "voterId"      : voters[j].idNumber,  
                            "fullName"     : voters[j].fullName,
                            "mobileNumber" : voters[j].mobileNumber,
                            "updatedAt"    : voters[j].voterUpdateStatus[k].updatedAt,
                          }
                          if( k<voters[j].voterUpdateStatus.length){
                              voterList.push(voter)
                              break;
                          }
                      }
                  }
                }
                var data = {
                  "userId"          : users[0]._id,
                  "userName"        : users[0].profile.fullName,
                  "mobileNo"        : users[0].mobileNumber,
                  "voters"          : voterList,
                }
                List.push(data);
            res.status(200).json(List);
          })
            .catch(err =>{
              console.log(err);
              res.status(500).json({
                  error2: err
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
