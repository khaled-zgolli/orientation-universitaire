import React from 'react'
import { Dialog,  DialogContent, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton , Box} from '@material-ui/core';

const useStyles = makeStyles(theme => ({

    image: {
        width: '820px',
        height: '250px',

      },

    customizedButton: {
        position: 'absolute',
        left: '93%',
        top: '3%',
        backgroundColor: '',
        color: 'gray',
      },

    titre: {
        // width: '860px',
        height: '60px',
      },
    parag: {
       height: '150px',
       width: '850px',
      },  

    }))


export default function PopupAffiche (props) {




    const { OpenPopupAffiche, setOpenPopupAffiche , data } = props;

   
    
    const classes = useStyles();


    return (
        <div>
             <Dialog open={OpenPopupAffiche} maxWidth="md" >
            <DialogContent >
            <IconButton className={classes.customizedButton}
                onClick={()=>{setOpenPopupAffiche(false)}}>
                    <CloseIcon />
                </IconButton>
                <mark>  <em> <h1 className={classes.titre}> Question </h1> </em> </mark>
                <Box borderBottom={1}>

                <p className={classes.parag}> {data.Question} </p></Box> 
                             <h5> {data.createdAt}</h5>     
<br/><br/>
              <em>  <h1 className={classes.titre}> Réponse </h1></em> 
                <Box borderBottom={1}>
                <p className={classes.parag}> {data.Reponse} </p></Box>  
                         <h5> {data.updatedAt}</h5> 
         
            </DialogContent>
        </Dialog>
        </div>
    );
}