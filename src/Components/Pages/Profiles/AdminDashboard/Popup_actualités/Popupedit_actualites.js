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
  Titre: yup.string().required("champs obligatoire!"),

  Source: yup.string().required("champs obligatoire!"),

  Description: yup.string().required("champs obligatoire!"),
});

export default function Popupeditedit_actualites(props) {
  const { openPopupedit, setOpenPopupedit, data } = props;

  const classes = useStyles();

  //***************************IMAGE*******************************//
  const [image, setImage] = useState();
  const fileInputRef = useRef();
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(image);
    }
  }, [image, data.Image]);

  const formik = useFormik({
    initialValues: {
      _id: data._id,
      Titre: data.Titre,
      Source: data.Source,
      img: data.img,
      Description: data.Description,
    },
    validationSchema: validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    enableReinitialize: true,

    onSubmit: values => {
      if (
        preview === undefined &&
        values.Source === data.Source &&
        values.Titre === data.Titre &&
        values.Description === data.Description
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
   
        if(preview){
          axios({
            url: 'http://localhost:4000/api/data/updateActualites',
            method: 'put',
            data: {
              _id:data._id,
              Source : values.Source,
              Titre : values.Titre,
              img : preview,
              Description : values.Description,

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
              html : '<span style="color:#FFF6C5"> Erreur produit </span>',
              showCloseButton: false,
              showConfirmButton: false,
              background: "black",
              timer: 3500,
            });
          });
      }
      else{
        axios({
          url: 'http://localhost:4000/api/data/updateActualites',
          method: 'put',
          data: {
            _id:data._id,
            Titre : values.Titre,
            Source : values.Source,
            img : data.img,
            Description : values.Description,

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
            html : '<span style="color:#FFF6C5"> EMAIL  existe </span>',
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
        <h1>Modifier un actualité</h1>
        <br />
        <br />
        <form onSubmit={formik.handleSubmit}>
          <div>
            <img
              src={preview ? preview : data.img}
              alt=""
              className={classes.image}
              onClick={() => {
                setImage(null);
              }}
            />
            <br /> <br />
            <input
              name="Image"
              type="file"
              style={{ display: "none" }}
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
            <center>
              <Button
                variant="contained"
                color="primary"
                className={classes}
                onClick={e => {
                  e.preventDefault();
                  fileInputRef.current.click();
                }}
              >
                Selectionner une image
              </Button>
            </center>
            <br />
          </div>

          <div className="filières">
            <label htmlFor="Titre">Titre</label>
            <input
              placeholder="Titre"
              type="text"
              name="Titre"
              value={formik.values.Titre}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className="errorMessage">
              {formik.touched.Titre && formik.errors.Titre
                ? formik.errors.Titre
                : ""}
            </span>
          </div>
          <br />
          <br />
          <div className="filières">
            <label htmlFor="Source">Source </label>
            <input
              placeholder="Source"
              type="text"
              name="Source"
              value={formik.values.Source}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className="errorMessage">
              {formik.touched.Source && formik.errors.Source
                ? formik.errors.Source
                : ""}
            </span>
          </div>

          <div className="filières">
            <label htmlFor="Description">Description </label>
            <textarea
              name="Description"
              style={{ height: "200px" }}
              value={formik.values.Description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            
            <span className="errorMessage">
              {formik.touched.Description && formik.errors.Description
                ? formik.errors.Description
                : ""}
            </span>
          </div>

          <div className="createAccount">
            <button type="submit" disabled={!formik.isValid}>
              Modifier l'actualité
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
