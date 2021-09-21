const Actualites = require('../models/actualites')


exports.addActualite = (req, res) => {
    const data = req.body;
  
    const newActualites = new Actualites(data);
    newActualites.save((err) => {
      if (err) {
        res.status(500).json({ msg: err });
      } else {
        res.json({
          msg: ' new project has been added',
        });
      }
    });
  };


  exports.getActualites = (req, res) => {
    
    Actualites.find({})
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  exports.updateActualites = async ( req, res ) => {
 
    Actualites.updateOne(
        { _id: req.body._id },
        {
          Titre: req.body.Titre,
          Source: req.body.Source,
          img : req.body.img,
          Description: req.body.Description,
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

 exports.deleteActualites = (req, res) => {
  Actualites.findByIdAndDelete({ _id: req.body._id })
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


 exports.getActualiteById = (req, res) => {
   
  Actualites.findOne({_id :req.body._id})
   .then((data) => {
     res.json(data);
   })
   .catch((err) => {
     console.log(err);
   });
};

