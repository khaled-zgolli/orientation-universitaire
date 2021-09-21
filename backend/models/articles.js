var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var articles = new Schema(
  {
    Sujet: {
      type: String,
      required: true,
    },
    affichage:{
      type: String,
      default :"true"
    },
    AuteurCons: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Utilisateur_conseiller",
    },
    Image: {
      type: String,
    },
    Description: {
      type: String, 
    }},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("article", articles);
