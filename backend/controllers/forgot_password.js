const Utilisateur_etud = require("../models/etud");
const Utilisateur_cons = require("../models/cons");
const nodemailer = require("../config/nodconfig_password");
const crypto = require("crypto");




exports.Forgot_etudiant = async (req, res, next) => {
  Utilisateur_etud.findOne(
    { email: req.body.email },

    (error, result) => {
      if (!result) {
        next();
      } else {
        const token = crypto.randomBytes(20).toString("hex");
        Utilisateur_etud.updateOne(
          {
            email: req.body.email,
          },
          {
            resetPasswordToken: token,
          },
          error => {
            if (error) {
              console.log(error);
              res.status(500).json({ message: error });
            } else {
              nodemailer.sendForgotPassword(result.email, token);
              res.status(200).json({ message: "etud consulter votre email" });
            }
          }
        );
      }
    }
  );
};

/************************************************************************************************* */

exports.Forgot_conseiller = async (req, res) => {
  Utilisateur_cons.findOne(
    { email: req.body.email },

    (error, result) => {
      if (!result) {
        res.status(500).json({ message: "User not exists cons" });
      } else {
        const token = crypto.randomBytes(20).toString("hex");

        Utilisateur_cons.updateOne(
          {
            email: req.body.email,
          },
          {
            resetPasswordToken: token,
          },
          error => {
            if (error) {
              res.status(500).json({ message: error });
            } else {
              nodemailer.sendForgotPassword(result.email, token);
              res.status(200).json({ message: "cons consulter votre email" });
            }
          }
        );
      }
    }
  );
};
