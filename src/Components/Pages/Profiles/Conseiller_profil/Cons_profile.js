import React, { useEffect, useState } from "react";
import Parser from "html-react-parser";
import Paper from "@material-ui/core/Paper";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";
import axios from "axios";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import FormDeleteArticle from "./FormDeleteArticle";
import VisibilityIcon from '@material-ui/icons/Visibility';
import PopupAfficheQuest from "./AfficheDetails"
import FormDeleteQuest from "./deleteQuest"
import Popupeditedit from "./Repondre"

const useStyles = makeStyles(theme => ({
  imageOne: {
    borderRadius: '100%',
    width: '150px',
    height: '150px',
    marginTop :"20px"
  },  
  paper: {
    width: "99%",
    height: "fit-content",
    backgroundColor: "#FFC92F",
    marginLeft: "0.5%",
    marginTop: "0.5%",
    marginBottom: "10px",
  },
  typography: {
    marginLeft: "10px",
  },
  info: {
    // marginBottom:"5px",
    // marginTop:"5px",
    paddingTop: "50px",
    //  paddingBottom :"20px",
  },
  edit: {
    right: "-570px",
    top: "-65px",
  },
  paragraphe: {
    marginBottom: "10px",
    fontSize: "18px",
  },
  image: {
    width: '50px',
    height: '50px',
    borderRadius :"100%",
    border: "3px solid #FFC92F",
    marginRight:"15px"

  },
  bottonA:{
    backgroundColor:"#ff5722",
    color : "#FFFFFF"
  },
  botton:{
    backgroundColor:"#4caf50",
    color : "#FFFFFF"
  
  },
  
}));

const cons = JSON.parse(localStorage.getItem("user"));

export default function Cons_profile() {
  const classes = useStyles();
  const [openPopupedeleteQuest, setOpenPopupedeleteQuest] = useState(false);
  const [consData, setConsData] = useState({});
  const [DataAffichage , setDataAffichage] = useState({})
  const [openPopupedit, setOpenPopupedit] = useState(false);

  useEffect(() => {
    const getConsdData = async () => {
      await axios({
        url: "http://localhost:4000/api/user/getProfilConseiller",
        method: "post",
        data: { _id: cons._id },
      }).then(res => {
        setConsData(res.data);
      });
    };

    getConsdData();
  }, []); //UNE SEUL FOIS

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      await axios({
        url: "http://localhost:4000/api/data/getArticlesCons",
        method: "post",
        data: { AuteurCons: cons._id },
      }).then(res => {
        setArticles(res.data);
      });
    };

    getArticles();
  }, []); //UNE SEUL FOIS



  const [questCons , setQuestCons]= useState([{}])

useEffect(() => {
  const getEtudData = async () => {
    await axios({
      url: 'http://localhost:4000/api/data/getQuestionsCons',
      method: 'post',
      data: {_id : cons._id}
    }).then((res)=>{
     
      setQuestCons(res.data)
    })
  };

  getEtudData();  
}, []); //UNE SEUL FOIS 

console.log(questCons);

 
  //***************************************************************** */
  const [openPopupedelete, setOpenPopupedelete] = useState(false);  
  const [OpenPopupAfficheQuest, setOpenPopupAfficheQuest] = useState(false);
  const [EditData, setEditEdata] = useState({});
  const [Edit, setEdit] = useState({});


  return (
    <>
      <Paper elevation={6} className={classes.paper}>
        {consData.specialite === "" ? (
          <Alert variant="filled" severity="error">
            Merci de compléter votre profil
          </Alert>
        ) : (
          <></>
        )}
        <center>
          <img src={consData.img} alt="" className={classes.imageOne} />
          <Typography
            variant="h5"
            color="primary"
            className={classes.typography}
          >
            <strong> {consData.Nom_prénom} </strong>
          </Typography>
          <br />
        </center>
        <Container style={{ marginBottom: "50px" }}>
          <Paper elevation={6}>
            <center>
              <Typography variant="h5" className={classes.info}>
                {" "}
                Mes informations
              </Typography>
              <Link to="/FormConseiller">
                <IconButton className={classes.edit}>
                  <i class="fas fa-pen"></i>{" "}
                </IconButton>
              </Link>
            </center>
            <Divider />
            <br />
            <br />
            <div style={{ paddingLeft: "80px", paddingBottom: "30px" }}>
              <p className={classes.paragraphe}>
                <span  style={{color:"#FFC92F"}}>Nom Prénom</span> : <em> {consData.Nom_prénom}</em>{" "}
              </p>
              {consData.email ? (
                <p className={classes.paragraphe}>
                  <span  style={{color:"#FFC92F"}}>Email</span> : <em> {consData.email}</em>{" "}
                </p>
              ) : (
                <> </>
              )}
              {consData.specialite ? (
                <p className={classes.paragraphe}>
                  <span  style={{color:"#FFC92F"}}>Spécialité</span> : <em> {consData.specialite}</em>{" "}
                </p>
              ) : (
                <> </>
              )}
              {consData.description ? (
                <p className={classes.paragraphe}>
                  <span  style={{color:"#FFC92F"}}>Description</span> : <em> {consData.description}</em>{" "}
                </p>
              ) : (
                <> </>
              )}
              {consData.LinkedIn ? (
                <p className={classes.paragraphe}>
                  <span  style={{color:"#FFC92F"}}>LinkedIn</span> : <em> {consData.LinkedIn}</em>{" "}
                </p>
              ) : (
                <> </>
              )}
              {consData.numero ? (
                <p className={classes.paragraphe}>
                  <span  style={{color:"#FFC92F"}}>Numero</span> : <em> {consData.numero}</em>{" "}
                </p>
              ) : (
                <> </>
              )}
            </div>
          </Paper>
        </Container>



        
        <Container style={{ marginBottom: "50px" }}>
          <Paper elevation={6}>
            <center>
              <Typography variant="h5" className={classes.info}>
                {" "}
                Mes articles
              </Typography>
              <Link to="/FormArticle">
                <IconButton className={classes.edit}>
                  <i class="fas fa-pen"></i>{" "}
                </IconButton>
              </Link>
            </center>
            <Divider />
            <br />
            <br />
            <div style={{ paddingLeft: "20px", paddingBottom: "30px" ,  maxHeight :"400px" , overflow :"auto" }}>
              {articles.map(article => {
                return (
                  <Container >
                    <Box display="flex">
                      <Box alignSelf="center">
                        <img
                          src={article.Image}
                          alt="img"
                          className={classes.img}
                        />
                      </Box>
                      <Box flexGrow={1}>
                        {/* <EditIcon />
                        <DeleteIcon /> */}
                        <Box display="flex">
                          <Box flexGrow={1}>
                            <Typography variant="h6" color="primary">
                              {article.Sujet}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography align="right">
                              <IconButton
                                size="small"
                                color="secondary"
                              >
                                 <Link
                                to={{
                                  pathname: "/FormEditArticle",
                                  data: { data: article },
                                }}
                              >
                                <EditIcon size="small"
                                color="secondary"
/>
                              </Link>
                              </IconButton>
                              <IconButton
                                size="small"
                                color="primary"
                                onClick={() => {
                                  setOpenPopupedelete(true);
                                  setEditEdata(article);
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Typography>
                          </Box>
                        </Box>
                        <Typography variant="subtitle2">
                          {article.createdAt}
                        </Typography>
                        <Typography
                          variant="body1"
                          style={{ overflow: "hidden"  }}
                        >
                          {/* {Parser(article.Description)} */}
                        </Typography>
                        {/* <Button
                          color="secondary"
                          variant="contained"
                          size="small"
                        >
                          Primary
                        </Button>
                        <Button
                          color="primary"
                          variant="contained"
                          size="small"
                        >
                          Primary
                        </Button> */}
                      </Box>
                    </Box>

                    <Divider
                      style={{ marginTop: "5px", marginBottom: "5px" }}
                    />
                  </Container>
                );
              })}
            </div>
          </Paper>
        </Container>
       

        <Container style={{ marginBottom: "50px" }}>
          <Paper elevation={6}>
            <center>
              <Typography variant="h5" className={classes.info} style={{marginBottom:"40px"}}>
                {" "}
                Espace Q/R
              </Typography>
            
            </center>
            <Divider />
            <br />
            <br />
            <div style={{ paddingLeft: "20px", paddingBottom: "30px",  maxHeight :"400px" , overflow :"auto" }}>
              {questCons.map(quest => {
                return (
                  <Container >
                    <Box display="flex">
                      <Box alignSelf="center">
                      <img className={classes.image} src={quest.Etudiant ? quest.Etudiant.img :""} /> <br/>
                       {/* <span style={{verticalAlign :"20px"}}>{quest.Etudiant ? quest.Etudiant.Nom_prénom :""}</span> */}

                      </Box>
                      <Box flexGrow={1}>
                        {/* <EditIcon />
                        <DeleteIcon /> */}
                        <Box display="flex">
                          <Box flexGrow={1}>
                            <Typography variant="h6" color="primary">
                         <em> {quest.Etudiant ? quest.Etudiant.Nom_prénom :""} </em>  
                        { quest.Reponse === "" ?
                        (<Button
                             size="small"                                 
                             variant="contained"
                             className={classes.bottonA}
                            //  onClick={handleClickAttente}
                             >
                              En attente
                       </Button>)
                       :
                       (
                        <Button
                        size="small"                                 
                        variant="contained"
                        className={classes.botton}
                       //  onClick={handleClickAttente}
                        >
                         Bien répondu
                  </Button>
                       )
                           } 
                            </Typography>
                            <Typography variant="body1" color="primary">
                            {quest.Sujet}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography align="right">

                            <IconButton
                                 size="small"
                                  color="secondary"
                                  onClick={() => {
                                    setOpenPopupAfficheQuest(true);
                                    setDataAffichage(quest);
                                  }}
  
                              >
                                <VisibilityIcon />
                              </IconButton>

                          { quest.Reponse === "" ?
                              (<IconButton
                                size="small"
                                color="primary"
                                onClick={() => {
                                  setOpenPopupedit(true);
                                  setEditEdata(quest);
                                }}

                              >
                                <EditIcon size="small"
                                color="secondary"
                              />
                              </IconButton>)
                              :
                              (
                                <></>
                              )

                            }

                              <IconButton
                                size="small"
                                color="primary"
                                onClick={() => {
                                  setOpenPopupedeleteQuest(true);
                                  setEditEdata(quest);
                                }}

                              >
                                <DeleteIcon />
                              </IconButton>

                            </Typography>
                          </Box>
                        </Box>
                        <Typography variant="subtitle2">
                          {quest.createdAt}
                        </Typography>
                        <Typography
                          variant="body1"
                          style={{ overflow: "hidden"  }}
                        >
                          {/* {Parser(article.Description)} */}
                        </Typography>
                        {/* <Button
                          color="secondary"
                          variant="contained"
                          size="small"
                        >
                          Primary
                        </Button>
                        <Button
                          color="primary"
                          variant="contained"
                          size="small"
                        >
                          Primary
                        </Button> */}
                      </Box>
                    </Box>

                    <Divider
                      style={{ marginTop: "5px", marginBottom: "5px" }}
                    />
                  </Container>
                );
              })}
            </div>
          </Paper>
        </Container>

        <FormDeleteArticle
          openPopupedelete={openPopupedelete}
          setOpenPopupedelete={setOpenPopupedelete}
          data={EditData._id}
        />
        <PopupAfficheQuest
        OpenPopupAfficheQuest={OpenPopupAfficheQuest}
        setOpenPopupAfficheQuest={setOpenPopupAfficheQuest}
        data={DataAffichage}
      ></PopupAfficheQuest>

        <FormDeleteQuest
          openPopupedeleteQuest={openPopupedeleteQuest}
          setOpenPopupedeleteQuest={setOpenPopupedeleteQuest}
          data={EditData._id}
        />
        <Popupeditedit 
        openPopupedit={openPopupedit} 
        setOpenPopupedit={setOpenPopupedit}
        data={EditData}
      ></Popupeditedit>

          <br/>
      </Paper>
    
    </>
    
  );
}
