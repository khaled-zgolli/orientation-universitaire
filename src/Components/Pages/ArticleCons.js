import { Container, Grid, IconButton, makeStyles, Paper } from '@material-ui/core';
import { Box,  Divider,  Typography } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Parser from 'html-react-parser'


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


  


export default function Articles_cons(props){

  console.log(props.match.params.id);


const [expData , setexpData]=useState({

    Description :"",
});
  useEffect(() => {
    const getEtab = async () => {
      await 
         axios({
        url: 'http://localhost:4000/api/data/getArticleById',
        method: 'post',
        data: {
         _id: props.match.params.id
        },
      }).then((res)=>{
        setexpData(res.data)
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
          <strong>{expData.Sujet} </strong>  <br/>
        </Typography>
      </Box>
      <Box>

      
      </Box>
    </Box>

    <br />
    <Divider style={{ marginBottom: "20px", marginLeft:"60px" , marginRight:"60px"}} />
    
<Container><br/> <center><img className={classes.image} src={expData.Image}  />
</center>

<Divider style={{marginLeft:"60px" , marginRight:"60px"}} />


<br/><br/>
<Typography  variant="body" className={classes.typography} >
          {Parser(expData!=="" ? expData.Description :"")}
        </Typography>


        

</Container>

<Container >
</Container>

<br/>
<br/>
<br/>


  </Paper>
  )
};