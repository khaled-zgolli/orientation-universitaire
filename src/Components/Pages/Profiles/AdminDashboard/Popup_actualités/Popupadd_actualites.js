import React, { useEffect, useRef, useState } from 'react'
import { Dialog,  DialogContent, makeStyles, Button } from '@material-ui/core';
import {useFormik} from 'formik'
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import  * as yup from "yup";
import axios from 'axios';
import Swal from 'sweetalert2';


const useStyles = makeStyles(theme => ({

    Image: {
        width: '860px',
        height: '300px',
      },

    customizedButton: {
        position: 'absolute',
        left: '93%',
        top: '3%',
        backgroundColor: '',
        color: 'gray',
      },
    }))
      
      const validationSchema = yup.object().shape({
        Titre: yup
          .string()
          .required("champs obligatoire!"),

        Source: yup
          .string()
          .required("champs obligatoire!"),   
        Description: yup
          .string()
          .required("champs obligatoire!"),       
    
      });

  
export default function Popupadd_actualites(props) {



    const { openPopup, setOpenPopup } = props;

  const defaultImage = "data:image/png;base64,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"
    
    const classes = useStyles();

      const formik = useFormik({
        initialValues: {
          Titre: "",
          Source: "",
          img: "",
          Description:""
          },
          validationSchema: validationSchema,
          validateOnBlur: true,
          
          onSubmit: values => {
            axios({
              url: 'http://localhost:4000/api/data/addactualites',
              method: 'post',
              data: {
                Titre : values.Titre,
                img: preview ? preview : defaultImage,
                Description : values.Description,
                Source:values.Source
              },
            })
            .then((res)=>{
                formik.resetForm()
                setOpenPopup(false)
                 Swal.fire({
                icon:'success',
                title: "Bien ajouté",
                html : '<span style="color:#FFFFFF"> </span>',
                showCloseButton: false,
                showConfirmButton: false,
                background: "black",
                timer: 2000,
              })                        
               setTimeout(() => {
                window.location.reload();
               }, 2000); 
            })
    
           .catch((err)=> {
            setOpenPopup(false)

            Swal.fire({
                icon:'warning',
                html : '<span style="color:#FFF6C5"> </span>',
                showCloseButton: false,
                showConfirmButton: false,
                background: "black",
                timer: 3500,
      
              })
      
           })
      
          }
    });


  const [Image, setImage] = useState();
  const fileInputRef = useRef();
  const [preview, setPreview] = useState();
 

  useEffect(() => {
    if (Image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result );
      };
      reader.readAsDataURL(Image);
    } else {
      setPreview(Image); 
    }
  }, [Image]);
        
    return (
        <Dialog open={openPopup} maxWidth="md" >
            <DialogContent >
                <IconButton className={classes.customizedButton}
                onClick={()=>{setOpenPopup(false)}}>
                    <CloseIcon />
                </IconButton>
                <h1>Ajouter une actualité</h1>
                <br/>
                <br/>
                <form onSubmit={formik.handleSubmit} >
                    <div>
                    <img
                        src={preview ? preview : defaultImage}
                        alt=""
                        className={classes.Image}
                        onClick={() => {
                        setImage(null);
                        }}
                    />
                    <br/> <br/>
                    <input
                        name="img"
                        type="file"
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={(e) => {
                        const file = e.target.files[0];
                        if (file && file.type.substr(0, 5) === 'image') {
                            setImage(file);
                        } 
                        else {
                            setImage(null);
                        }
                        }}
                    />
                    <center>
                    <Button 
                    variant="contained" 
                    color="primary" 
                    className={classes}
                    onClick={(e) => {
                        e.preventDefault();
                        fileInputRef.current.click();
                    }}
                    >
                    Selectionner une Image
                    </Button>
                    </center><br/>
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
                        {formik.touched.Titre && formik.errors.Titre? formik.errors.Titre : ""}
                    </span>
                    </div>
                     <br/>
                     <br/>
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
                        {formik.touched.Source && formik.errors.Source ? formik.errors.Source: ""}
                    </span>
                    </div>


                    <div className="filières">
                        <label htmlFor="Description">Description </label>
                        <textarea
                        name="Description"
                        style={{height: '200px'}}
                        value={formik.values.Description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        />
                    <span className="errorMessage">
                        {formik.touched.Description && formik.errors.Description ? formik.errors.Description: ""}
                    </span>
                    </div>

                    <div className="createAccount">
                      <button type="submit" disabled={!formik.isValid}>Créer l'actualité</button>
                   </div>
          </form>
         
            </DialogContent>
        </Dialog>
    )
}
