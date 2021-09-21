const Utilisateur_cons = require("../models/cons");
const Utilisateur_etud = require("../models/etud");

exports.updatePasswordViaEmail_etud = async (req, res, next) => {
  Utilisateur_etud.findOne({
    _id: req.body._id,
  })
  .then((etudiant) => {
    if (etudiant) {
      Utilisateur_etud.findByIdAndUpdate(
        req.body._id ,
        {
          M_passe: etudiant.encryptPassword(req.body.M_passe),
          resetPasswordToken: "",
        }
      ).then(() => {
        res.status(200).send({ auth: true, message: "password updated" });
      });
    } else {
      next();
    }
  });
};

exports.updatePasswordViaEmail_cons = async (req, res, next) => {
  Utilisateur_cons.findOne({
    _id: req.body._id,
  })
  .then((conseiller) => {
    if (conseiller) {
      Utilisateur_cons.findByIdAndUpdate(
        req.body._id ,
        {
          M_passe: conseiller.encryptPassword(req.body.M_passe),
          resetPasswordToken: "",
        }
      ).then(() => {
        res.status(200).send({ auth: true, message: "password updated" });
      });
    } else {
      console.error("no user exists in db to update");
      res.status(404).json("no user exists in db to update");
    }
  });
};
