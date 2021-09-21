const Article = require("../models/articles");

exports.addArticle = (req, res) => {
  const data = req.body;

  const newArticle = new Article(data);
  newArticle.save(err => {
    if (err) {
      res.status(500).json({ msg: err });
    } else {
      res.json({
        msg: " new article has been added",
      });
    }
  });
};

exports.getArticles = (req, res) => {
  Article.find()
    .populate("AuteurCons","Role Nom_prénom")
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getArticlesCons = (req, res) => {
  Article.find({ AuteurCons: req.body.AuteurCons })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
    });
};


exports.updateArticles = async ( req, res ) => {
 
  Article.updateOne(
      { _id: req.body._id },
      {
        Sujet: req.body.Sujet,
        Image : req.body.Image,
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

exports.deleteArticles = (req, res) => {
  Article.findByIdAndDelete({ _id: req.body._id })
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

//  exports.updateAffichage =(req , res)=>{
//   console.log(req.body);
  
//   Article.updateOne(
//    { _id: req.body._id },
//    {
//      affichage: req.body.affichage,
//    }
// )
// .then(() => {
//   res.status(200).json({
//     message: ' Updated!',
//   });
// })
// .catch((error) => {
//   res.status(400).json({
//     error: error,
//   });
// });
// }
exports.getArticleById = (req, res) => {
   
  Article.findOne({_id :req.body._id})
   .then((data) => {
     res.json(data);
   })
   .catch((err) => {
     console.log(err);
   });
};
