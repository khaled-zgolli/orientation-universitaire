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

  
  
  
export default function PopupedeleteAdmin({ openPopupedeleteAdmin, setOpenPopupedeleteAdmin, data }) {
    

  
    
    const classes = useStyles();

    function deleteAdmin (){
      
        axios({
            url: 'http://localhost:4000/api/data/deleteAdmin',
            method: 'delete',
            data: { _id: data },
          }).then(()=> {
            setTimeout(() => {
                window.location.reload();
              }, 1000);
          })


    }
        return (
        <Dialog open={openPopupedeleteAdmin} maxWidth="lg">
            <DialogContent >
            <IconButton className={classes.customizedButton}
            onClick={()=>{setOpenPopupedeleteAdmin(false)}}>
                 <CloseIcon /> 
                </IconButton>
                <br/>
                <center> <h3>souhaitez vous vraiment supprimer ce membre? </h3> </center>
        <br/>
       <center>
       <Button variant="contained" color="primary" onClick={()=>{setOpenPopupedeleteAdmin(false)}}> Annuler</Button>  &ensp;
       <Button variant="contained" color="secondary" onClick={deleteAdmin}> Oui</Button>
        </center>   <br/>

            </DialogContent>
        </Dialog>
    )
}
