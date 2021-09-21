const Agenda = require("../models/agenda");




exports.getAgenda = (req, res) => {
   
    Agenda.find({})
     .then((data) => {
       res.json(data);
     })
     .catch((err) => {
       console.log(err);
     });
};





exports.addEvent= (req, res) => {
  const data = req.body;

  const newAgenda = new Agenda(data);
  newAgenda.save(err => {
    if (err) {
      res.status(500).json({ msg: err });
    } else {
      res.json({
        msg: " new agenda has been added",
      });
    }
  });
};


exports.deleteEvent = (req, res) => {
    Agenda.findOneAndDelete({ name: req.body.name })
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


