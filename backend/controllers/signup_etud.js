const Utilisateur_etud = require("../models/etud");
const jwt = require("jsonwebtoken");
const nodemailer = require("../config/nodemailer.configg_confirm");



exports.utilisateur_etud = async (req, res) => {
  Utilisateur_etud.findOne({ email: req.body.email },
     (result) => {
      if (result) {
        console.log("User already exists")
        return res.status(401).json({ message: "Email already exists" });
      }
      else {
        const token = jwt.sign({ email: req.body.email }, process.env.SECRET)
        const etudiant = new Utilisateur_etud()
                etudiant.Nom_prénom = req.body.Nom_prénom,
                etudiant.email = req.body.email,
                etudiant.Ville = req.body.Ville,
                etudiant.M_passe = etudiant.encryptPassword(req.body.M_passe),
                etudiant.confirmationCode = token


        etudiant
          .save((error) => {
            if (error) {
              console.log(error);
              res.status(500).json({ message: error });
            }
            else {
              res.status(200).json({ message: "add" });
              nodemailer.sendConfirmationEmailE(
                etudiant.Nom_prénom,
                etudiant.email,
                etudiant.confirmationCode
              )};
          });

      }
    })

}


exports.confirm_etud = async (req, res) => {
  await Utilisateur_etud.findOne(
      {
          confirmationCode: req.params.confirmationCode,
      }, (error , etudiant) => {
          if (!etudiant) {
              console.log(err);
          }
          else {

              Utilisateur_etud.updateOne({
                  confirmationCode: req.params.confirmationCode
              },
                  { status: "Active" }, (error) => {
                      if (error) {
                          res.status(500).json({ message: error });
                      }
                  });
          }
      })

}


exports.updateProfilEtudiant = async ( req, res ) => {
 
  Utilisateur_etud.updateOne(
   { _id: req.body._id },
   {
     Nom_prénom: req.body.Nom_prénom,
     Ville: req.body.Ville,
     img : req.body.img,
     dataNiveau : req.body.dataNiveau
    
  
   }
 )
   .then(() => {
     res.status(200).json({
       message: ' Updated!',
     });
   })
   .catch((error) => {
     res.status(400).json({
       error: error,
     });
   });
};

exports.getProfilEtudiant = (req, res) => {
  
   
  Utilisateur_etud.findById({_id: req.body._id})
   .then((data) => {
     res.json(data);
   })
   .catch((err) => {
     console.log(err);
   });
};

