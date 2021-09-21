const Utilisateur_admin = require('../models/admin')


exports.utilisateur_admin = async (req, res) => {
    Utilisateur_admin.findOne({ email: req.body.email },
        function (result) {
            if (result) {
                console.log("User already exists")
                return res.status(401).json({ message: "Email already exists" });
            }
            else {    
                const useradmin = new Utilisateur_admin()
                    useradmin.Nom_prénom = req.body.Nom_prénom,
                    useradmin.email = req.body.email,
                    useradmin.M_passe = useradmin.encryptPassword(req.body.M_passe),
                    useradmin
                        .save((error) => {
                            if (error) {
                                console.log(error);
                                res.status(500).json({ message: error });
                            }
                            else {
                                res.status(200).json({ message: "add" });
                            };
                        });
            }
        })
}