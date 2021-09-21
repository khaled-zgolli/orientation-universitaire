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



const validationSchema = Yup.object().shape({
  source:Yup.string().required("champs obligatoire"),
  date :Yup.string().required("Date d'aujoud'hui invalide"),
  hour:Yup.string().required("champs obligatoire"),
  content:Yup.string().required("champs obligatoire"),

  });

  const user = JSON.parse(localStorage.getItem('user'));

  const initialValues = {
    date:"",
    hour:"",
    content:"",
    source:"",
     name: user !== null ? user.Nom_prénom :""
   
  };


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

  
export default function PopupAddEvent({ OpenPopupAdd, setOpenPopupAdd  }) { 
    const classes = useStyles();

    const [selectedDate, setSelectedDate] = useState();

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };

    const handleSubmit = props => {
      axios({
        url: "http://localhost:4000/api/visio/addEvent",
        method: "post",
        data: props
      })
        .then(res => {
          setOpenPopupAdd(false)
        
          Swal.fire({
            icon: "success",
            title: "Bien ajouté",
            html: '<span style="color:#FFFFFF">  </span>',
            showCloseButton: false,
            showConfirmButton: false,
            background: "black",
            timer: 1000,
          });
          setSelectedDate()
        
          setTimeout(() => {
            window.location.href = "/Agenda";
          }, 500);
        })
        .catch(err => {
          setOpenPopupAdd(false)
          Swal.fire({
            icon: "warning",
            html: '<span style="color:#FFF6C5">   Error </span>',
            showCloseButton: false,
            showConfirmButton: false,
            background: "black",
            timer: 1000,
          });
        });
    };

 
        return (
        <Dialog open={OpenPopupAdd} maxWidth="lg">
            <DialogContent >
            <IconButton className={classes.customizedButton}
            onClick={()=>{setOpenPopupAdd(false)}}>
                 <CloseIcon /> 
            </IconButton>
            <br/>
            <Formik
          enableReinitialize={true}
          validateOnBlur={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values ,setFieldValue , resetForm }) => (
            <Form noValidate autoComplete="off" >
              <center>
             <h2><em>Planifier une réunion</em></h2> 
              <br/>
              <br/>
              <Field
                  style={{ width: "400px" }}
                  fullWidth
                  as={TextField}
                  name="content"
                  variant="outlined"
                 
                  label="Sujet"
                  size="small"
                  helperText={<ErrorMessage name="content" />}
                  error={errors.content && touched.content}
                />


                <br /><br/>
                   <Field
                  style={{ width: "400px" }}
                  fullWidth
                  as={TextField}
                  name="source"
                  variant="outlined"
              
                  label="Url"
                  size="small"
                  helperText={<ErrorMessage name="source" />}
                  error={errors.source && touched.source}
                />
                <br />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
    
        <KeyboardDatePicker
        autoOk
          disableToolbar
          variant="dialog"
          format="yyyy-MM-dd"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          disablePast
          
          maxDate={new Date("01-01-2022")} 
           value={selectedDate}
         
         
          onChange={date => {
         
            setSelectedDate(date);
            setFieldValue("date", moment(date).format("YYYY-MM-DD"));
          }}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
         
          helperText={<ErrorMessage name="date" />}
          error={errors.date && touched.date}
        />
       
     
    </MuiPickersUtilsProvider>

<br />

<Field
        as={TextField}
        id="time"
        label="Alarm clock"
        type="time"
        defaultValue="07:30"
        name="hour"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        helperText={<ErrorMessage name="hour" />}
        error={errors.hour && touched.hour}

      />
      <br/>



      <br/>





    <Button
                  
                    variant="contained"
                    color="primary"
                    type="submit"
                    size="large"
                  >
                    Envoyer
                  </Button>
              </center>
            </Form>
          )}

        </Formik>
        <br/>  <br/>

            </DialogContent>
        </Dialog>
    )
}
