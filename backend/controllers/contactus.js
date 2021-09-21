const contactus = require("../models/contactus");

exports.addContactus = (req, res) => {
    const data = req.body;
  
    const newcontactus = new contactus(data);
    newcontactus.save(err => {
      if (err) {
        res.status(500).json({ msg: err });
      } else {
        res.json({
          msg: " new contactus has been added",
        });
      }
    });
  };


exports.getContactus = (req, res) => {
    contactus.find({})
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  

  exports.deleteContactus = (req, res) => {
    contactus.findByIdAndDelete({ _id: req.body._id })
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
  