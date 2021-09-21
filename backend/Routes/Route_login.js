const express = require('express');
const { Verif_conseiller } = require('../controllers/login_functions');
const { Verif_etudiant } = require('../controllers/login_functions');
const { Verif_administrateur } = require('../controllers/login_functions');
const router = express.Router()

router.post('/login', Verif_etudiant, Verif_conseiller, Verif_administrateur);

module.exports = router
