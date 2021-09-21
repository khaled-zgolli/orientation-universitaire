import React from 'react'
import { Dialog, DialogContent, makeStyles, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import axios from "axios";



const useStyles = makeStyles(theme => ({
    customizedButton: {
        position: 'absolute',
        left: '87%',
        top: '2%',
        backgroundColor: '',
        color: 'gray',
      }
    }))

  
export default function PopupedeleteEtud({ openPopupedeleteEtud, setOpenPopupedeleteEtud , data }) { 
    const classes = useStyles();

    function deleteEtud (){
      
        axios({
            url: 'http://localhost:4000/api/data/deleteEtud',
            method: 'delete',
            data: { _id: data },
          }).then(()=> {
            setTimeout(() => {
                window.location.reload();
              }, 1000);
          })
    }
        return (
        <Dialog open={openPopupedeleteEtud} maxWidth="lg">
            <DialogContent >
            <IconButton className={classes.customizedButton}
            onClick={()=>{setOpenPopupedeleteEtud(false)}}>
                 <CloseIcon /> 
            </IconButton>
            <br/>
                <center> <h3>souhaitez vous vraiment supprimer ce membre? </h3> </center>
        <br/>
       <center>
       <Button variant="contained" color="primary" onClick={()=>{setOpenPopupedeleteEtud(false)}}> Annuler</Button>  &ensp;
       <Button variant="contained" color="secondary" onClick={deleteEtud}> Oui</Button>
        </center> <br/>  

            </DialogContent>
        </Dialog>
    )
}
