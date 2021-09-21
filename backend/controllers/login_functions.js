const express = require('express')
const Utilisateur_etud = require('../models/etud')
const Utilisateur_admin = require('../models/admin')
const Utilisateur_cons = require('../models/cons')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


/*----------------------------------------------------------*/


exports.Verif_etudiant = function (req, res, next) {

  Utilisateur_etud.findOne({ email: req.body.email }, function( error, utilisateur_etudiant) {

        if (!utilisateur_etudiant) 
        {
          next();
        }
        
        else if ( !bcrypt.compareSync( req.body.M_passe, utilisateur_etudiant.M_passe))
        {
          return res.status(401).send({ error:  'Mot de passe incorrect !' });
        }

         else if (utilisateur_etudiant.status != "Active") 
          {
          return res.status(401).send({
          message: "compte en attente de verif ETUD!",
          });
          }
          else {

            res.status(200).json({

              user: utilisateur_etudiant,

  
               token: jwt.sign(
                { 
                  user: utilisateur_etudiant,
                },
                      'RANDOM_TOKEN_SECRET_ETUD',
                        { expiresIn: '4h' }
              )
            })
        }
    }
    )};


/*----------------------------------------------------------*/

exports.Verif_conseiller = function (req, res, next) {

    Utilisateur_cons.findOne({ email: req.body.email }, function(error, utilisateur_conseiller) {

        if (!utilisateur_conseiller) {
            next();
        }

        else if( !bcrypt.compareSync(req.body.M_passe, utilisateur_conseiller.M_passe)) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
        }

        else if (utilisateur_conseiller.status != "Active") {
            return res.status(401).send({
                message: "compte en attente de verif CONS!",
            });
        }

        else {

          res.status(200).json({

            user: utilisateur_conseiller,

             token: jwt.sign(
              { 
                user: utilisateur_conseiller,

              },
                    'RANDOM_TOKEN_SECRET_CONS',
                        { expiresIn: '4h' }
             )
                    })
                }
            }
 )};

/*----------------------------------------------------------*/


    exports.Verif_administrateur = function (req, res) {

        Utilisateur_admin.findOne({ email: req.body.email }, function( error, Utilisateur_administrateur) {

        if (!Utilisateur_administrateur) {
            return res.status(401).send({ msg: "is not associated with any account. please check and try again!"});
        }

        else if(!bcrypt.compareSync( req.body.M_passe, Utilisateur_administrateur.M_passe )){
            return res.status(401).send({ msg: 'Mot de passe incorrect !' });
        }

        else if (Utilisateur_administrateur.status != "Active") {
            return res.status(401).send({
                message: "compte en attente de verif ADMIN!",
            });
        }

        else {

          res.status(200).json({
            user: Utilisateur_administrateur,


             token: jwt.sign(
              { 
                user: Utilisateur_administrateur
              },
                    'RANDOM_TOKEN_SECRET_ADMIN',
                        { expiresIn: '4h' }
             )
            })
            }
            }
 )};    