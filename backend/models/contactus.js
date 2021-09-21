var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var contactus = new Schema(
  {
    nom: {
      type: String,
    },
    email: {
        type: String,  
    },
    numero: {
      type: String,  
    },
    Description: {
      type: String,
    },
    date : String
  
   },
);

module.exports = mongoose.model("contactus", contactus);
