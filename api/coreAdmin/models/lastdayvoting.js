const mongoose = require('mongoose');

const lastDayVotingSchema = mongoose.Schema({
	_id			      : mongoose.Schema.Types.ObjectId, 
    lastdayvoting     : Boolean,
});

module.exports = mongoose.model('lastdayvoting',lastDayVotingSchema);