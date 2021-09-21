var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var actualites = new Schema({

    Titre: {
        type: String,
        required: true,
    },
    Source: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    Description: {
        type: String,
    },
}, 
{
    timestamps: true,
})
  

module.exports = mongoose.model('actualite', actualites);

