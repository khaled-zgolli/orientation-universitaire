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


  


export default function Actulites(props){

  console.log(props.match.params.id);


const [actData , setActData]=useState({

});
  useEffect(() => {
    const getEtab = async () => {
      await 
         axios({
        url: 'http://localhost:4000/api/data/getActualiteById',
        method: 'post',
        data: {
         _id: props.match.params.id
        },
      }).then((res)=>{
        setActData(res.data)
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
          <strong>{actData.Titre} </strong>  <br/>
        </Typography>
      </Box>
      <Box>

      
      </Box>
    </Box>

    <br />
    <Divider style={{ marginBottom: "20px", marginLeft:"60px" , marginRight:"60px"}} />
    
<Container><br/> <center><img className={classes.image} src={actData.img}  />
</center>


<br/><br/>
<Typography  variant="body" className={classes.typography}>
          <em>{actData.Description} </em>  <br/>
        </Typography>

        <br/><br/>
        <Divider style={{ marginLeft:"60px" , marginRight:"60px"}} />
<Typography  variant="body2" className={classes.typography}>
          <em style={{color: '#FFC92F'}}>Source:</em> <em>{actData.Source} </em> 
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