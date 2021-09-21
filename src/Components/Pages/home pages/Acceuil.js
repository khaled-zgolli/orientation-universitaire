import React, { useEffect, useRef, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import img from "./Conseiller-clientele.png";
import img4 from "./logo.png";
import { Link } from "react-router-dom";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import { Grid, TextField, Paper } from "@material-ui/core";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import axios from "axios";
import usePagination from "./Pagination";
import Pagination from "@material-ui/lab/Pagination";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./slide.css";
import { HashLink } from 'react-router-hash-link';

const nmRegex = RegExp(/^[0-9]{8}$/);

const validationSchema = Yup.object().shape({
  nom: Yup.string().required("champs obligatoire"),
  Description: Yup.string().required("champs obligatoire"),
  numero: Yup.string()
    .matches(nmRegex, "Numero invalide")
    .required("champs obligatoire"),
  email: Yup.string().email("Email invalide").required("champs obligatoire!"),
});

const useStyles = makeStyles(theme => ({
  roottt: {
    marginTop: theme.spacing(2),
  },

  roott: {
    // width: 350,
    marginLeft: "2%",
    marginBottom: "20px",
  },
  media: {
    height: "150px",
  },
  root: {
    flexGrow: 1,
  },
  search: {
    marginRight: theme.spacing(10),
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#ffffff",
    color: "#000000",
    marginLeft: 50,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(15),
      width: "auto",
      marginBottom: theme.spacing(2),
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(3)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "35ch",
      // '&:focus': {
      //   width: '40ch',
      // },
    },
  },
  paper: {
    height: "fit-content",
    backgroundColor: "rgba(f,f, f,f)",
    marginTop: "3px",
  },
  typography: {
    marginLeft: "33%",
  },
  image: {
    height: "400px",
    width: "100%",
    marginRight: theme.spacing(0),
    marginLeft: theme.spacing(0),
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
  },
  paperact: {
    backgroundColor: "rgba(248, 250, 178, 0.59)",
    marginRight: theme.spacing(1.5),
    marginLeft: theme.spacing(1.5),
    paddingLeft: theme.spacing(9),
    paddingBottom: theme.spacing(5),
  },
  panier: {
    marginLeft: theme.spacing(52),
  },
  paperexp: {
    backgroundColor: "rgba(248, 250, 178, 0.59)",
    marginRight: theme.spacing(1.5),
    marginLeft: theme.spacing(1.5),
    paddingLeft: theme.spacing(15),
    paddingTop: theme.spacing(5),
    marginTop: theme.spacing(4),
    flexWrap: "wrap",
    paddingBottom: "50px",
  },
  cardexp: {
    maxWidth: 345,
    marginLeft: theme.spacing(1),
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botton: {
    position: "absolute",
    top: "440px",
    right: "620px",
  },
  imageC: {
    border: "7px solid #FFC92F",
    borderRadius: "100%",
    width: "200px",
    height: "200px",
    marginLeft: theme.spacing(13),
  },
  conseiller: {
    paddingLeft: theme.spacing(0),
  },
  paperform: {
    marginRight: theme.spacing(35),
    marginLeft: theme.spacing(35),
    backgroundColor: "#FFC92F",
    marginBottom: theme.spacing(8),
    paddingRight: theme.spacing(15),
    paddingLeft: theme.spacing(15),
    paddingTop: theme.spacing(7),
    paddingBottom: theme.spacing(4),
  },
  logo: {
    paddingTop: theme.spacing(6),
    paddingLeft: theme.spacing(3),
  },
  service: {
    paddingTop: theme.spacing(6),
    paddingLeft: theme.spacing(3),
  },
  services: {
    paddingLeft: theme.spacing(6),
  },
  servicess: {
    paddingTop: theme.spacing(10),
  },
  fixed_button:{
    position: "fixed",
    bottom:" 10px",
    // width: "70px",
    // height: "20px",/*height: auto;*/
    marginLeft:"1280px",
    // border:" 0px solid #d6d6d6",
}
}));

function Acceuil() {
  const [data, setData] = useState([
    {
      Titre: "",
      img: "",
      Description: "",
      Source: "",
    },
  ]);
  useEffect(() => {
    const getData = async () => {
      await axios
        .get("http://localhost:4000/api/data/getActualites")
        .then(response => {
          const data = response.data;
          setData(data.reverse());
        })
        .catch(err => {
          console.log(err);
        });
    };

    getData();
  }, []); //UNE SEUL FOIS

  //************************ article */
  const [dataArticle , setDataArticle]=useState([{
    Image :"",
    Description :"",
    Sujet :"",
    AuteurEtud :{
      img :"",
      Nom_prénom:""
    }
    
  }])

  useEffect(() => {
    const getDataArticle = async () => {
      await axios
        .get("http://localhost:4000/api/data/getArticlesEtudAll")
        .then(response => {
          const data = response.data;

          const articleDataAffichage = data.filter((e) => {
            return e.affichage === "A";
          });
          setDataArticle(articleDataAffichage.reverse());
        })
        .catch(err => {
          console.log(err);
        });
    };

    getDataArticle();
  }, []); //UNE SEUL FOIS


  const [datascons, setconsData] = useState([]);

  useEffect(() => {
    const getconsData = async () => {
      await axios
        .get("http://localhost:4000/api/data/conseiller")
        .then(response => {
          const data = response.data;
          const dataCons = data.filter((e) => {
            return e.favoris === "A";
          });
         
          setconsData(dataCons); 
      
        })
        .catch(err => {
          console.log(err);
        });
    };

    getconsData(); //exection 
  }, []); //UNE SEUL FOIS 


  
  

  //************************** Pagination  */

  let [page, setPage] = useState(1);
  const PER_PAGE = 3;

  const count = Math.ceil(data.length / PER_PAGE);
  const _DATA = usePagination(data, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const handleSubmit = values => {
    axios({
      url: "http://localhost:4000/api/data/addContactus",
      method: "post",
      data: {
        date: new Date().toLocaleDateString(),
        nom: values.nom,
        email: values.email,
        numero: values.numero,
        Description: values.Description,
      },
    })
      .then(res => {
        Swal.fire({
          icon: "success",
          title: "Bien ajouté",
          html: '<span style="color:#FFFFFF"> </span>',
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
        Swal.fire({
          icon: "warning",
          html: '<span style="color:#FFF6C5"> </span>',
          showCloseButton: false,
          showConfirmButton: false,
          background: "black",
          timer: 2000,
        });
      });
  };

  const classes = useStyles();

  const initialValues = {
    nom: "",
    Description: "",
    numero: "",
    email: "",
  };

  //*********************************** slide  */
  // function SampleNextArrow(props) {
  //   const { className, style, onClick } = props;

  //   return (
  //     <div
  //       className={className}
  //       style={{
  //         ...style,
  //         display: "block",
  //         color: "red",
  //       }}
  //       onClick={onClick}
  //     />
  //   );
  // }

  // function SamplePrevArrow(props) {
  //   const { className, style, onClick } = props;
  //   return (
  //     <div
  //       className={className}
  //       style={{ ...style, display: "block", backgroundColor: "green" }}
  //       onClick={onClick}
  //     />
  //   );
  // }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      <div className={classes.root} id="root">
        <AppBar
          position="static"
          style={{ height: "50px", backgroundColor: "#FFC92F" }}
        >
          <Toolbar>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Chercher..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <div>
              {user !== null && user.Role === "Etudiant" ?
            <HashLink to="Etud_profile#favoris" className={classes.panier}>
              {/* <a href="#favoris" > */}
              <IconButton style={{ marginBottom: "13px" }}>
                  <i style={{ color: "rgba(0, 0, 0, 0.80)" }} class="fas fa-heart"></i>
                </IconButton>
                {/* </a> */}
                </HashLink>
                   :<span className={classes.panier}></span>  }

                <Link to="/Agenda">
                <IconButton style={{ marginBottom: "13px" }}>
                <i style={{ color: "rgba(0, 0, 0, 0.80)" }} class="far fa-calendar-alt"></i>
                </IconButton>
              </Link>

              <Link to="/" className={classes.conference}>
                <IconButton style={{ marginBottom: "13px" }}>
                  <i style={{ color: "rgba(0, 0, 0, 0.80)" }} class="fas fa-play-circle"> Visio-Conférence</i>
                </IconButton>
              </Link>
            </div>
          </Toolbar>
        </AppBar>
      </div>
      <div>
        <div>
          <img className={classes.image} src={img} />
          <center>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              className={classes.botton}
            >
              Savoir plus
            </Button>
          </center>
        </div>
        <br />
        <br />
        {/* /*********************************************  */}
        <Paper elevation={12} className={classes.paperact}>
          <br />
          <Typography variant="h3" className={classes.typography}>
            <em>Dernières actualités</em>
          </Typography>
          <br /> <br />
          <Grid container>
            {_DATA.currentData().map(v => {
              return (
                <>
                  <Grid item lg={3} style={{ paddingBottom: "50px" }}>
                    <Card elevation={5} style={{ width: "350px" }}>
                      <CardActionArea>
                        <CardMedia
                          className={classes.media}
                          image={v.img}
                          title="annonce"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h6" component="h2">
                            {v.Titre}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            <em>Source:</em> {v.Source}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button size="small" color="secondary">
                        <Link
                        style={{ color:"#FFC92F"}}
                      
                                to={{
                                  pathname: `/Actulites/${v._id}`,
                                  data: { data: v._id},
                                }}
                              >
                             Voir plus
                              </Link>
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                  <Grid item lg={1}>
                    <div></div>
                  </Grid>
                </>
              );
            })}
          </Grid>
          <div style={{ marginLeft: "39%" }}>
            <Pagination
              count={count}
              color="secondary"
              size="large"
              page={page}
              // variant="contained"
              // shape="rounded"
              onChange={handleChange}
            />
          </div>
        </Paper>
        {/* /**************************************** */}
        <br /> <br />
        <Typography variant="h3" className={classes.typography}>
          <em>Découvrez nos conseillers</em>
        </Typography>
        <br />
        <Typography
          variant="h4"
          style={{ color: "#FFC92F", marginLeft: "550px" }}
        >
          <em> Conseillers du mois</em>
        </Typography>
        <br />
        <br />
        <br />
        <Grid container className={classes.conseiller}>
          {datascons.map((cons , index)=>{
            return (
              <Grid item lg={4} key={index}>
              <img className={classes.imageC} src={cons.img} />
              <br />
              <Typography
                variant="h6"
                style={{ color: "#FFC92F", marginLeft: "150px" }}
              >
                <em>{cons.Nom_prénom}</em>
              </Typography>
              <Typography variant="h6" style={{ marginLeft: "110px" }}>
              {cons.specialite}
              </Typography>
            </Grid>
            );
          })}
         

        
        </Grid>
        <br /> <br /> <br />
        <center>
        <Link to="/ListeCons">

          <Button variant="contained" color="primary">
            Accéder à la liste de conseiller
          </Button>
          </Link>

        </center>
      </div>
      {/* /******************************* */}
      <Paper elevation={12} className={classes.paperexp}>
        <Typography variant="h3" style={{marginLeft: "25%"}}>
          <em>Partagez vos expériences</em>
        </Typography>
        <br /> <br />
        <div style={{ width: "90%" }}>
          <Slider {...settings}>

            {dataArticle.map((article , index)=>{

              return <div key={index} >
                 <Card className={classes.cardexp}>
                <CardHeader
                  avatar={
                    <Avatar  className={classes.avatar}   src={article.AuteurEtud.img} />
                  }
                  title={article.AuteurEtud.Nom_prénom}
                  subheader={
                    article.createdAt
                      ? `${article.createdAt.substring(
                          8,
                          10
                        )}/${article.createdAt.substring(
                          5,
                          7
                        )}/${article.createdAt.substring(0, 4)} `
                      : ""
                  }
                />
                <CardMedia
                  className={classes.media}
                  image={article.Image}
                
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    color="textSecondary"
                    component="p"
                  >
                   {article.Sujet}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <Button size="small" color="secondary">
                  <Link
                        style={{ color:"#FFC92F"}}
                      
                                to={{
                                  pathname: `/Articles_exp/${article._id}`,
                                  data: { data: article._id},
                                }}
                              >
                             Voir plus
                              </Link>
                  </Button>
                </CardActions>
              </Card>
              </div>
            })}
          </Slider>
        </div>
      </Paper>
      <br />
      {/* /********************************************/}
      <br />
      <Typography variant="h3" style={{ marginLeft: "570px" }}>
        <em>Contact us</em>
      </Typography>
      <br /> <br />
      <Paper elevation={15} className={classes.paperform}>
        <Formik
          enableReinitialize={true}
          validateOnBlur={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values }) => (
            <Form noValidate autoComplete="off">
              <center>
                <Field
                  style={{ width: "600px" }}
                  fullWidth
                  as={TextField}
                  name="nom"
                  variant="outlined"
                  className={classes.textField}
                  label="Nom complet"
                  size="small"
                  helperText={<ErrorMessage name="nom" />}
                  error={errors.nom && touched.nom}
                />
                <br /> <br />
                <Field
                  style={{ width: "600px" }}
                  fullWidth
                  as={TextField}
                  name="email"
                  variant="outlined"
                  className={classes.textField}
                  label="Email"
                  size="small"
                  helperText={<ErrorMessage name="email" />}
                  error={errors.email && touched.email}
                />
                <br />
                <br />
                <Field
                  fullWidth
                  style={{ width: "600px" }}
                  as={TextField}
                  name="numero"
                  variant="outlined"
                  className={classes.textField}
                  label="numero"
                  size="small"
                  helperText={<ErrorMessage name="numero" />}
                  error={errors.numero && touched.numero}
                />
                <br />
                <br />
                <Field
                  multiline
                  rows="5"
                  style={{ width: "600px" }}
                  as={TextField}
                  name="Description"
                  variant="outlined"
                  className={classes.textField}
                  label="Description"
                  size="small"
                  helperText={<ErrorMessage name="Description" />}
                  error={errors.Description && touched.Description}
                />
                <br />
                <br />
                <div>
                  <Button
                    className={classes.soumettre}
                    variant="contained"
                    color="primary"
                    type="submit"
                    size="large"
                  >
                    Envoyer
                  </Button>
                </div>
              </center>
            </Form>
          )}
        </Formik>
      </Paper>
      <Paper style={{ backgroundColor: "#000000", paddingBottom: "20px" }}>
        <Grid container>
          <Grid item lg={3} className={classes.logo}>
            <img src={img4} />
            <br />
            <br />
            <Typography variant="p" style={{ color: "#FFC92F" }}>
              <em> Sercives-conseils en orientation </em>
            </Typography>
            <br />
            <Typography variant="p" style={{ color: "#FFC92F" }}>
              <em> universitaire en Tunisie</em>
            </Typography>
          </Grid>

          <Grid item lg={3}>
            <Typography
              variant="h5"
              className={classes.service}
              style={{ color: "#FFC92F" }}
            >
              <em> Notre services:</em>
            </Typography>
            <br />
            <ul className={classes.services}>
              <li>
                <span style={{ color: "#FFC92F" }}>+</span> &nbsp;
                <a style={{ color: "white" }} href="#">
                  Acceuil
                </a>
              </li>
              <li>
                <span style={{ color: "#FFC92F" }}>+</span> &nbsp;
                <a style={{ color: "white" }} href="/universite">
                  Université
                </a>
              </li>
              <li>
                <span style={{ color: "#FFC92F" }}>+</span> &nbsp;
                <a style={{ color: "white" }} href="/diplome">
                  Diplôme
                </a>
              </li>
              <li>
                <span style={{ color: "#FFC92F" }}>+</span> &nbsp;
                <a style={{ color: "white" }} href="/domaine">
                  Domaine
                </a>
              </li>
              <li>
                <span style={{ color: "#FFC92F" }}>+</span> &nbsp;
                <a style={{ color: "white" }} href="/sign_up">
                  S'inscrire Etudiant
                </a>
              </li>
              <li>
                <span style={{ color: "#FFC92F" }}>+</span> &nbsp;
                <a style={{ color: "white" }} href="/sign_up_cons">
                  S'inscrire Conseiller
                </a>
              </li>
            </ul>
          </Grid>

          <Grid item lg={3}>
            <ul className={classes.servicess}>
              <li>
                <span style={{ color: "#FFC92F" }}>+</span> &nbsp;
                <a style={{ color: "white" }} href="#">
                  Dernières actualités
                </a>
              </li>
              <li>
                <span style={{ color: "#FFC92F" }}>+</span> &nbsp;
                <a style={{ color: "white" }} href="/">
                  Découvrez nos conseillers
                </a>
              </li>
              <li>
                <span style={{ color: "#FFC92F" }}>+</span> &nbsp;
                <a style={{ color: "white" }} href="/">
                  Partagez vos expériences
                </a>
              </li>
              <li>
                <span style={{ color: "#FFC92F" }}>+</span> &nbsp;
                <a style={{ color: "white" }} href="/">
                  Savoir plus
                </a>
              </li>
              <li>
                <span style={{ color: "#FFC92F" }}>+</span> &nbsp;
                <a style={{ color: "white" }} href="/">
                  Contact us
                </a>
              </li>
            </ul>
            <br />
            &nbsp; &nbsp; &nbsp;{" "}
            <Link to="/connexion">
              <Button variant="contained" color="secondary" size="small">
                Se connecter
              </Button>
            </Link>
          </Grid>
          <Grid item lg={3}>
            <Typography
              variant="h5"
              className={classes.service}
              style={{ color: "#FFC92F" }}
            >
              <em> Social media </em>
            </Typography>
            <br />
            <p>
              {" "}
              <i style={{ color: "#FFC92F" }} class="fas fa-envelope"></i>{" "}
              <span style={{ color: "white" }}> eldalilpfe2021@gmail.com </span>
            </p>
            <p>
              {" "}
              <i style={{ color: "#FFC92F" }} class="fab fa-linkedin">
                {" "}
              </i>{" "}
              <span style={{ color: "white" }}> eldalil_pfe21 </span>
            </p>
            <p>
              {" "}
              <i
                style={{ color: "#FFC92F" }}
                class="fab fa-facebook-square"
              ></i>{" "}
              <span style={{ color: "white" }}> eldalil_pfe21 </span>
            </p>
            <p>
              {" "}
              <i
                style={{ color: "#FFC92F" }}
                class="fab fa-instagram-square"
              ></i>{" "}
              <span style={{ color: "white" }}> eldalil_pfe21 </span>
            </p>
          </Grid>
        </Grid>{" "}
      </Paper>
      {/* <div className=""> */}

      <a href="#root">
                <IconButton style={{ backgroundColor: "#FFC92F" }} className={classes.fixed_button}>
                <i class="fas fa-arrow-circle-up"></i>  
                 </IconButton>
              </a>
      {/* </div> */}
     

    </>
  );
}

export default Acceuil;
