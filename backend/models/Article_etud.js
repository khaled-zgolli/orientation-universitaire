var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var articlesEtud = new Schema(
  {
    Sujet: {
      type: String,
      required: true,
    },
    affichage:{
        type: String,
        enum: ['A', 'NA'],
        default: 'NA'
    },
    AuteurEtud: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "utilisateur_etudiant",
    },
    Image: {
      type: String,
    },
    Description: {
      type: String, 
    },
    modifié: {
        type: String,
        enum: ['M', 'AM'],
        default: 'M'
    },
},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("articleEtud", articlesEtud);
