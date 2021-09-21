const express = require("express");
const router = express.Router();

const {
  ChercheEtablissement,
  ChercheEtablissementUniversite,
  ChercheEtablissementDiplome,
  ChercheEtablissementDomaine,
} = require("../controllers/ChercheEtablissement");



const { addFavoris ,
  isFavoris ,deleteFavoris,getFavoris
}=require ("../controllers/favoris")

router.get("/ChercheEtablissement", ChercheEtablissement);
router.post("/ChercheEtablissementUniversite", ChercheEtablissementUniversite);
router.post("/ChercheEtablissementDiplome", ChercheEtablissementDiplome);
router.post("/ChercheEtablissementDomaine", ChercheEtablissementDomaine);


router.post("/addFavoris", addFavoris);

router.post("/isFavoris", isFavoris);

router.delete("/deleteFavoris", deleteFavoris);

router.get("/getFavoris", getFavoris);



module.exports = router;
