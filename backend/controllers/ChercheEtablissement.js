const Etablissement = require("../models/etablissement");

exports.ChercheEtablissement = async (req, res) => {
  Etablissement.find({})
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.ChercheEtablissementUniversite = async (req, res) => {
  Etablissement.find({ universite: req.body.universite })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.ChercheEtablissementDiplome = async (req, res) => {
  Etablissement.aggregate([{ $match: { "filière.diplome": req.body.diplome } }])
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.ChercheEtablissementDomaine = async (req, res) => {
  Etablissement.aggregate([{ $match: { "filière.domaine": req.body.domaine } }])
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
    });
};
