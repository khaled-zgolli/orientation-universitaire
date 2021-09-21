var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");

var Utilisateur_admin = new Schema({

    Role: {
        type: String,
        default: "Admin"
    },
    Nom_prénom: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    M_passe: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Active'
    },
    }, 
{
    timestamps: true,
})


Utilisateur_admin.methods.encryptPassword = function (M_passe) {
    return bcrypt.hashSync(M_passe, bcrypt.genSaltSync(10), null);
  };
  
//   Utilisateur_admin.methods.validPassword = function (password) {
//     return bcrypt.compareSync(password, this.password);
//   };
  

module.exports = mongoose.model('Utilisateur_administrateur', Utilisateur_admin);
