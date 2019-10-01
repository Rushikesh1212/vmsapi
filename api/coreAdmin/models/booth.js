const mongoose = require('mongoose');

const boothSchema = mongoose.Schema({
	_id			      : mongoose.Schema.Types.ObjectId, 
    boothName         : String,
    male              : Number,
    female            : Number,
    total             : Number,
    villageName       : String,
});

module.exports = mongoose.model('booths',boothSchema);

