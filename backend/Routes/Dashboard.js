const express = require("express");
const router = express.Router();

const { addContactus, getContactus, deleteContactus}= require("../controllers/contactus")
const { getAdmin, updateAdmine, deleteAdmin ,updateAdminPass} = require("../controllers/admindash");
const { getEtud, updateEtud, deleteEtud } = require("../controllers/etudDash");
const { getCons, updateCons, deleteCons , updateConsFavoris , getConsOne } = require("../controllers/consDash");
const { addActualite, getActualites, updateActualites, deleteActualites , getActualiteById} = require("../controllers/Actualites");
const { addArticle, getArticles, updateArticles, deleteArticles , updateAffichage , getArticlesCons , getArticleById } = require("../controllers/Articles");
const { addEtablissement, getEtablissment , updateEtablissment , deleteEtablissment , getEtablissmentById } = require("../controllers/etablissement");
const { addQuestions, getQuestions, updateQuestions , deleteQuestions ,getQuestionsEtud , getQuestionsCons} = require("../controllers/questions");
const { addArticleEtud , getArticlesEtud , acceptArticlesEtud , refusArticlesEtud, deleteArticlesEtud , getArticlesEtudAll ,updateArticlesEtud , getArticleExpById} = require("../controllers/Article_etud");


router.post("/addContactus", addContactus);
router.get("/getContactus", getContactus);
router.delete("/deleteContactus", deleteContactus);


router.get("/admin", getAdmin);
router.put("/updateAdmin", updateAdmine);
router.put("/updateAdminPass", updateAdminPass);
router.delete("/deleteAdmin", deleteAdmin);

router.get("/etudiant", getEtud);
router.put("/updateEtud", updateEtud);
router.delete("/deleteEtud", deleteEtud);

router.get("/conseiller", getCons);
router.put("/updateCons", updateCons);
router.delete("/deleteCons", deleteCons);
router.put("/updateConsFavoris", updateConsFavoris);
router.post("/getConsOne", getConsOne);


router.post("/addactualites", addActualite);
router.get("/getactualites", getActualites);
router.post("/getActualiteById", getActualiteById);
router.put("/updateActualites", updateActualites);
router.delete("/deleteActualites", deleteActualites);


router.post("/addarticle", addArticle);
router.get("/getArticles", getArticles);
router.post("/getArticlesCons", getArticlesCons);
router.post("/getArticleById", getArticleById);
router.put("/updateArticles", updateArticles);
router.delete("/deleteArticles", deleteArticles);


// router.put("/updateArticlesAffichage", updateAffichage);

router.post("/addEtablissement", addEtablissement);
router.get("/getEtablissement", getEtablissment);
router.post("/getEtablissmentById", getEtablissmentById);
router.put("/updateEtablissment", updateEtablissment);
router.delete("/deleteEtablissment", deleteEtablissment);

router.post("/addQuestions", addQuestions);
router.get("/getQuestions", getQuestions);
router.put("/updateQuestions", updateQuestions);
router.delete("/deleteQuestions", deleteQuestions);
router.post("/getQuestionsEtud", getQuestionsEtud);
router.post("/getQuestionsCons", getQuestionsCons);

router.post("/addArticleEtud", addArticleEtud);
router.post("/getArticlesEtud", getArticlesEtud);
router.post("/getArticleExpById", getArticleExpById);
router.get("/getArticlesEtudAll", getArticlesEtudAll);
router.put("/acceptArticlesEtud", acceptArticlesEtud);
router.put("/refusArticlesEtud", refusArticlesEtud);
router.put("/updateArticlesEtud", updateArticlesEtud);
router.delete("/deleteArticlesEtud", deleteArticlesEtud);






module.exports = router;
