const Utilisateur_cons = require("../models/cons");
const Utilisateur_etud = require("../models/etud");

exports.reset_password_cons = async (req, res, next) => {
  
  Utilisateur_cons.findOne({
    resetPasswordToken: req.query.resetPasswordToken,

    
  }).then(result => {
    if (!result) {
      next();
    } else {
      res.status(200).send({
        _id: result._id,
        message: "password reset link a-ok",
      });
    }
  });
};

exports.reset_password_etud = async (req, res) => {
  Utilisateur_etud.findOne({
    resetPasswordToken: req.query.resetPasswordToken,

    
  }).then(result => {
    if (!result) {
      res.status(403).send("password reset link is invalid ");
    } else {
      res.status(200).send({
        _id: result._id,
        message: "password reset link a-ok",
      });
    }
  });
};
