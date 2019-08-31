const mongoose = require('mongoose');

const votersSchema = mongoose.Schema({
	_id			      : mongoose.Schema.Types.ObjectId, 
    age               : Number,
    boothName         : String,
    constituencyName  : String,
    firstName         : String,
    gender            : String,
    houseNumber       : String,
    idNumber          : String,
    lastName          : String,
    middleName        : String,
    fullName          : String,
    partNo            : Number,
    partName          : String,
    pinCode           : Number,
    relation          : String,
    relativeName      : String,
    mAge              : Number,
    mBoothName        : String,
    mConstituencyName : String,
    mFirstName        : String,
    mGender           : String,
    mHouseNumber      : String,
    mIdNumber         : String,
    mLastName         : String,
    mMiddleName       : String,
    mFullName         : String,
    mPartNo           : String,
    mPartName         : String,
    mPinCode          : Number,
    mRelation         : String,
    mRelativeName     : String,
    mobileNumber      : String,
    whatsAppNumber    : String,
    dead              : Boolean,
    visited           : Boolean,
    voted             : Boolean,
    changeAddress     : String,
    areaName          : String,
    otherInfo         : String,
    dob               : String,
    emailId           : String,
    aadharCard        : String,
    color             : Number,
    cast              : String,
    favourite         : Boolean,
    voterUpdateStatus : Array,
    voterCreatedAt    : Date,
});

module.exports = mongoose.model('voters',votersSchema);
