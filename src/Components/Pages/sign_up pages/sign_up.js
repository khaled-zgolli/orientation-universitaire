import React from 'react'
import './sign_up.css'
import '../../../App.css';
import {useFormik} from 'formik'
import  * as yup from "yup";
import axios from 'axios';
import Swal from 'sweetalert2'

const passeRegex = RegExp(
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
);

const nameRegex = RegExp(
  /^[a-zA-Z ]+$/
);

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
  .oneOf([yup.ref('M_passe'), null], 'les mots de passe doivent correspondre')
  .required("champs obligatoire!"),
  });


const SignUp = () => {

  const formik = useFormik({
    initialValues: {
      Nom_prénom: "",
      email: "",
      M_passe: "",
      Confirm_M_passe: "",
      Ville: "",
     
      },
      validationSchema: validationSchema,
      validateOnBlur: true,
      onSubmit: values => {
        console.log(values);
        axios({
          url: 'http://localhost:4000/api/user/signup_etud/add',
          method: 'post',
          data: values,
        })
        .then((res)=>{
          formik.resetForm()
          Swal.fire({
            icon:'success',
            title: "Bien ajouté",
            html : '<span style="color:#FFFFFF">Merci de consulter votre email pour activer le compte. </span>',
            showCloseButton: false,
            showConfirmButton: false,
            background: "black",
            timer: 3500,
          })        
        })

       .catch((err)=>{
        Swal.fire({
          icon:'warning',
          html : '<span style="color:#FFF6C5">   EMAIL  existe  </span>',
          showCloseButton: false,
          showConfirmButton: false,
          background: "black",
          timer: 3500,

        })
       })    }
});
  
  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <br/>
        <h1>Créer un compte</h1>
        <br/>
        <br/>
        <form onSubmit={formik.handleSubmit} autoComplete="off" >
            <div className="Nom_prénom">
              <label htmlFor="Nom_prénom">Nom et prénom <span className="oblig">*</span></label>
              <input 
                placeholder="Nom et prénom"
                type="text"
                name="Nom_prénom"
                value={formik.values.Nom_prénom}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            <span className="errorMessage">
              {formik.touched.Nom_prénom && formik.errors.Nom_prénom? formik.errors.Nom_prénom : ""}
            </span>
            </div>

            <div className="email">
              <label htmlFor="email">Email <span className="oblig">*</span></label>
              <input
                placeholder="Email"
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            <span className="errorMessage">
              {formik.touched.email && formik.errors.email ? formik.errors.email: ""}
            </span>
            </div>

            <div className="M_passe">
              <label htmlFor="M_passe">Mot de passe <span className="oblig">*</span></label>
              <input
                placeholder="Mot de passe"
                type="password"
                name="M_passe"
                value={formik.values.M_passe}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            <span className="errorMessage">
              {formik.touched.M_passe && formik.errors.M_passe ? formik.errors.M_passe: ""}
            </span>
            </div>    

            <div className="Confirm_M_passe">
              <label htmlFor="Confirm_M_passe">Confirme mot de passe <span className="oblig">*</span></label>
              <input
                placeholder="Confirme mot de passe"
                type="password"
                name="Confirm_M_passe"
                value={formik.values.Confirm_M_passe}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            <span className="errorMessage">
              {formik.touched.Confirm_M_passe && formik.errors.Confirm_M_passe ? formik.errors.Confirm_M_passe: ""}
            </span>
           </div>

            <div className="createAccount">
              <button type="submit" disabled={!formik.isValid}>Créer le compte</button>
              <small>Vous avez déjà un compte?  <a href="/connexion">Se connecter</a></small>
            </div>   
          </form>
      </div>
    </div>
  )
}

export default SignUp