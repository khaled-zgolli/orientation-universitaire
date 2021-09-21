import React, { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, makeStyles, Button } from "@material-ui/core";
import { useFormik } from "formik";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import * as yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";

const useStyles = makeStyles(theme => ({
  image: {
    width: "860px",
    height: "300px",
  },

  customizedButton: {
    position: "absolute",
    left: "93%",
    top: "3%",
    backgroundColor: "",
    color: "gray",
  },
}));

const validationSchema = yup.object().shape({
  Reponse: yup.string().required("champs obligatoire!"),
});

export default function Popupeditedit(props) {
  const { openPopupedit, setOpenPopupedit, data } = props;

  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      Reponse: data.Reponse,
    },
    validationSchema: validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    enableReinitialize: true,

    onSubmit: values => {
      if (
        values.Reponse === data.Reponse
      ) {
        setOpenPopupedit(false);
        Swal.fire({
          icon: "warning",
          title: "Pas de modifications",
          html: '<span style="color:#FFFFFF">  </span>',
          showCloseButton: false,
          showConfirmButton: false,
          background: "black",
          timer: 3500,
        });
      } else {
        axios({
          url: 'http://localhost:4000/api/data/updateQuestions',
          method: 'put',
          data: {
            _id:data._id,
            Reponse : values.Reponse,

          },
        })

        .then((res)=>{
          setOpenPopupedit(false)
           Swal.fire({
            icon: "success",
            title: "Modifié avec succès",
            html: '<span style="color:#FFFFFF">Les champs sont bien modifiés. </span>',
            showCloseButton: false,
            showConfirmButton: false,
            background: "black",
            timer: 2000,
        })     
        setTimeout(() => {
          window.location.reload();
        }, 1000);         
       })

       .catch((err)=> {
        setOpenPopupedit (false)
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
    <Dialog open={openPopupedit} maxWidth="md">
      <DialogContent>
        <IconButton
          className={classes.customizedButton}
          onClick={() => {
            console.log(setOpenPopupedit(false));
          }}
        >
          <CloseIcon />
        </IconButton>
        <h1>Répondre</h1>
        <br />
        <br />
        <form onSubmit={formik.handleSubmit}>
    

          <div className="filières">
            <label htmlFor="Reponse">Réponse </label>
            <textarea
              name="Reponse"
              style={{ width: "600px" , height: "200px"}}
              value={formik.values.Reponse}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            
            <span className="errorMessage">
              {formik.touched.Reponse && formik.errors.Reponse
                ? formik.errors.Reponse
                : ""}
            </span>
          </div>

          <div className="createAccount">
            <button type="submit" disabled={!formik.isValid}>
              Répondre
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
