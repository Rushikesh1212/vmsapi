const mongoose  = require("mongoose");
const Voters        = require('../models/voter');
const User          = require('../models/users');
const Booth         = require('../models/booth');
const axios         = require('axios');

exports.add_booth = (req,res,next)=>{
    console.log('req=>',req.body);
            const booth = new Booth({
                _id              : new mongoose.Types.ObjectId(),
                boothName         : req.body.boothName,
                male              : req.body.male,
                female            : req.body.female,
                total             : req.body.total
              });
            console.log("booth",booth)
             booth.save()
                  .then(data=>{                                            
                     return res.status(200).json({
                        "message" : 'booth Added',
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

//search booth in boothlist
exports.search_booth = (req,res,next)=>{
  Booth.find({"boothName" : {"$regex":req.body.boothName,$options: "i"}})
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
}

//display boothList
exports.booth_list = (req,res,next)=>{
  Booth.find({})
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
}
