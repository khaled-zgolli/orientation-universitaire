
import React from 'react';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Divider, Grid, IconButton, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import usePagination from "./home pages/Pagination";
import Pagination from "@material-ui/lab/Pagination";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';

const validationSchema = Yup.object().shape({
  Sujet: Yup.string().required("champs obligatoire"),
  Question: Yup.string().required("champs obligatoire"),
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
      image: {
        borderRadius: '100%',
        width: '180px',
        height: '180px',
        marginTop :"50px",
        border: "7px solid #FFC92F",

      },   
       edit:{
        right:"130%",
        bottom:"-22%", 
      },
      contain:{
        backgroundColor: "rgba(F, F, F, F)",

      },
      typographyParag:{
        paddingRight: theme.spacing(45),
        paddingLeft: theme.spacing(45),
       
      },
      media: {
        height: "150px",
      },
      paperform: {
        marginRight: theme.spacing(35),
        marginLeft: theme.spacing(35),
        marginTop: theme.spacing(8),
        backgroundColor: "#FFFFFF",
        marginBottom: theme.spacing(8),
        paddingRight: theme.spacing(15),
        paddingLeft: theme.spacing(10),
        paddingTop: theme.spacing(7),
        paddingBottom: theme.spacing(4),
      },
      

}))
export default function Espace_Conseiller(props) {
  const [isEtud, setisEtud] = useState(false);
  const [LoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(localStorage.getItem("Loggedin"));
    setisEtud(localStorage.getItem("isEtud"));
  }, []);


  const initialValues = {
    Sujet: "",
    Question: "",
  };
  const etud  = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = values => {
    axios({
      url: "http://localhost:4000/api/data/addQuestions",
      method: "post",
      data: {
         Etudiant : etud._id,
         Conseiller : props.match.params.id,
         Sujet : values.Sujet,
         Question : values.Question,
         Reponse : ""
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
    const [articles , setArticles]=useState([{
      Image:"",
      Description :"",
      Sujet :""

    }])

    const [Cons , setCons]=useState({
      img :""

    })

    
    useEffect(() => {
      const getEtab = async () => {
        await 
           axios({
          url: 'http://localhost:4000/api/data/getArticlesCons',
          method: 'post',
          data: {
            AuteurCons: props.match.params.id
          },
        }).then((res)=>{
          setArticles(res.data)
        })
      };
  
      getEtab();  
    }, []); //UNE SEUL FOIS 

    useEffect(() => {
      const getEtab = async () => {
        await 
           axios({
          url: 'http://localhost:4000/api/data/getConsOne',
          method: 'post',
          data: {
            _id: props.match.params.id
          },
        }).then((res)=>{
          setCons(res.data)
        })
      };
  
      getEtab();  
    }, [ props.match.params.id]); //UNE SEUL FOIS 


    // pagination
    let [page, setPage] = useState(1);
    const PER_PAGE = 3;
  
    const count = Math.ceil(articles.length / PER_PAGE);
    const _DATA = usePagination(articles, PER_PAGE);
  
    const handleChange = (e, p) => {
      setPage(p);
      _DATA.jump(p);
    };

    console.log(_DATA)

    

    console.log(props.match.params.id);

  

      console.log(Cons);
    
  return (
    <Paper elevation={6} className={classes.paper}>
   

   <center>
          <img src={Cons.img} alt="" className={classes.image} />
          <Typography
            variant="h5"
            color="primary"
            className={classes.typography}
          >
            <strong>{Cons.Nom_prénom} </strong>
            <br/>
            <em style={{color:"#FFC92F"}}>{Cons.specialite}</em>
          </Typography>
        </center>
        <center>
        <Typography
            variant="body1"
            color="primary"
            className={classes.typographyParag}
          > <em>
           {Cons.description}
            </em>
          </Typography>
          </center>

          <br/>

          <Divider style={{marginLeft:"200px" , marginRight:"200px" , marginBottom :"80px"}} />


        <Container>
        <Grid container>
            
            {_DATA.currentData().map(v => {
              return (
                <>
                  <Grid item lg={3} style={{ paddingBottom: "50px" }}>
                    <Card elevation={5} style={{ width: "350px" }}>
                      <CardActionArea>
                        <CardMedia
                          className={classes.media}
                          image={v.Image}
                          title="annonce"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h6" component="h2">
                            {v.Sujet}
                          </Typography>
                   
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button size="small" color="secondary">
                        <Link
                        style={{ color:"#FFC92F"}}
                      
                                to={{
                                  pathname: `/Articles_cons/${v._id}`,
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
        </Container>


          <div style={{ marginLeft: "530px" }}>
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


          { LoggedIn && isEtud ? 
          <Divider style={{marginLeft:"200px" , marginRight:"200px" , marginBottom :"80px" ,  marginTop:"50px"}} />
          :""
          }
      { LoggedIn && isEtud ? 


      <Paper elevation={15} className={classes.paperform}>
          <Typography variant="h5">
               <center>Contactez ce conseiller</center>           
           </Typography>
           <br/>
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
                  name="Sujet"
                  variant="outlined"
                  className={classes.textField}
                  label="Sujet"
                  size="small"
                  helperText={<ErrorMessage name="Sujet" />}
                  error={errors.Sujet && touched.Sujet}
                />
                <br /> <br />
               
                <Field
                  multiline
                  rows="5"
                  style={{ width: "600px" }}
                  as={TextField}
                  name="Question"
                  variant="outlined"
                  className={classes.textField}
                  label="Question"
                  size="small"
                  helperText={<ErrorMessage name="Question" />}
                  error={errors.Question && touched.Question}
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
      :<></>
      }

<br/> <br/>

  <Paper style={{backgroundColor: "#181818"  , color:"#FEFEFE", padding :"3%"}}>
    <Grid container>


      <Grid item lg={4} style={{marginBottom :"2%"}}>
        <p style ={{textAlign:"center"}}><i style={{color: "#FFC92F" }}class="fas fa-envelope"></i> {Cons.email} </p>
      </Grid>

      <Grid item lg={4}>
      <p style ={{textAlign:"center"}}> <i class="fab fa-linkedin"  style={{color: "#FFC92F" }}></i> {Cons.LinkedIn} </p>
      </Grid>

      <Grid item lg={4}>
      <p style ={{textAlign:"center"}}><i style={{color: "#FFC92F" }} class="fas fa-phone-square-alt"></i> {Cons.numero} </p>
      </Grid>


      </Grid>
  </Paper>

  </Paper>


  )
};