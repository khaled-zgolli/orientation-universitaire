var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var favoris = new Schema(
  {
    etudiant: {
      type: String,
    },
    etab: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "etablissement",
    },
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("favoris", favoris);
