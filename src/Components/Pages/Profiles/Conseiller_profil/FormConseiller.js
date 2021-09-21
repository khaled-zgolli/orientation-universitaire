
import { makeStyles, Paper } from '@material-ui/core';
import { Box, Button, Container, Divider, TextField, Typography } from '@material-ui/core';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import * as Yup from "yup";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { CheckboxWithLabel } from "formik-material-ui";

const nmRegex = RegExp(
  /^[0-9]{8}$/
);

const validationSchema = Yup.object().shape({
  Nom_prénom: Yup.string().required("champs obligatoire"),
  specialite: Yup.string().required("champs obligatoire"),
  description:Yup.string().required("champs obligatoire"),
  numero: Yup.string().matches(nmRegex, "Numero invalide"),
  LinkedIn: Yup.string(),


  });


const useStyles = makeStyles(theme => ({
    paper: {
      width: "98%",
      height: "fit-content",
      backgroundColor: "rgba(248, 250, 178, 0.59)",
      marginLeft: "1%",
      marginTop: "1%",
    },
    typography: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(2),
      paddingLeft: theme.spacing(6),
    },
    botton: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(2),
      paddingRight: theme.spacing(6),
    },
    image: {
      borderRadius: "100%",
      width: "150px",
      height: "150px",
      marginTop: "20px",
    },
    photo: {
      paddingLeft: theme.spacing(70),
    },
    textField: {
      width: "50%",
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  
    bachelier: {
      width: "90%",
    },
    section: {
      width: "20%",
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    acceptbox: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    soumettre: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      marginLeft: theme.spacing(70),
    },
  }));

  
  

export default function FormConseiller() {

    const classes =useStyles();
    const [image, setImage] = useState();
    const [preview, setPreview] = useState("");
    const fileInputRef = useRef();
    const [consData , setConsData] = useState({
      img: "",
      Nom_prénom:"",
      description:"",
      specialite:"",
      numero:"",
      LinkedIn:""
    })

    const cons = JSON.parse(localStorage.getItem("user"));

    const handleSubmit = props => {
      axios({
        url: "http://localhost:4000/api/user/updateProfilConseiller",
        method: "put",
        data: {
        _id: cons._id,
        img: preview,
        Nom_prénom: props.Nom_prénom,
        description:props.description,
        specialite:props.specialite,
        LinkedIn: props.LinkedIn,
        numero: props.numero,
        }        
      })
      .then((res)=>{
        Swal.fire({
          icon:'success',
          title: "Modifié avec succès",
          html : '<span style="color:#FFFFFF"> Les champs sont bien modifiés. </span>',
          showCloseButton: false,
          showConfirmButton: false,
          background: "black",
          timer: 2000,
        });       
        setTimeout(() => {
          window.location.href = "/Cons_profile"
        }, 500); 
            })
  
      .catch(err => {
        Swal.fire({
          icon: "warning",
          html: '<span style="color:#FFF6C5">   EMAIL  existe </span>',
          showCloseButton: false,
          showConfirmButton: false,
          background: "black",
          timer: 2000,
        });
      });
    }

    useEffect(() => {
      if (image) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(image);
      } else {
        setPreview(consData.img);
      }
    }, [image, consData.img]);
  

    useEffect(() => {
      const getConsData = async () => {
        await axios({
          url: "http://localhost:4000/api/user/getProfilConseiller",
          method: "post",
          data: { _id: cons._id },
        }).then(res => {
          setConsData(res.data);
        });
      };
  
      getConsData();
    }, [cons._id]); //UNE SEUL FOIS
    
    
    
  const initialValues = {
    img: consData.img,
    Nom_prénom: consData.Nom_prénom,
    description: consData.description,
    specialite: consData.specialite,
    LinkedIn: consData.LinkedIn,
    numero: consData.numero,
    accept: true,


  };
  return (
    <Paper elevation={6} className={classes.paper}>
    <Box display="flex">
      <Box flexGrow={1}>
        <Typography className={classes.typography} variant="h4">
          <strong>Modifier mon profil</strong>
        </Typography>
      </Box>

      <Box className={classes.botton}>
        <Link to="/Cons_profile">
          <Button variant="contained" color="secondary" size="large">
            Accéder à votre profil
          </Button>
        </Link>
      </Box>
    </Box>

    <br />
    <Divider />
    <br />
    <center>
      <em>
        Il est nécessaire que vous nous donniez
         des informations pour compléter votre espace personnel dans le site.
      </em>
    </center>
    <br />
    <br />
    <Formik
      enableReinitialize={true}
      validateOnBlur={true}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, values }) => (
        <Form noValidate autoComplete="off">
          <div className={classes.photo}>
            <img
              src={preview ? preview : consData.img}
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
          </div>

          <Container style={{ marginTop: "20px" }}>
            <Divider style={{ marginBottom: "20px" }} />
            <center>
              <Field
                fullWidth
                as={TextField}
                name="Nom_prénom"
                variant="outlined"
                className={classes.textField}
                label="Nom complet"
                size="small"
                helperText={<ErrorMessage name="Nom_prénom" />}
                error={errors.Nom_prénom && touched.Nom_prénom}
              />
              <br />
              <Field
                fullWidth
                as={TextField}
                name="specialite"
                variant="outlined"
                className={classes.textField}
                label="Spécialité"
                size="small"
                helperText={<ErrorMessage name="specialite" />}
                error={errors.specialite && touched.specialite}
              />
         
            <br />
            <Field
                multiline
                rows= "5"
                as={TextField}
                name="description"
                variant="outlined"
                className={classes.textField}
                label="description"
                size="small"
                helperText={<ErrorMessage name="description" />}
                error={errors.description && touched.description}
              />
              <br />
              <br />

            <Divider style={{ marginTop: "20px" }} />
              <br />
              <em>  NB: Ces champs seront affichés en tant que contact ainsi que votre email</em>
              <br />
              <Field
                fullWidth
                as={TextField}
                name="LinkedIn"
                variant="outlined"
                className={classes.textField}
                label="LinkedIn"
                size="small"
                helperText={<ErrorMessage name="LinkedIn" />}
                error={errors.LinkedIn && touched.LinkedIn}
              />              
              {/* <Field
                fullWidth
                as={TextField}
                name="numero"
                variant="outlined"
                className={classes.textField}
                label="Numero"
                size="small"
                helperText={<ErrorMessage name="numero" />}
                error={errors.numero && touched.numero}
              /> */}


              <br />
              <Field
                fullWidth
                as={TextField}
                name="numero"
                variant="outlined"
                className={classes.textField}
                label="Numero"
                size="small"
                helperText={<ErrorMessage name="numero" />}
                error={errors.numero && touched.numero}
              />

              <div>
              <Field
                className={classes.acceptbox}
                name="accept"
                Label={{
                  label: (
                    <em>
                      J'accepte de recevoir des informations personnalisées et
                      les conditions de ELDALIL
                    </em>
                  ),
                }}
                type="checkbox"
                component={CheckboxWithLabel}
                checked
              />
            </div>
            <br />

              </center>
          </Container>

          
          <br />
          <div>
            <Button
              className={classes.soumettre}
              variant="contained"
              color="secondary"
              type="submit"
              size="large"
            >
              Se soumettre
            </Button>
          </div>
        </Form>
        
      )}
    </Formik>
    
  </Paper>
  )
};