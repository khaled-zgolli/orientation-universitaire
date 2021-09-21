import React from 'react'
import { Dialog, DialogContent, makeStyles, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import axios from "axios";



const useStyles = makeStyles(theme => ({
    dialog:{

    },
    customizedButton: {
        position: 'absolute',
        left: '87%',
        top: '2%',
        backgroundColor: '',
        color: 'gray',
      }
    }))

  
  
  
export default function PopupedeleteAE({ openPopupedeleteE, setOpenPopupedeleteE , data }) {

    const classes = useStyles();

    function deleteAE (){
      
        axios({
            url: 'http://localhost:4000/api/data/deleteArticlesEtud',
            method: 'delete',
            data: { _id: data },
          }).then(()=> {
            setTimeout(() => {
                window.location.reload();
              }, 1000);
          })


    }
        return (
        <Dialog open={openPopupedeleteE} maxWidth="lg" className={classes.dialog} >
            <DialogContent >
            <IconButton className={classes.customizedButton}
            onClick={()=>{setOpenPopupedeleteE(false)}}>
                 <CloseIcon /> 
                </IconButton>
                <br/>
        <center> <h3>souhaitez vous vraiment supprimer ce article? </h3> </center>
        <br/>
       <center>
       <Button variant="contained" color="primary" onClick={()=>{setOpenPopupedeleteE(false)}}> Annuler</Button>  &ensp;
       <Button variant="contained" color="secondary" onClick={deleteAE}> Oui</Button>
        </center>     <br/>

            </DialogContent>
        </Dialog>
    )
}