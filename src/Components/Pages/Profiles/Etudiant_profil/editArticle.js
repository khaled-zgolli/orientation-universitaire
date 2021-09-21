import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  makeStyles,
  Button,
  Divider,
  Container,
  TextField,
  Paper,
  Box,
  Typography,
} from "@material-ui/core";
import { ErrorMessage, Field, Form, Formik } from "formik";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import JoditEditor from "jodit-react";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  paper: {
    width: "98%",
    height: "fit-content",
    backgroundColor: "rgba(248, 250, 178, 0.59)",
    marginLeft: "1%",
    marginTop: "1%",
    paddingTop:"20px"
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
    borderRadius: "1%",
    width: "400px",
    height: "200px",
    marginTop: "20px",
  },
  photo: {
    paddingLeft: theme.spacing(55),
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

const validationSchema = Yup.object().shape({
  Sujet: Yup.string().required("champs obligatoire"),
  Description: Yup.string().required("champs obligatoire"),
});


export default function FormEditArticleEtud (props) {
  const {data}=props.location.data
  

  const classes = useStyles();

  //***************************IMAGE*******************************//
  const [image, setImage] = useState();
  const fileInputRef = useRef();
  const [preview, setPreview] = useState(data.Image);
  const initialValues = {
    img: data.Image,
    Description: data.Description,
    Sujet: data.Sujet,
  };
  console.log(data);

  const editor = useRef(null);

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

  const handleSubmit = props => {
    if (
      preview === undefined &&
      props.Sujet === data.Sujet &&
      props.Description === data.Description
    ) {
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
      if (preview) {
        axios({
          url: "http://localhost:4000/api/data/updateArticlesEtud",
          method: "put",
          data: {
            _id: data._id,
            Sujet: props.Sujet,
            Image: preview,
            Description: props.Description,
          },
        })
          .then(res => {
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
              window.location.href = "/Etud_profile";
            }, 1000);
          })

          .catch(err => {
            Swal.fire({
              icon: "warning",
              html: '<span style="color:#FFF6C5">  </span>',
              showCloseButton: false,
              showConfirmButton: false,
              background: "black",
              timer: 3500,
            });
          });
      } else {
        axios({
          url: "http://localhost:4000/api/data/updateArticlesEtud",
          method: "put",
          data: {
            _id: data._id,
            Sujet: props.Sujet,
            Image: data.Image,
            Description: props.Description,

          },
        })
          .then(res => {
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
              window.location.href = "/Etud_profile";
            }, 1000);
          })

          .catch(err => {
            Swal.fire({
              icon: "warning",
              html: '<span style="color:#FFF6C5"> EMAIL  existe </span>',
              showCloseButton: false,
              showConfirmButton: false,
              background: "black",
              timer: 3500,
            });
          });
      }
    }
  };


  return (
    <Paper elevation={6} className={classes.paper}>
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography className={classes.typography} variant="h4">
              <strong>Modifier un article</strong>
            </Typography>
          </Box>

          <Box className={classes.botton}>
            <Link to="/Etud_profile">
              <Button variant="contained" color="secondary" size="large">
                Accéder à votre profil
              </Button>
            </Link>
          </Box>
        </Box>

        <br />
        <Divider />

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
                    src={preview ? preview : data.Image}
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
                    style={{ marginLeft: "120px" }}
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

                <Container>
                  <center>
                    <Divider
                      style={{ marginTop: "30px", marginBottom: "30px" }}
                    />
                    <Field
                      as={TextField}
                      name="Sujet"
                      variant="outlined"
                      className={classes.textField}
                      label="Sujet"
                      size="small"
                      helperText={<ErrorMessage name="Sujet" />}
                      error={errors.Sujet && touched.Sujet}
                    />
                    <br />
                    {/* <Field
                    multiline={true}
                    rows={10}
                    as={TextField}
                    name="Description"
                    variant="outlined"
                    className={classes.textField}
                    label="Description"
                    size="small"
                    helperText={<ErrorMessage name="Description" />}
                    error={errors.Description && touched.Description}
                  /> */}
                 <Field name="Description">
                      {({ field, form }) => (
                        <div style={{ width: "50%" }}>
                          <JoditEditor
                            {...field}
                            ref={editor}
                            // value={content}

                            onChange={newContent => {
                              form.setFieldValue("Description", newContent);
                            }}
                          />
                          {form.errors.Description &&
                          form.touched.Description ? (
                            <div style={{ color: "red" }}>
                              {form.errors.Description}
                            </div>
                          ) : null}
                        </div>
                      )}
                    </Field>
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
                <br />
              </Form>
            )}
          </Formik> 
      
          
    </Paper>
  );
}
