const Favoris = require('../models/favoris');

exports.addFavoris = (req, res) => {
    const data = req.body;
  
    const favoris = new Favoris(data);
    favoris.save((err) => {
      if (err) {
        res.status(500).json({ msg: err });
      } else {
        res.json({
          msg: ' added',
        });
      }
    });
  };



  
exports.isFavoris = (req, res) => {
    Favoris.find({ etudiant: req.body.etudiant , etab: req.body.etab})
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        console.log(err);
      });
  };


  
exports.deleteFavoris = (req, res) => {
    Favoris.findOneAndDelete({ etudiant: req.body.etudiant ,  etab: req.body.etab})
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


   
exports.getFavoris = (req, res) => {
    Favoris.find()
      .populate("etab","nom ville _id universite")
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        console.log(err);
      });
  };
