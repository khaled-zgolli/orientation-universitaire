import { Container, Grid, IconButton, makeStyles, Paper } from '@material-ui/core';
import { Box,  Divider,  Typography } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';


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
    image:{
      width: "50%",
      height: "30%",
      paddingBottom: "4%"
      },
    edit:{
        right:"130%",
        bottom:"-22%", 
      },
      contain:{
        backgroundColor: "rgba(F, F, F, F)",

      }

}))




  


export default function Etablissement(props){
  const user = JSON.parse(localStorage.getItem('user'));




const [etabData , setEtabData]=useState({
  nom :"",
  filière : [{
    section :[{}]
  
  }]
});


const [isFavoris , setIsFavoris]=useState("black")
  useEffect(() => {
    const getEtab = async () => {
      await 
         axios({
        url: 'http://localhost:4000/api/data/getEtablissmentById',
        method: 'post',
        data: {
         _id: props.match.params.id
        },
      }).then((res)=>{
        setEtabData(res.data)
      })
    };

    getEtab();  
  }, [props.match.params.id]); //UNE SEUL FOIS 

  //**************************************************************************** */

  console.log(user._id);

  useEffect(() => {
    const getEtab = async () => {
      await 
         axios({
        url: 'http://localhost:4000/api/Affiche/isFavoris',
        method: 'post',
        data: {
          etudiant:user._id,
          etab :props.match.params.id
        },
      }).then((res)=>{
        console.log(res);
        
        if(res.data.length > 0){
          setIsFavoris("red")
        }
      
       
      })
    };

    getEtab();  
  }, [props.match.params.id]); //UNE SEUL FOIS 

 

    const classes = useStyles();


  return (
    <Paper elevation={6} className={classes.paper}>
    <Box display="flex">
      <Box flexGrow={1}>
        <Typography  variant="h4" className={classes.typography}>
          <strong>{etabData.nom} </strong> <strong>{etabData.ville}</strong> <br/>
          <h6 ><em style={{ color: "#FFC92F"}} > {etabData.universite} </em></h6>
        </Typography>
      </Box>
      <Box>
        {user.Role ==="Etudiant" ?     <IconButton className={classes.edit}  onClick ={()=>{
          if(isFavoris ==="black"){
            axios({
              url: 'http://localhost:4000/api/Affiche/addFavoris',
              method: 'post',
              data: {
                etudiant : user._id,
                etab: props.match.params.id
              },
            }).then((res)=>{
              setIsFavoris("red")
            })

          }

          if(isFavoris ==="red"){
            axios({
              url: 'http://localhost:4000/api/Affiche/deleteFavoris',
              method: 'delete',
              data: {
                etudiant : user._id,
                etab: props.match.params.id
              },
            }).then((res)=>{
              setIsFavoris("black")
            })

          }
        }}> 
      <i class="fas fa-heart" style={{color:isFavoris}}></i></IconButton>  :"" }
  

      
      </Box>
    </Box>

    <br />
    <Divider style={{ marginBottom: "20px", marginLeft:"60px" , marginRight:"60px"}} />
    <p style={{ marginBottom: "20px", marginLeft:"70px" , marginRight:"70px"}}> <em>{etabData.Description}</em>

</p>
<Container><br/> <center><img className={classes.image} src={etabData.img}  />
</center>
</Container>

<Container >
  <Paper style={{paddingLeft :"3%" , paddingTop :"2.5%" , paddingBottom :"2.5%"  , paddingRight:"3%"}}>

    {etabData.filière.map(((data,index)=>{

return <div key={index} style={{border :" 1px solid #B5B5B5", borderRadius : "5px" , paddingTop :"1%", paddingBottom :"1%" , paddingLeft:"1%" , marginBottom: "1%"}}>
<h3 ><em style={{ color: "#FFC92F"}} > {data.filièreNom} </em></h3>
<p ><em style={{ color: ""}} >{data.domaine}  </em></p>
<p ><em style={{ color: ""}} > {data.diplome}  </em></p>
<p>
{data.description} 

</p>
<br/>
{data.section.map((sec , index)=>{
 return  <span key={index}>
  <span> {sec.sectionName}</span>:<span  style={{marginRight :"20px"}}> {sec.score}</span>

  </span>
})}

</div>

    }))}

    

  </Paper>
</Container>

<br/>
<br/>
<br/>


<div>
  <Paper style={{backgroundColor: "#181818"  , color:"#FEFEFE", padding :"3%"}}>
    <Grid container>
      <Grid item lg={6} style={{marginBottom :"2%"}}>
        <p style ={{textAlign:"center"}}><i style={{color: "#FFC92F" }}class="fas fa-envelope"></i> {etabData.email}</p>
      </Grid>
      <Grid item lg={6}>
      <p style ={{textAlign:"center"}}><i style={{color: "#FFC92F" }} class="fas fa-at"></i>  {etabData.site}</p>
      </Grid>

      </Grid>
      <Grid container >
      <Grid item lg={6}>
      <p style ={{textAlign:"center"}}><i style={{color: "#FFC92F" }} class="fas fa-phone-square-alt"></i> {etabData.numero} </p>
      </Grid>
      <Grid item lg={6}>
      <p style ={{textAlign:"center"}}><i style={{color: "#FFC92F" }} class="fas fa-map-marker-alt"></i> {etabData.adress} </p>
    </Grid>

      </Grid>


  </Paper>
</div>
  </Paper>
  )
};