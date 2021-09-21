
import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { Box, Button, Container, Divider, Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Link } from "react-router-dom";
import axios from 'axios';
import EditIcon from "@material-ui/icons/Edit";
import FormDeleteArticle from "./FormDelArticle";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import EditAttributesIcon from '@material-ui/icons/EditAttributes';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Swal from 'sweetalert2';
import PopupAffiche from "./VoirDetails"
import FormDeleteQuest from "./Popup_deleteQuest"
import PopupAfficheQuest from "./DetailsQuestions"
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PopupedeleteEtud from './PopuedeleteEtud'

const useStyles = makeStyles(theme => ({
 paper :{
   width :"99%",
   height :"fit-content",
   backgroundColor :"#FFC92F",
   marginLeft : "0.5%",
   marginTop :"0.5%",
   marginBottom:"10px"

 },
 image: {
  borderRadius: '100%',
  width: '150px',
  height: '150px',
  // border: "4px solid rgba(0, 0, 0, 0.80)",


  marginTop :"20px"
},
typography :{
  marginLeft :"10px",
  
},
info :{
  marginBottom:"40px",
  marginTop:"25px",
  paddingTop :"50px", 
  //  paddingBottom :"20px",


},
edit:{
  right:"-570px",
  top:"-65px", 
},
paragraphe:{
  marginBottom: "10px",
  fontSize : "18px"
},
img:{
  width: '150px',
  height: '80px',

},
botton:{
  backgroundColor:"#4caf50",
  color : "#FFFFFF"

},
bottonA:{
  backgroundColor:"#ff5722",
  color : "#FFFFFF"
},
bottoM:{
  backgroundColor:"#FFC92F",
  color : "#FFFFFF"
},

bottoR:{
  backgroundColor:"#FF0000",
  color : "#FFFFFF"
},


}));

const etud = JSON.parse(localStorage.getItem('user'));



export default function Etud_profile() {
  const classes = useStyles();
  const [OpenPopupAffiche, setOpenPopupAffiche] = useState(false);
  const [OpenPopupAfficheQuest, setOpenPopupAfficheQuest] = useState(false);
  const [DataAffichage , setDataAffichage] = useState({})

  const [etudData , setEtudData]=useState({});

useEffect(() => {
  const getEtudData = async () => {
    await axios({
      url: 'http://localhost:4000/api/user/getProfilEtudiant',
      method: 'post',
      data: {_id : etud._id}
    }).then((res)=>{
     
      setEtudData(res.data)
    })
  };

  getEtudData();  
}, []); //UNE SEUL FOIS 


const [etabData , setEtabData]=useState([]);

useEffect(() => {
  const getEtablissData = async () => {
    await axios({
      url: 'http://localhost:4000/api/Affiche/ChercheEtablissement',
      method: 'get',
     
    }).then((res)=>{
     
      setEtabData(res.data)
    })
  };

  getEtablissData();  
}, []); //UNE SEUL FOIS 



// ***********************************************************//

const [articlesEtud, setArticlesEtud] = useState([]);

useEffect(() => {
  const getArticlesEtud = async () => {
    await axios({
      url: "http://localhost:4000/api/data/getArticlesEtud",
      method: "post",
      data: { AuteurEtud: etud._id },
    }).then(res => {
      setArticlesEtud(res.data);
    });
  };

  getArticlesEtud();
}, []); //UNE SEUL FOIS


const [questEtud , setQuestEtud]=useState([{}])
useEffect(() => {
  const getEtudData = async () => {
    await axios({
      url: 'http://localhost:4000/api/data/getQuestionsEtud',
      method: 'post',
      data: {_id : etud._id}
    }).then((res)=>{
     
      setQuestEtud(res.data)
    })
  };

  getEtudData();  
}, []); //UNE SEUL FOIS 

//***************************************************** */
const [favoris , setFavoris]=useState([{
  etab:{
    _id :"",
    nom :"",
    universite :""
  }
}])
useEffect(() => {
  const getFavoris = async () => {
    await axios({
      url: 'http://localhost:4000/api/Affiche/getFavoris',
      method: 'get',
 
    }).then((res)=>{

      const obj = res.data.filter((e) => {
        return e.etudiant === etud._id;
      });
     
      setFavoris(obj)
    })
  };

  getFavoris();  
}, []); //UNE SEUL FOIS 

console.log(favoris);
const [openPopupedeleteEtud, setOpenPopupedeleteEtud] = useState(false);

//***************************************************************** */
const [openPopupedelete, setOpenPopupedelete] = useState(false);
const [openPopupedeleteQuest, setOpenPopupedeleteQuest] = useState(false);
  
const [EditData, setEditEdata] = useState({});
const handleClickAjout = () => {
  Swal.fire(
    {
      showCloseButton: false,
      showConfirmButton: false,
      icon:'success',
      background: "black",
      title: "Ce article est bien ajouté",
      timer: 1500,
     })
}

const handleClickAttente = () => {
  Swal.fire(
    {
      showCloseButton: false,
      showConfirmButton: false,
      icon:'info',
      background: "black",
      title: "Ce article est en cours de validation",
      timer: 1500,
     })
}

  const handleClickenattentequest= () => {
    Swal.fire(
       {
      showCloseButton: false,
      showConfirmButton: false,
      icon:'info',
      background: "black",
      title: "En cours de réponse",
      html:"Merci pour votre patiente ",
      timer: 4000,
         })
}
  const handleClickReponde  = () => {
    Swal.fire(
      {
        showCloseButton: false,
        showConfirmButton: false,
        icon:'success',
        background: "black",
        title: "Ce question est répondu",
        timer: 1500,
         })
  }

 
  return (
    <> 
      
     <Paper elevation={6} className={classes.paper}>
     { etudData.Ville === "" ? (
      
       <Alert variant="filled" severity="error">
        Merci de compléter votre profil
      </Alert>)
      : (<>
      </>)
      }
      
      <center>
       <img
            src={etudData.img}
            alt=""
            className={classes.image}
           
          />
          <Typography variant="h5" color="primary" className={classes.typography}> <strong> {etudData.Nom_prénom} </strong></Typography><br/>
       </center>

       <Container style={{marginBottom :"50px"}}>
         <Paper elevation={6}>  
      
            <center >
            <Typography variant="h5" className={classes.info} style={{marginBottom:"8px"}}> Mes informations</Typography>
            <Link to="/FormEtudiant">
              <IconButton className={classes.edit}> 
              <i class="fas fa-pen"></i> </IconButton> 
              </Link>
            </center>
            <Divider />
           <br/><br/>
            <div style={{paddingLeft :"80px", paddingBottom :"30px"}}>

              <p className={classes.paragraphe}><span style={{color:"#FFC92F"}}>Nom Prénom :</span>   <em> {etudData.Nom_prénom}</em> </p>
              {etudData.Ville ? (  <p className={classes.paragraphe}><span style={{color:"#FFC92F"}}>Ville :</span>  <em>{etudData.Ville} </em> </p>) :"" }
              { etudData.dataNiveau ? etudData.dataNiveau.Niveau === "Diplômé" ? ( <div>  
                <p className={classes.paragraphe}><span style={{color:"#FFC92F"}}>Niveau d'étude :</span>  <em>{etudData.dataNiveau.Niveau} </em></p>
                <p className={classes.paragraphe}><span style={{color:"#FFC92F"}}>Type de diplôme cherché :</span>  <em> {etudData.dataNiveau.diplomeDip} </em></p>
                <p className={classes.paragraphe}><span style={{color:"#FFC92F"}}>Domaine d'étude :</span> <em> {etudData.dataNiveau.domaineDip}</em> </p>
                <p className={classes.paragraphe}><span style={{color:"#FFC92F"}}>Spécialité :</span>  <em>{etudData.dataNiveau.specialite}</em> </p>

               </div>) : etudData.dataNiveau.Niveau === "Bachelier" ? (
                 <div>
                <p className={classes.paragraphe}><span style={{color:"#FFC92F"}}>Niveau d'étude :</span>  <em>{etudData.dataNiveau.Niveau}</em> </p>
                <p className={classes.paragraphe}><span style={{color:"#FFC92F"}}>Domaine :</span>  <em> {etudData.dataNiveau.domaine}</em> </p>
                <p className={classes.paragraphe}> <span style={{color:"#FFC92F"}}>Diplome :</span>  <em>{etudData.dataNiveau.diplome}</em> </p>
                <p className={classes.paragraphe}><span style={{color:"#FFC92F"}}>Filière :</span> <em>{etudData.dataNiveau.filière}</em> </p>
                <p className={classes.paragraphe}><span style={{color:"#FFC92F"}}>Section :</span> <em>{etudData.dataNiveau.section}</em> </p>
                <p className={classes.paragraphe}><span style={{color:"#FFC92F"}}>Score :</span> <em>{etudData.dataNiveau.score}</em> </p>
                    </div>
                 
               ) :" " : "" 
               }
            
            </div>
         </Paper>
         
       </Container>
       
       <Container style={{marginBottom :"20px"}}>
         <Paper elevation={6}>
      
            <center >
            <Typography variant="h5" className={classes.info} style={{marginBottom:"10px"}}> Mes résultats</Typography>
            </center>
            <Divider style={{marginTop:"45px"}}/>
           <br/><br/>
           {
             etudData ? etudData.dataNiveau ? etudData.dataNiveau.Niveau ==="Bachelier" ?(
              <div style={{paddingLeft :"80px", paddingBottom :"30px"}}>
                {etabData.map((filières)=>{


                 return  filières.filière.map((data)=>{

                    if(etudData.dataNiveau.diplome === data.diplome ){
                      if(etudData.dataNiveau.filière === data.filièreNom ){
                       return  data.section.map((sec)=>{
                          if(sec.sectionName === etudData.dataNiveau.section ){
                return  <div style={{paddingLeft :"80px", paddingBottom :"30px"}}>
              <Grid container  >
                <Grid item lg={4}  >
                <><span style={{color:"#FFC92F"}}> Etablissement</span> </><br/><em>  <a href={`/Etablissement/${filières._id}`}> {filières.nom}</a> </em>
                </Grid>
                <Grid item lg={3} style={{marginLeft :"50px"}}>
                <><span style={{color:"#FFC92F"}}>Université</span></> <br/> <em> {filières.universite} </em>
                </Grid>
                <Grid item lg={4}  >
                <><span style={{color:"#FFC92F"}}>Score de cette section</span></> <br/> <em>  {sec.score}  </em>
                </Grid>

              </Grid>

              <Divider width="80%" style={{marginTop:"10px"}} />

            
            </div> 
                          }
                        })
  
                      }
                      
                    }

                  })
                  
            
                })}
                </div>
             ): (  etudData ? etudData.dataNiveau ? etudData.dataNiveau.Niveau ==="Diplômé" ?(
              <div style={{paddingLeft :"80px", paddingBottom :"30px"}}>
                {etabData.map((specialites)=>{


                 return  specialites.filière.map((data)=>{

                    if(etudData.dataNiveau.diplomeDip === data.diplome ){
                      if(etudData.dataNiveau.specialite === data.filièreNom ){
                        return  <div style={{paddingLeft :"80px", paddingBottom :"30px"}}>
                        <Grid container >
                          <Grid item lg={5}  >
                          <><span style={{color:"#FFC92F"}}> Etablissement</span> </><br/><em><a href={`/Etablissement/${specialites._id}`}> {specialites.nom}</a></em> 
                          </Grid>
                          <Grid item lg={2} style={{marginLeft :"50px"}}>
                          <><span style={{color:"#FFC92F"}}>Ville</span></> <br/> <em>{specialites.ville} </em> 
                          </Grid>

                          <Grid item lg={2} style={{marginLeft :"50px"}}>
                          <><span style={{color:"#FFC92F"}}>Université</span></> <br/> <em> {specialites.universite}  </em>
                          </Grid>
          
                        </Grid>
          
                        <Divider width="80%" style={{marginTop:"10px"}} />
          
                      
                      </div>
  
                      }
                      
                    }

                  })
                })}
                </div>
             ):<center><h4>Afin d'utiliser les services de site, il est nécessaire que vous nous donniez des informations.
             <br/> <br/><br/></h4> </center> :<center><h4>Afin d'utiliser les services de site, il est nécessaire que vous nous donniez des informations.
             <br/> <br/><br/></h4> </center>: <center><h4>Afin d'utiliser les services de site, il est nécessaire que vous nous donniez des informations.
             <br/> <br/><br/></h4> </center> ) :<center><h4>Afin d'utiliser les services de site, il est nécessaire que vous nous donniez des informations.
             <br/> <br/><br/></h4> </center>: <center><h4>Afin d'utiliser les services de site, il est nécessaire que vous nous donniez des informations.
             <br/> <br/><br/></h4> </center>
            }




         </Paper>
         
       </Container>


       <Container id={"favoris"} style={{marginBottom :"20px"  , marginTop :"50px" }} >
         <Paper elevation={6} >
      
            <center >
            <Typography variant="h5"  className={classes.info} style={{marginBottom:"10px"}}> Mes favoris</Typography> 
            </center>
            <Divider style={{marginTop:"45px"}}/>
           <br/><br/>
           {
              favoris.length !== 0 ? 

              <div style={{ paddingLeft: "20px", paddingBottom: "30px" , maxHeight :"400px" , overflow :"auto"}}>
                {
                  favoris.map((fav)=>{

                    return  <div style={{paddingLeft :"80px", paddingBottom :"30px"}}>
                    <Grid container  >
                      <Grid item lg={4}  >
                      <><span style={{color:"#FFC92F"}}> Etablissement</span> </><br/><em>  <a href={`/Etablissement/${fav.etab._id}`}> {fav.etab.nom}</a> </em>
                      </Grid>
                      <Grid item lg={3} style={{marginLeft :"50px"}}>
                      <><span style={{color:"#FFC92F"}}>Ville</span></> <br/> <em> {fav.etab.ville} </em>
                      </Grid>
                      <Grid item lg={3} style={{marginLeft :"50px"}}>
                      <><span style={{color:"#FFC92F"}}>Université</span></> <br/> <em> {fav.etab.universite} </em>
                      </Grid>
                    
      
                    </Grid>
      
                    <Divider width="80%" style={{marginTop:"10px"}} />
      
                  
                  </div> 


                  })
                }
                
                 </div>
              
              
              :"Pas de favoris"
            }




         </Paper>
        
         
       </Container>
       <Container style={{marginTop :"50px"}}>
          <Paper elevation={6}>
            <center>
              <Typography variant="h5" className={classes.info} style={{marginBottom:"8px"}}>
                Partagez votre expériences
              </Typography>
              <Link to="/AjoutArticle">
                <IconButton className={classes.edit}>
                  <i class="fas fa-pen"></i>{" "}
                </IconButton>
              </Link>
            </center>
            <Divider />
            <br />
            <br />

            { articlesEtud.length !== 0 ?

            <div style={{ paddingLeft: "20px", paddingBottom: "30px" , maxHeight :"400px" , overflow :"auto"}}>
              {articlesEtud.map(article => {
               
                return (
                  <Container >
                    <Box display="flex">
                      <Box alignSelf="center">
                        <img
                          src={article.Image}
                          alt="img"
                          className={classes.img}                           
                        /> 
                          <br/>

                      </Box>
                      <Box flexGrow={1}>
                        {/* <EditIcon />
                        <DeleteIcon /> */}
                        <Box display="flex">
                          <Box flexGrow={1}>
                            <Typography variant="h6" color="primary">
                            &nbsp;   {article.Sujet} 
                            {article.modifié === "AM" && article.affichage === "NA" ? //A MODIFIER
                          <>
                                 &nbsp; &nbsp; &nbsp;
                                  <Button
                                  size="small"
                                  variant="contained"
                                  color="secondary"
                                  > 
                                  <Link
                                  style={{color:"#FFFFFF"}}
                                to={{
                                  pathname: "/FormEditArticleEtud",
                                  data: { data: article },
                                }}
                              >
                               Modifier L'article
                              </Link>
                            </Button>
                             </>
                            :
                            article.modifié === "M" && article.affichage === "A" ? //AFFICHE
                            <>
                            &nbsp; &nbsp; &nbsp;
                             <Button
                             size="small"                                 
                             variant="contained"
                             className={classes.botton}
                             onClick={handleClickAjout}
                             >
                              Bien ajouté
                       </Button>
                        </>                            
                            : article.modifié === "M" && article.affichage === "NA" ?
                            <>
                            &nbsp; &nbsp; &nbsp;
                             <Button
                             size="small"                                 
                             variant="contained"
                             className={classes.bottonA}
                             onClick={handleClickAttente}
                             >
                              En attente
                       </Button>
                        </>                            
                            : ""
                          }  
                            </Typography>
                          </Box>
                          <Box>
                            <Typography align="right">
                        
                               <IconButton
                                 size="small"
                                  color="secondary"
                                onClick={() => {
                                  setOpenPopupAffiche(true);
                                  setDataAffichage(article);
                                }}
                              >
                                <VisibilityIcon />
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
                        &nbsp; {article.createdAt}
                        </Typography>
                        <Typography
                          variant="body1"
                          style={{ overflow: "hidden"  }}
                        >
                        </Typography>
                      </Box>
                    </Box>

                    <Divider
                      style={{ marginTop: "5px", marginBottom: "5px" }}
                    />
                  </Container>
                );

              })}
            </div> : <center><h4>Pas d'expérience partagé. 
             <br/> <br/><br/></h4> </center>}
          </Paper>
        </Container>


        <Container style={{marginTop :"50px"}}>
          <Paper elevation={6}>
            <center>
              <Typography variant="h5" className={classes.info} >
                Votre questions
              </Typography>

            </center>
            <Divider />
            <br />
            <br />
            { questEtud.length !== 0 ?
            <div style={{ paddingLeft: "20px", paddingBottom: "30px" , maxHeight :"300px" , overflow :"auto" }}>
              {questEtud.map(quest => {
                return (
                  <Container >
                    <Box display="flex">
                      <Box flexGrow={1}>
                        {/* <EditIcon />
                        <DeleteIcon /> */}
                        <Box display="flex">
                          <Box flexGrow={1}>
                            <Typography variant="h6" color="primary" style={{marginBottom:"4px"}}>
                            &nbsp;  
                             {quest.Sujet} 
                            {quest.Reponse === "" ?
                         <>
                         &nbsp; &nbsp; &nbsp;
                          <Button
                          size="small"                                 
                          variant="contained"
                          className={classes.bottonA}
                          onClick={handleClickenattentequest}
                          >
                           En attente
                    </Button>
                     </>       
                            :
                            <>
                            &nbsp; &nbsp; &nbsp;
                             <Button
                             size="small"                                 
                             variant="contained"
                             className={classes.botton}
                             onClick={handleClickReponde}
                             >
                              Bien répondu
                       </Button>
                       </>
                          }  
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
                        <Typography variant="body1">
                        
                        
                        &nbsp; <em style ={{color: "#FFC92F"}}> Conseiller</em>  : { quest.Conseiller !== undefined ? quest.Conseiller.Nom_prénom : ""}
                        </Typography>
                        <Typography variant="subtitle2">
                        &nbsp; {quest.createdAt}
                        </Typography>
                        <Typography
                          variant="body1"
                          style={{ overflow: "hidden"  }}
                        >
                        </Typography>
                      </Box>
                    </Box>

                    <Divider
                      style={{ marginTop: "5px", marginBottom: "5px" }}
                    />
                  </Container>
                );
                
              })}
            </div> : <center><h4>Pas de question. Pour contacter un conseiller accéder à son espace personel.
             <br/> <br/><br/></h4> </center>}
          </Paper>
        </Container>


       

        
        <FormDeleteArticle
          openPopupedelete={openPopupedelete}
          setOpenPopupedelete={setOpenPopupedelete}
          data={EditData._id}
        />
         <FormDeleteQuest
          openPopupedeleteQuest={openPopupedeleteQuest}
          setOpenPopupedeleteQuest={setOpenPopupedeleteQuest}
          data={EditData._id}
        />

        <PopupAffiche
        OpenPopupAffiche={OpenPopupAffiche}
        setOpenPopupAffiche={setOpenPopupAffiche}
        data={DataAffichage}
      ></PopupAffiche>

        <PopupAfficheQuest
        OpenPopupAfficheQuest={OpenPopupAfficheQuest}
        setOpenPopupAfficheQuest={setOpenPopupAfficheQuest}
        data={DataAffichage}
      ></PopupAfficheQuest>


<br/>
                            <Button
                             size="small"                                 
                             variant="contained"
                             className={classes.bottoR}
                             style={{marginLeft:"78%",marginBottom :"10px"}}
                              onClick={()=>{
                                setOpenPopupedeleteEtud(true);
                              }}
                             >
                               <HighlightOffIcon /> &nbsp;
                               Supprimer votre compte?

                       </Button>
                       <br/>
                       
          <PopupedeleteEtud
            data={etud._id}
            openPopupedeleteEtud={openPopupedeleteEtud}
            setOpenPopupedeleteEtud={setOpenPopupedeleteEtud}
          ></PopupedeleteEtud>

     </Paper>
    </>
  )
};