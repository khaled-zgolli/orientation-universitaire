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
  left: '86%',
  top: '3%',
  backgroundColor: '',
  color: 'gray',
},
}))
  
export default function PopupeditconsFav({ openPopupeditconsFav, setOpenPopupeditconsFav , data }) {

  const validationSchema = yup.object().shape({

  favoris: yup
  .string()
  .required("champs obligatoire!"),
});
  const classes = useStyles();

      const formik = useFormik({
        
        initialValues: {
          
          favoris: data.favoris,

          },

          validationSchema: validationSchema,
          validateOnBlur: true,
          validateOnChange: true,
          enableReinitialize: true,  // Contrôlez si Formik doit réinitialiser le formulaire en cas de initialValueschangement

          onSubmit: values => {
            console.log(values);
            if ( values.favoris === data.favoris 
                 ) {

                    setOpenPopupeditconsFav(false); 
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
              url: 'http://localhost:4000/api/data/updateConsFavoris',
              method: 'put',
              data: {
                _id : data._id,
                favoris :values.favoris
              },
            })

            .then((res)=>{
                setOpenPopupeditconsFav(false)
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
            setOpenPopupeditconsFav(false)
            Swal.fire({
                icon:'warning',
                html : '<span style="color:#FFF6C5">  </span>',
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
      <Dialog open={openPopupeditconsFav} maxWidth="lg">
        <DialogContent>
        <IconButton
            className={classes.customizedButton}
            onClick={() => {
              setOpenPopupeditconsFav(false); 
            }}
          >
          <CloseIcon />
          </IconButton>
          

          <form onSubmit={formik.handleSubmit}>
            <div >
              <label htmlFor="favoris">favoris</label>
              <select
                placeholder="favoris"
                type="text"
                name="favoris"
                value={formik.values.favoris}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
            <option value="A">Affiché</option>
            <option value="NA">Non affiché</option>

              </select>
              <span className="errorMessage">
                {formik.touched.favoris && formik.errors.favoris
                  ? formik.errors.favoris
                  : ""}
              </span>

            </div>



            <div className="createAccount">
              <button type="submit"  disabled={!formik.isValid}>
                Modifier le comptez
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  
}
