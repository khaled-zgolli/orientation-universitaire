const express = require("express");
const router = express.Router()


const { utilisateur_cons, confirm_cons , getProfilConseiller , updateProfilConseiller} = require("../controllers/signup_cons")
const { utilisateur_etud, confirm_etud , updateProfilEtudiant , getProfilEtudiant} = require("../controllers/signup_etud")
const { utilisateur_admin} = require('../controllers/signup_admin')



router.post("/signup_cons/add", utilisateur_cons);
router.get('/confirm_cons/:confirmationCode', confirm_cons);
router.post("/signup_etud/add", utilisateur_etud);
router.get('/confirm_etud/:confirmationCode', confirm_etud);
router.post("/signup_admin/add", utilisateur_admin);
router.put("/updateProfilEtudiant", updateProfilEtudiant);
router.post("/getProfilEtudiant", getProfilEtudiant);
router.post("/getProfilConseiller", getProfilConseiller);
router.put("/updateProfilConseiller", updateProfilConseiller);



module.exports = router