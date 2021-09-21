import React, { useState } from 'react'
import { Dialog, DialogContent, makeStyles, Button, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider , KeyboardTimePicker,
    KeyboardDatePicker,} from '@material-ui/pickers';
import moment from 'moment';
import Swal from 'sweetalert2';
import { CopyToClipboard } from 'react-copy-to-clipboard'




const user = JSON.parse(localStorage.getItem('user'));

const useStyles = makeStyles(theme => ({
    
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  customizedButton: {
    position: 'absolute',
    left: '87%',
    top: '2%',
    backgroundColor: '',
    color: 'gray',
  }

    }))




  
export default function AgendaPopup({ OpenPopupAgenda, setOpenPopupAgenda  , data }) { 
    console.log(data);
    const classes = useStyles();
  
    const [copied, setCopied] = useState(false);

    const url =  data.source
        return (
        <Dialog open={OpenPopupAgenda} maxWidth="lg" >
            <DialogContent style={{width :"600px"}} >
            <IconButton className={classes.customizedButton}
            onClick={()=>{setOpenPopupAgenda(false)}}>
                 <CloseIcon /> 
            </IconButton>
            <br/>

           <center style={{color: '#FFC92F'}}> <h2>{data.content}</h2> </center>
           <br/>
           <center> <h3><em> Le {data.date} à {data.hour} </em></h3> </center>
           <br/>
           <center> <h3><em> Présenté par:  {data.name}  </em></h3> </center>
           <br/>
           <center>
            <CopyToClipboard text={url}>
            <Button onClick={()=>{
                setCopied(true)
                setTimeout(()=>{
                    setCopied(false)
                },3000)
            }}> <i class="far fa-copy"></i> &nbsp;{data.source} </Button>
        </CopyToClipboard>

           {copied ?
           <span style={{color: '#60B65F'}}><em>Copied <i class="fas fa-check"></i> </em> </span> : null
          }
           </center>
        <br/>
                 {user !== null && (user.Nom_prénom === data.name || user.Role === "Admin") ?
                     
                 <center>
                  <Button
                  onClick={()=>{
                      
                    axios({
                        url: 'http://localhost:4000/api/visio/deleteEvent',
                        method: 'delete',
                        data: { name: data.name },
                    }).then(()=> {
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);
                    })

                  }}
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Supprimer 
                </Button>
                </center>

               : ""}
          
            </DialogContent>
        </Dialog>
    )
}
