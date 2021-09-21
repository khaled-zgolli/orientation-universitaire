const { token } = require("morgan");
const nodemailer = require("nodemailer");
const config = require("./auth.config");

const user = config.user;
const pass = config.pass;

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

module.exports.sendForgotPassword= (email, token) => {
  transport.sendMail({
    from: user,
    to: email,
    subject: "Lien pour réinitialiser le mot de passe",
    html: `<div>
        'Vous recevez ceci parce que vous (ou quelqu'un d'autre) avez demandé la réinitialisation du mot de passe de votre compte.\n\n
        Veuillez cliquer sur le lien suivant ou collez-le dans votre navigateur pour terminer le processus dans l'heure suivant sa réception :\n\n <a href=http://localhost:3000/reset/${token}>ici</a>
      Si vous ne l'avez pas demandé, veuillez ignorer cet e-mail et votre mot de passe restera inchangé.\n'
        </div>`,
  })
 
}