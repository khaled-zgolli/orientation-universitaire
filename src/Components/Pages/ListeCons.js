
import React from 'react';
import { Button, Container, Grid, IconButton, InputAdornment, makeStyles, Paper , TextField} from '@material-ui/core';
import { Box,  Divider,  Typography } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import SearchIcon from "@material-ui/icons/Search";



const useStyles = makeStyles(theme => ({
  paper: {
    width: "98%",
    height: "fit-content",
    backgroundColor: "rgba(248, 250, 178, 0.59)",
    marginLeft: "1%",
    marginTop: "1%",
  },
  img: {
    objectFit: "cover",
    width: "120px",
    height: "120px",
    marginRight: theme.spacing(2),
  },

}))

export default function ListeCons() {

  const classes = useStyles();

    const [ConsData , setConsData]=useState([]);
    const [LoggedIn, setLoggedIn] = useState(false);

    
  useEffect(() => {
    setLoggedIn(localStorage.getItem("Loggedin"));
  }, []);


  console.log(LoggedIn);


    // setLoggedIn(localStorage.getItem("Loggedin"));

  
useEffect(() => {
  const getData = async () => {
    await axios({
      url: 'http://localhost:4000/api/data/conseiller',
      method: 'get',
     
    }).then((res)=>{

      setSearchDataCons(res.data); 
        setConsData(res.data)
    })
  };

  getData();  
}, []); //UNE SEUL FOIS 

const [searchCons, setSearchCons] = useState("");
const [searchDatasCons, setSearchDataCons] = useState(ConsData);

useEffect(() => {
  if (searchCons === "") {
    setSearchDataCons(ConsData);
  } else {
    setSearchDataCons(
      ConsData.filter(val => {
        return val.specialite.toLowerCase().includes(searchCons.toLowerCase());
      })
    );
  }
}, [searchCons, ConsData]);

const handleClick= () => {
  Swal.fire(
    {
      showCloseButton: false,
      showConfirmButton: false,
      icon:'warning',
      background: "black",
      title: "Vous voulez connecter d'abord",
      timer: 3500,
     })
}




    return (

    <Paper elevation={6} className={classes.paper}>
        <br /><br />
        <Typography  variant="h3" className={classes.typography}>
         <center><em>Listes des conseillers de site </em></center> 
        </Typography>
    <br />
    <Divider style={{ marginBottom: "20px", marginLeft:"60px" , marginRight:"60px"}} />
    <br />


    <Container style={{ marginBottom: "50px" }}>
          <Paper elevation={6}>
            <br />
            <br />

            <TextField
            style={{marginLeft:"70px" , width:"250px" , marginBottom:"20px"}}
              onChange={e => {
                const timerId = setTimeout(() => {
                  setSearchCons(e.target.value);
                }, 500);

                return () => {
                  clearTimeout(timerId);
                };
              }}
              placeholder="chercher specialité"
              variant="standard"
              size="small"
              className={classes.search}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
             <br />
            <br />


            <div style={{ paddingLeft: "20px", paddingBottom: "30px" }}>
              {searchDatasCons.map(Cons => {
                return (
                  <Container >
                    <Box display="flex">
                      <Box alignSelf="center">
                        <img
                          src={Cons.img}
                          alt="img"
                          className={classes.img}
                        />
                      </Box>
                      <Box flexGrow={1}>
                        <Box display="flex">
                          <Box flexGrow={1}>
                            <Typography variant="h6" color="primary">
                              {Cons.Nom_prénom}
                            </Typography>
                            <Typography variant="body2" color="secondary">
                           <em> {Cons.specialite}</em>  
                            </Typography>
                          </Box>
                          <Box>
                            <Typography align="right" >
                              {/* <br/><br/><br/><br/> */}
                            {  LoggedIn ?
                              (
                              <Button size="small" color="secondary">
                                   <Link
                                 style={{ color:"#FFC92F"}}
                      
                                to={{
                                  pathname: `/Espace_Conseiller/${Cons._id}`,
                                  data: { data: Cons._id},
                                }}
                              >
                             Voir plus
                              </Link>
                              </Button>
                              )
                              : 
                              (
                                <Button size="small"
                                 color="secondary"
                                 onClick={handleClick}

                                 >
                                Voir plus
                              </Button>
                              )
                            }
                            </Typography>
                          </Box>
                        </Box>
                        <Typography variant="subtitle2">
                          {Cons.description}
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
            </div>
          </Paper>
        </Container>

            <br/>

    </Paper>
  )
};