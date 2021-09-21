const questions = require("../models/questions");

const etud =require("../models/etud")

exports.addQuestions = (req, res) => {
    const data = req.body;
  
    const newQuestions = new questions(data);
    newQuestions.save(err => {
      if (err) {
        res.status(500).json({ msg: err });
      } else {
        res.json({
          msg: " new article has been added",
        });
      }
    });
  };


exports.getQuestions = (req, res) => {
    questions.find()
      .populate("Etudiant", " Nom_prénom  img")
      .populate("Conseiller"," Nom_prénom")
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        console.log(err);
      });
  };


  exports.getQuestionsEtud = (req, res) => {
    questions.find({Etudiant : req.body._id})
      .populate("Conseiller"," Nom_prénom img")
      .populate("Etudiant "," Nom_prénom img")
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        console.log(err);
      });
  };


  exports.getQuestionsCons = (req, res) => {
    questions.find({Conseiller : req.body._id})
      .populate("Conseiller"," Nom_prénom img")
      .populate("Etudiant "," Nom_prénom img")
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  

exports.updateQuestions = async ( req, res ) => {
    questions.updateOne(
        { _id: req.body._id },
        {
          Reponse : req.body.Reponse,
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

  exports.deleteQuestions = (req, res) => {
    questions.findByIdAndDelete({ _id: req.body._id })
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
  