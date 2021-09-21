import { Box, Grid, IconButton, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import admin from "./admin.png";
import news from "./news.png";
import article from "./article.png";
import etudiant from "./etudiant.png";
import conseiller from "./conseiller.png";
import établissement from "./établissement.png";
import { Card } from "./Card";
import Courbe from "./Courbe";
import Piechart from "./PieChart";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Swal from "sweetalert2";
const useStyles = makeStyles(theme => ({
  cadre: {
    
    overflow: "auto",
    height: "260px",
  },
}));





function Home() {
  const classes = useStyles();

  const [adminData,setAdminData]=useState("")


  useEffect(() => {
    const getAdminData = async () => {
      await axios
        .get("http://localhost:4000/api/data/admin")
        .then(response => {
      
          setAdminData(response.data); 
        })
        .catch(err => {
          console.log(err);
        });
    };

    getAdminData();  
  }, []); //UNE SEUL FOIS 


  const [datasetud, setetudData] = useState([]);

  useEffect(() => {
    const getetudData = async () => {
      await axios
        .get("http://localhost:4000/api/data/etudiant")
        .then(response => {
          const data = response.data;
         
          setetudData(data); 
         
        })
        .catch(err => {
          console.log(err);
        });
    };

    getetudData(); //exection 
  }, []); //UNE SEUL FOIS 


  const [datascons, setconsData] = useState([]);

  useEffect(() => {
    const getconsData = async () => {
      await axios
        .get("http://localhost:4000/api/data/conseiller")
        .then(response => {
          const data = response.data;
         
          setconsData(data); 
         
        })
        .catch(err => {
          console.log(err);
        });
    };

    getconsData(); //exection 
  }, []); //UNE SEUL FOIS 


  const [dataEtab, setDataEtab] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await axios
        .get("http://localhost:4000/api/data/getEtablissement")
        .then(response => {
          const data = response.data;

          setDataEtab(data);
          ;
        })
        .catch(err => {
          console.log(err);
        });
    };

    getData();
  }, []); //UNE SEUL FOIS


   const [dataArticle , setArticleData]=useState([])
  useEffect(() => {
    const getData = async () => {
      await axios
        .get("http://localhost:4000/api/data/getArticles")
        .then(response => {
          const data = response.data;
          setArticleData(data);
         
        })
        .catch(err => {
          console.log(err);
        });
    };

    getData();
  }, []); //UNE SEUL FOIS


  const [dataActualite , setActualitesData]=useState([])
  useEffect(() => {
    const getData = async () => {
      await axios
        .get("http://localhost:4000/api/data/getactualites")
        .then(response => {
          const data = response.data;
         
          setActualitesData(data); 
         
        })
        .catch(err => {
          console.log(err);
        });
    };

    getData();  
  }, []); //UNE SEUL FOIS 


  const [datas , setDatas]=useState([])
  useEffect(() => {
    const getData = async () => {
      await axios
        .get("http://localhost:4000/api/data/getContactus")
        .then(response => {
          const data = response.data;
         
          setDatas(data); 
         
        })
        .catch(err => {
          console.log(err);
        });
    };

    getData();  
  }, []); //UNE SEUL FOIS 




  return (
    <div style={{ marginLeft: "5%", marginTop: "2%" }}>
      <div style={{  height :"230px"}}>
        <Grid container  spacing={3}>
          <Grid item lg={9}>
            <Grid container spacing={3}>
              <Grid item lg={4} md={6} sm={3} xs={3}>
                <Card
                  color="#FFB25B"
                  image={admin}
                  type="adminstrateur"
                  number={"" + adminData.length}
                />
              </Grid>
              <Grid item lg={4} md={12} sm={12} xs={12}>
                <Card
                  color="#FFE369 "
                  image={conseiller}
                  type="conseiller"
                  number={""+datascons.length}
                />
              </Grid>
              <Grid item lg={4} md={12} sm={12} xs={12}>
                <Card
                  color="#DAF7A6"
                  image={etudiant}
                  type="etudiant"
                  number={""+datasetud.length}
                />
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item lg={4} md={12} sm={12} xs={12}>
                <Card
                  color="#FFB25B"
                  image={établissement}
                  type="établissement"
                  number={""+dataEtab.length}
                />
              </Grid>
              <Grid item lg={4} md={6} sm={12} xs={12}>
                <Card
                  color="#FFE369"
                  image={article}
                  type="articles"
                  number={""+dataArticle.length}
                />
              </Grid>
              <Grid item lg={4} md={6} sm={12} xs={12}>
                <Card
                  color="#DAF7A6"
                  image={news}
                  type="actualités"
                  number={""+dataActualite.length}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={3} className={classes.cadre}>


             <center><h3 > Contact us </h3></center>  
            {datas.map((data, index) => {
              return (
                <Paper elevation={6} style={{ padding: "10px" , marginBottom: "10px" }} key={index}>
                  
                  <Box display="flex">
                  <IconButton size="small"  onClick={()=>{
                      axios({
                        url: 'http://localhost:4000/api/data/deleteContactus',
                        method: 'delete',
                        data: { _id: data._id },
                      }).then(()=> {
                        Swal.fire({
                          icon:'success',
                          title: "Supprimé",
                          html : '<span style="color:#FFFFFF"> </span>',
                          showCloseButton: false,
                          showConfirmButton: false,
                          background: "black",
                          timer: 2000,
                        })          
                        setTimeout(() => {
                            window.location.reload();
                          }, 1000);
                      })
                  }}>
                   <HighlightOffIcon />
                  </IconButton> 

                    <Box flexGrow={1}>{data.nom}</Box>
                    
                    <Box>{data.date}</Box>
                  </Box>
                  <Typography variant="h7">{data.email}</Typography><br/>
                  <Typography variant="h7">{data.numero}</Typography>
                  <Typography variant="body2">{data.Description}</Typography>

                </Paper>
              );
            })}
          </Grid>
        </Grid>
      </div>

      <Grid container style={{ marginTop: "5%"}}>
        <Grid item lg={8}   >
          <Courbe />
        </Grid>
        <Grid item lg={3}  >
          <Piechart />
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
