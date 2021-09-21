import React from "react";
import { Dialog, DialogContent, makeStyles } from "@material-ui/core";
import { useFormik } from "formik";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import * as yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";

const useStyles = makeStyles(theme => ({

  customizedButton: {
    position: "absolute",
    left: "93%",
    top: "3%",
    backgroundColor: "",
    color: "gray",
  },
}));

const passeRegex = RegExp(
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
);

const nameRegex = RegExp(/^[a-zA-Z ]+$/);

const validationSchema = yup.object().shape({
  Nom_prénom: yup
    .string()
    .matches(nameRegex, "Nom invalide")
    .required("champs obligatoire!"),

  email: yup
    .string()
    .email("Email invalide")
    .required("champs obligatoire!"),

  M_passe: yup
    .string()
    .matches(passeRegex, "Entrer des caractéres alpha-numérique")
    .required("champs obligatoire!"),

  Confirm_M_passe: yup
    .string()
    .oneOf([yup.ref("M_passe"), null], "les mots de passe doivent correspondre")
    .required("champs obligatoire!"),
});

export default function Popupeditadmin({ title, openPopupeditadmin, setOpenPopupeditadmin, data }) {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      Nom_prénom: data.Nom_prénom,
      email: data.email,
      M_passe: data.M_passe,
      Confirm_M_passe: data.M_passe,
      _id:data._id
    },

    validationSchema: validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    enableReinitialize: true,  // Contrôlez si Formik doit réinitialiser le formulaire en cas de initialValueschangement

    onSubmit: values => {
     
      if ( values.email === data.email && values.Nom_prénom === data.Nom_prénom &&  values.M_passe === data.M_passe) {
        setOpenPopupeditadmin(false); 
        Swal.fire({
          icon: "warning",
          title: "Pas de modifications",
          html: '<span style="color:#FFFFFF">  </span>',
          showCloseButton: false,
          showConfirmButton: false,
          background: "black",
          timer: 2000,
        });

      } 
       
      else{

        if(data.M_passe === values.M_passe){
          console.log(values);
          console.log(data._id);

          axios({
            url: "http://localhost:4000/api/data/updateAdminPass",
            method: "put",
            data: {
              _id : data._id,
              Nom_prénom : values.Nom_prénom,
              email :values.email,
              // M_passe: values.M_passe
            },
          })
            .then(res => {
              setOpenPopupeditadmin(false); 
              Swal.fire({
                icon: "success",
                title: "Modifié avec succès",
                html: '<span style="color:#FFFFFF">Les champs sont bien modifiés. </span>',
                showCloseButton: false,
                showConfirmButton: false,
                background: "black",
                timer: 2000,
              });
               setTimeout(() => {
                window.location.reload();
               }, 2000); 
            })
    
            .catch(err => {
              setOpenPopupeditadmin(false); 
    
              Swal.fire({
                icon: "warning",
                html: '<span style="color:#FFF6C5"> Erreur </span>',
                showCloseButton: false,
                showConfirmButton: false,
                background: "black",
                timer: 3500,
              });
            });

        }
        else{
          axios({
            url: "http://localhost:4000/api/data/updateAdmin",
            method: "put",
            data: values,
          })
            .then(res => {
              setOpenPopupeditadmin(false); 
              Swal.fire({
                icon: "success",
                title: "Modifié avec succès",
                html: '<span style="color:#FFFFFF">Les champs sont bien modifiés. </span>',
                showCloseButton: false,
                showConfirmButton: false,
                background: "black",
                timer: 2000,
              });
               setTimeout(() => {
                window.location.reload();
               }, 2000); 
            })
    
            .catch(err => {
              setOpenPopupeditadmin(false); 
    
              Swal.fire({
                icon: "warning",
                html: '<span style="color:#FFF6C5"> Erreur </span>',
                showCloseButton: false,
                showConfirmButton: false,
                background: "black",
                timer: 3500,
              });
            });

        }
      
      }
     
      
    },
  });

  return (
    <Dialog open={openPopupeditadmin} maxWidth="lg"  >
      <DialogContent>
        <IconButton
          className={classes.customizedButton}
          onClick={() => {
            setOpenPopupeditadmin(false); 
          }}
        >
          <CloseIcon />
        </IconButton>
        <h1>Modifier un admin</h1>
        <br />
        <br />
        <form onSubmit={formik.handleSubmit}>
          <div className="Nom_prénom">
            <label htmlFor="Nom_prénom">Nom et prénom</label>
            <input
              placeholder="Nom et prénom"
              type="text"
              name="Nom_prénom"
              value={formik.values.Nom_prénom}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className="errorMessage">
              {formik.touched.Nom_prénom && formik.errors.Nom_prénom
                ? formik.errors.Nom_prénom
                : ""}
            </span>
          </div>

          <div className="email">
            <label htmlFor="email">Email </label>
            <input
              placeholder="Email"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className="errorMessage">
              {formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""}
            </span>
          </div>

          <div className="M_passe">
            <label htmlFor="M_passe">Mot de passe </label>
            <input
              placeholder="Mot de passe"
              type="password"
              name="M_passe"
              value={formik.values.M_passe}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className="errorMessage">
              {formik.touched.M_passe && formik.errors.M_passe
                ? formik.errors.M_passe
                : ""}
            </span>
          </div>

          <div className="Confirm_M_passe">
            <label htmlFor="Confirm_M_passe">Confirme mot de passe </label>
            <input
              placeholder="Confirme mot de passe"
              type="password"
              name="Confirm_M_passe"
              value={formik.values.Confirm_M_passe}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className="errorMessage">
              {formik.touched.Confirm_M_passe && formik.errors.Confirm_M_passe
                ? formik.errors.Confirm_M_passe
                : ""}
            </span>
          </div>
          <div className="createAccount">
            <button type="submit" disabled={!formik.isValid}>
              Modifier le compte
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
