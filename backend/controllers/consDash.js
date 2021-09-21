const Utilisateur_cons = require('../models/cons')
const bcrypt = require('bcrypt')

exports.getCons = (req, res) => {
   
    Utilisateur_cons.find({})
     .then((data) => {
       res.json(data);
     })
     .catch((err) => {
       console.log(err);
     });
};

exports.getConsOne = (req, res) => {
   
  Utilisateur_cons.findOne({ _id: req.body._id })
   .then((data) => {
     res.json(data);
   })
   .catch((err) => {
     console.log(err);
   });
};


 exports.updateCons = async ( req, res ) => {
 
    Utilisateur_cons.updateOne(
        { _id: req.body._id },
        {
          img : req.body.img,
          Nom_prénom: req.body.Nom_prénom,
          email: req.body.email,
          status: req.body.status,
          specialite: req.body.specialite,
          description: req.body.description,
          LinkedIn: req.body.LinkedIn,
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

 exports.updateConsFavoris = async ( req, res ) => {
 
  Utilisateur_cons.updateOne(
      { _id: req.body._id },
      {
        favoris: req.body.favoris,

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


 exports.deleteCons = (req, res) => {
  Utilisateur_cons.findByIdAndDelete({ _id: req.body._id })
     .then(() => {
       res.status(200).json({
         message: 'Deleted!',
       });
     })
     .catch((error) => {
       res.status(400).json({
         error: error,
       });
     });
 };
