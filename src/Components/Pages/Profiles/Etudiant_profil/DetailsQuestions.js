import React from 'react'
import { Dialog,  DialogContent, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import parse from 'html-react-parser';

const useStyles = makeStyles(theme => ({

    image: {
        width: '40px',
        height: '40px',
        borderRadius :"100%",
        border: "3px solid #FFC92F",
       

      },

    customizedButton: {
        position: 'absolute',
        left: '93%',
        top: '3%',
        backgroundColor: '',
        color: 'gray',
      },

    titre: {
        width: '860px',
        height: '80px',
      },
    parag: {
       height: '180px',
       width: '850px',

      },  

    }))


export default function PopupAfficheQuest (props) {




    const { OpenPopupAfficheQuest, setOpenPopupAfficheQuest , data } = props;

   
    
    const classes = useStyles();


    return (
        <div>
             <Dialog open={OpenPopupAfficheQuest} maxWidth="md" >
            <DialogContent >
            <IconButton className={classes.customizedButton}
                onClick={()=>{setOpenPopupAfficheQuest(false)}}>
                    <CloseIcon />
                </IconButton>
                <h1 className={classes.titre}> Détails </h1>
                <img className={classes.image} src={data.Etudiant ? data.Etudiant.img :""} /> <span style={{verticalAlign :"20px"}}>{data.Etudiant ? data.Etudiant.Nom_prénom :""}</span>
               <div style={{marginLeft :"60px" }}>  <em> {data.Question}</em>   </div>
           
                <hr style={{ marginBottom :"20px" , marginTop :"20px"}}/> 
                
                <img className={classes.image} src={data.Conseiller ? data.Conseiller.img :""} /> <span style={{verticalAlign :"20px"}}>{data.Conseiller ? data.Conseiller.Nom_prénom :""}</span>

                 <div style={{marginLeft :"60px" }}>  <em>  {data.Reponse === "" ? " En attente " : data.Reponse} </em> </div>

                 <br/><br/><br/>
            </DialogContent>
        </Dialog>
        </div>
    );
}