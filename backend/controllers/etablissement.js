const Etablissement = require('../models/etablissement');



exports.addEtablissement = (req, res) => {
    const data = req.body;
  
    const etablissement = new Etablissement(data);
    etablissement.save((err) => {
      if (err) {
        res.status(500).json({ msg: err });
      } else {
        res.json({
          msg: ' added',
        });
      }
    });
  };

  exports.getEtablissment = (req, res) => {
   
    Etablissement.find({})
     .then((data) => {
       res.json(data);
     })
     .catch((err) => {
       console.log(err);
     });
 };


 exports.getEtablissmentById = (req, res) => {
   
  Etablissement.findOne({_id :req.body._id})
   .then((data) => {
     res.json(data);
   })
   .catch((err) => {
     console.log(err);
   });
};

 exports.updateEtablissment = async ( req, res ) => {
 
  Etablissement.updateOne(
      { _id: req.body._id },
    req.body
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

exports.deleteEtablissment = (req, res) => {
  Etablissement.findByIdAndDelete({ _id: req.body._id })
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

