const articlesEtud = require("../models/Article_etud");

exports.addArticleEtud = (req, res) => {
  const data = req.body;

  const newArticle = new articlesEtud(data)

  newArticle.save(err => {
    if (err) {
      res.status(500).json({ msg: err });
    } else {
      res.json({
        msg: " new article has been added",
      })
    }
  })
};

exports.getArticlesEtud  = (req, res) => {
    articlesEtud.find({ AuteurEtud: req.body.AuteurEtud })
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  
  

  exports.acceptArticlesEtud = async ( req, res ) => {
 
    articlesEtud.updateOne(
        { _id: req.body._id },
        {
            affichage: "A"

        
        }
     )        
     .then(() => {
        res.status(200).json({ message: "accepté" })
    })
     .catch((error) => {
       res.status(400).json({
         error: error,
       });
     });
  };
  
  exports.refusArticlesEtud = async ( req, res ) => {
 
    articlesEtud.updateOne(
        { _id: req.body._id },
        {
          modifié: "AM"

        }
     )        
     .then(() => {
        res.status(200).json({ message: "a modifier" })
    })
     .catch((error) => {
       res.status(400).json({
         error: error,
       });
     });
  };

exports.deleteArticlesEtud = (req, res) => {
    articlesEtud.findByIdAndDelete({ _id: req.body._id })
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

exports.getArticlesEtudAll = (req, res) => {
    articlesEtud.find()
    .populate("AuteurEtud","Nom_prénom img")
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.updateArticlesEtud = async ( req, res ) => {
 
  articlesEtud.updateOne(
      { _id: req.body._id },
      {
        Sujet: req.body.Sujet,
        Image : req.body.Image,
        Description: req.body.Description,
        modifié: "M"

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


exports.getArticleExpById = (req, res) => {
   
  articlesEtud.findOne({_id :req.body._id})
   .then((data) => {
     res.json(data);
   })
   .catch((err) => {
     console.log(err);
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
