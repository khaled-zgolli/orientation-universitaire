 const Utilisateur_admin = require('../models/admin')
 const bcrypt = require('bcrypt')

exports.getAdmin = (req, res) => {
    
    Utilisateur_admin.find({})
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };



  exports.updateAdmine = async (
    req,
    res 
  ) => {

  
    Utilisateur_admin.updateOne(
      { _id: req.body._id },
      {
        Nom_prénom: req.body.Nom_prénom,
        email: req.body.email,
        M_passe: await bcrypt.hash(req.body.M_passe, 10)
        

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

  exports.updateAdminPass = async (
    req,
    res 
  ) => {

  
    Utilisateur_admin.updateOne(
      { _id: req.body._id },
      {
        Nom_prénom: req.body.Nom_prénom,
        email: req.body.email,
       
        

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



  exports.deleteAdmin = (req, res) => {
    Utilisateur_admin.findByIdAndDelete({ _id: req.body._id })
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
