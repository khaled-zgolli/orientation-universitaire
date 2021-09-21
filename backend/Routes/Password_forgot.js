const express = require('express');
const router = express.Router()
const { Forgot_etudiant } = require('../controllers/forgot_password');
const { Forgot_conseiller } = require('../controllers/forgot_password');
const {reset_password_cons , reset_password_etud }  = require('../controllers/Reset_password');
const {updatePasswordViaEmail_etud , updatePasswordViaEmail_cons }  = require('../controllers/updatePasswordViaEmail');


router.post('/passwordF', Forgot_etudiant , Forgot_conseiller);
router.get('/reset', reset_password_cons , reset_password_etud);
router.put('/updatePassword', updatePasswordViaEmail_etud , updatePasswordViaEmail_cons );

module.exports = router


