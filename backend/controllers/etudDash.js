const Utilisateur_etud = require('../models/etud')
const bcrypt = require('bcrypt')

exports.getEtud = (req, res) => {
   
    Utilisateur_etud.find({})
     .then((data) => {
       res.json(data);
     })
     .catch((err) => {
       console.log(err);
     });
 };



 exports.updateEtud = async ( req, res ) => {
 
    Utilisateur_etud.updateOne(
     { _id: req.body._id },
     {
      img : req.body.img,
      Nom_prénom: req.body.Nom_prénom,
      Ville: req.body.Ville,
      dataNiveau : req.body.dataNiveau, 
      email: req.body.email,
       status: req.body.status,
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


 exports.deleteEtud = (req, res) => {
    Utilisateur_etud.findByIdAndDelete({ _id: req.body._id })
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
