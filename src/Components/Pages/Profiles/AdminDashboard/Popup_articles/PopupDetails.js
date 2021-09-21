import React from 'react'
import { Dialog,  DialogContent, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import parse from 'html-react-parser';

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
        width: '860px',
        height: '80px',
      },
    parag: {
       height: '180px',
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
                <h1 className={classes.titre}> {data.Sujet} </h1>
                <img className={classes.image} src={data.Image} /> <br/> <br/> <br/>
                <hr/>  <br/> <br/> <br/>
              <p>  {parse(data ? data.Description ?   data.Description :"" :"")}</p>
                {/* {parse(  data.Description  )}  */}
                <br/> <br/> <br/>

         
            </DialogContent>
        </Dialog>
        </div>
    );
}