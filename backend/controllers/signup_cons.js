const Utilisateur_cons = require("../models/cons");
const jwt = require("jsonwebtoken");
const nodemailer = require("../config/nodemailer.config_confirm");


exports.utilisateur_cons = async (req, res) => {
     Utilisateur_cons.findOne({ email: req.body.email },
        (result) => {
            if (result) {
                console.log("User already exists")
                return res.status(401).json({ message: "Email already exists" });
            }
            else {
                const token = jwt.sign({ email: req.body.email }, process.env.SECRET)
                const conseiller = new Utilisateur_cons()
                    conseiller.Nom_prénom = req.body.Nom_prénom,
                    conseiller.email = req.body.email,
                    conseiller.M_passe = conseiller.encryptPassword(req.body.M_passe),
                    conseiller.confirmationCode = token

                conseiller
                    .save((error) => {
                        if (error) {
                            console.log(error);
                            res.status(500).json({ message: error });
                        }
                        else {
                            res.status(200).json({ message: "add" });
                            nodemailer.sendConfirmationEmailC(
                                conseiller.Nom_prénom,
                                conseiller.email,
                                conseiller.confirmationCode
                            )};
                    });
            }
        })

}


exports.confirm_cons = async (req, res) => {
    console.log(req.params.confirmationCode);
    await Utilisateur_cons.findOne(
        {
            confirmationCode: req.params.confirmationCode,
        }, (error , conseiller) => {
            if (!conseiller) {
                console.log(err);
            }
            else {

                Utilisateur_cons.updateOne({
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

        

        exports.getProfilConseiller = (req, res) => {
  
   
            Utilisateur_cons.findById({_id: req.body._id})
             .then((data) => {
               res.json(data);
             })
             .catch((err) => {
               console.log(err);
             });
          };
          
          exports.updateProfilConseiller = async ( req, res ) => {
 
            Utilisateur_cons.updateOne(
             { _id: req.body._id },
             {
               Nom_prénom: req.body.Nom_prénom,
               specialite: req.body.specialite,
               img : req.body.img,
               description : req.body.description,
               LinkedIn : req.body.LinkedIn,
               email : req.body.email,
               numero : req.body.numero,

              
            
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
          
          