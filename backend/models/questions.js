var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var questions = new Schema(
  {
    Sujet: {
      type: String,
    },
    Etudiant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "utilisateur_etudiant",
    },
    Conseiller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Utilisateur_conseiller",
    },
    Question: {
      type: String,
    },
    Reponse: {
        type: String,  
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("questions", questions);
