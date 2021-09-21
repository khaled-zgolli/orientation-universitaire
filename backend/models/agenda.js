const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const agenda = new Schema({

		date: 
        {type: String},
		hour : 
        {type: String},
		content :
         {type: String},
		source :
        { type: String},
		name :
        {type: String},
    })
    module.exports = mongoose.model('agenda', agenda);