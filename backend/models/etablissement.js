var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var etablissement = new Schema({
  img: {
    type: String,
    default:"data:image/png;base64,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"
  },
  nom: String,
  universite: String,
  ville: String,
  Description: String,
  numero: String,
  adress: String,
  email: String,
  site: String,
  filière: [
    {
      domaine: String,
      filièreNom: String,
      diplome: String,
      description :String,
      section: [
        {
          sectionName: {
            type: String,
            default: "--",
            required: true,
          },
          score: {
            type: String,
            default: "--",
            required: true,
          },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("etablissement", etablissement);