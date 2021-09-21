import React, { useEffect, useRef, useState } from "react";
import { Button, Dialog, DialogContent, makeStyles} from "@material-ui/core";
import { useFormik } from "formik";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import * as yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";


const useStyles = makeStyles(theme => ({

    customizedButton: {
        position: 'absolute',
        left: '95%',
        top: '3%',
        backgroundColor: '',
        color: 'gray',
      },
      image: {
        borderRadius: "100%",
        width: "150px",
        height: "150px",
        marginTop: "20px",
      },
      photo: {
        paddingLeft: theme.spacing(65),
        paddingBottom : theme.spacing(2),
      },
    }))
      
      const nameRegex = RegExp(
        /^[a-zA-Z ]+$/
      );

      const passeRegex = RegExp(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
      );

      const nmRegex = RegExp(
        /^[0-9]{8}$/
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
      
        // M_passe: yup
        //   .string()
        //   .matches(passeRegex, "Entrer des caractéres alpha-numérique")
        //   .required("champs obligatoire!"),
      
        // Confirm_M_passe: yup
        //   .string()
        //   .oneOf([yup.ref('M_passe'), null], 'les mots de passe doivent correspondre')
        //   .required("champs obligatoire!"),
      
          // specialite: yup
          // .string()
          // .required("champs obligatoire!"),

          // description: yup
          // .string()
          // .required("champs obligatoire!"),

          // numero: yup
          // .string()
          // .matches(nmRegex, "Numero invalide"),

          // LinkedIn: yup.string()
        
       

      });

  
export default function Popupeditcons({ openPopupeditcons, setOpenPopupeditcons , data }) {

    const classes = useStyles();

    const [image, setImage] = useState();
    const [preview, setPreview] = useState("");
    const fileInputRef = useRef();

    useEffect(() => {
      if (image) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(image);
      } else {
        setPreview(data.img);
      }
    }, [image, data.img]);
  
  


      const formik = useFormik({
        
        initialValues: {
          _id:data._id,
          Nom_prénom: data.Nom_prénom,
          email: data.email,
          // M_passe: data.M_passe,
          // Confirm_M_passe: data.M_passe,
          status: data.status,
          img: preview,
          specialite: data.specialite,
          description: data.description,
          LinkedIn: data.LinkedIn,
          numero: data.numero

          },

          validationSchema: validationSchema,
          validateOnBlur: true,
          validateOnChange: true,
          enableReinitialize: true,  // Contrôlez si Formik doit réinitialiser le formulaire en cas de initialValueschangement

          onSubmit: values => {
            if ( values.email === data.email &&
                 values.Nom_prénom === data.Nom_prénom &&
                 values.M_passe === data.M_passe &&
                 values.status === data.status &&
                 values.specialite === data.specialite &&
                 values.description === data.description &&
                 values.img === data.img && 
                 values.LinkedIn === data.LinkedIn &&
                 values.numero === data.numero
                 ) {

              setOpenPopupeditcons(false); 
              Swal.fire({
                icon: "warning",
                title: "Pas de modifications",
                html: '<span style="color:#FFFFFF">  </span>',
                showCloseButton: false,
                showConfirmButton: false,
                background: "black",
                timer: 3500,
              });
            }  
            else{
            axios({
              url: 'http://localhost:4000/api/data/updateCons',
              method: 'put',
              data: values,
            })

            .then((res)=>{
                setOpenPopupeditcons(false)
                 Swal.fire({
                  icon: "success",
                  title: "Modifié avec succès",
                  html: '<span style="color:#FFFFFF">Les champs sont bien modifiés. </span>',
                  showCloseButton: false,
                  showConfirmButton: false,
                  background: "black",
                  timer: 1000,
              })   
              setTimeout(() => {
                window.location.reload();
               }, 1000); 
                 
             })
    
           .catch((err)=> {
            setOpenPopupeditcons(false)
            Swal.fire({
                icon:'warning',
                html : '<span style="color:#FFF6C5"> Erreur </span>',
                showCloseButton: false,
                showConfirmButton: false,
                background: "black",
                timer: 3500,
              });
            });
        }
       
        
      },
    });

    return (
      <Dialog open={openPopupeditcons} maxWidth="lg">
        <DialogContent>
          <IconButton
            className={classes.customizedButton}
            onClick={() => {
              setOpenPopupeditcons(false); 
            }}
          >
          <CloseIcon />
          </IconButton>
          <h1>Modifier un conseiller</h1>
          <br />
          <br />
          <form onSubmit={formik.handleSubmit}>
          <div className={classes.photo}>
              <img
                src={preview ? preview : data.img}
                alt=""
                className={classes.image}
                // onClick={() => {
                //   setImage(null);
                // }}
              />
              <input
                name="img"
                style={{ display: "none" }}
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={e => {
                  const file = e.target.files[0];
                  if (file && file.type.substr(0, 5) === "image") {
                    setImage(file);
                  } else {
                    setImage(null);
                  }
                }}
              />
              <br />
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={e => {
                  e.preventDefault();
                  fileInputRef.current.click();
                }}
              >
                Select Profile Picture
              </Button>
              <br />
            <br />
            </div>
           <br/>
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
  
            {/* <div className="M_passe">
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
            </div> */}

            <div className="Nom_prénom">
              <label htmlFor="STATUTS">status</label>
              <select
                placeholder="status"
                type="text"
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
            <option value="En attente">En attente</option>
            <option value="Active">Active</option>

              </select>
            </div>

            <div className="Confirm_M_passe">
              <label htmlFor="Spécialité">Spécialité</label>
              <input
                placeholder="Spécialité"
                type="text"
                name="specialite"
                value={formik.values.specialite}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span className="errorMessage">
                {formik.touched.specialite && formik.errors.specialite
                  ? formik.errors.specialite
                  : ""}
              </span>
            </div>

            <div className="Nom_prénom">
              <label htmlFor="LinkedIn">LinkedIn</label>
              <input
                placeholder="LinkedIn"
                type="text"
                name="LinkedIn"
                value={formik.values.LinkedIn}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
                <span className="errorMessage">
                {formik.touched.LinkedIn && formik.errors.LinkedIn
                  ? formik.errors.LinkedIn
                  : ""}
              </span>

            </div>

            <div className="Confirm_M_passe">
              <label htmlFor="Numéro">Numéro </label>
              <input
                placeholder="Numéro"
                type="text"
                name="numero"
                value={formik.values.numero}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
                <span className="errorMessage">
                {formik.touched.numero && formik.errors.numero
                  ? formik.errors.numero
                  : ""}
              </span>

            </div>


            <div className="filières">
                        <label htmlFor="description">Description </label>
                        <textarea
                        name="description"
                        style={{height: '200px'}}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        />
                    <span className="errorMessage">
                        {formik.touched.description && formik.errors.description ? formik.errors.description: ""}
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
