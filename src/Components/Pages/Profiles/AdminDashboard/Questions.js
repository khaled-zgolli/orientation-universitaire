import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {Button, InputAdornment, Table, TableBody,TableCell, TableContainer,TableHead, TablePagination,TableRow,TextField} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import PopupAffiche from './Popup_questions/PopupDetails'
import Popupedelete from './Popup_questions/Popup_delete'

/***********************TABPANEL*************************** */
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={1}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
/*********************************CSS*************************** */

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 6,
    backgroundColor: "rgba(248, 250, 178, 0.59)",
    marginLeft: "50px",
  },
  AppBar: {
    backgroundColor: "#FFC92F",
    color: "white",
  },
  container: {
    maxHeight: 420,
  },
  search: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(5),
    marginBottom: theme.spacing(4),
  },
  ajout: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(90),
    marginBottom: theme.spacing(4),
  },
  img: {
    objectFit: "cover",
    width: "150px",
    height: "80px",
    marginRight: theme.spacing(2),
  },
}));

/*************************************************************************/
const Columns = [
  { id: "Sujet", label: "Sujet" },
  { id: "Etudiant", label: "Etudiant" },
  // { id: "Date création", label: "Date création" },
  { id: "Conseiller", label: "Conseiller" },
  // { id: "Date réponse", label: "Date réponse" },
  { id: "Details", label: "Details" },
  { id: "Supprimer", label: "Supprimer" },
];

/****************************************************************************** */


function Questions()  {

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [OpenPopupAffiche, setOpenPopupAffiche] = useState(false);
  const [openPopupedelete, setOpenPopupedelete] = useState(false);
  const [Edit, setEdit] = useState({});


  //*****************************PAGES************************************/
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  //******************************Questions_SEARCH************************************************** */
  const [Data, setData] = useState([]);
  const [DataAffichage, setDataAffichage] = useState([]);

  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState(Data);



  useEffect(() => {
    if (search === "") {
      setSearchData(Data);
    } else {
      setSearchData(
        Data.filter(val => {
          return val.Sujet.toLowerCase().includes(search);
        })
      );
    }
  }, [search]);



  //**************************DATA****************************************/

  useEffect(() => {
    const getData = async () => {
      await axios
        .get("http://localhost:4000/api/data/getQuestions")
        .then(response => {
          const data = response.data;
         
          setData(data); 
          setSearchData(data); 
        })
        .catch(err => {
          console.log(err);
        });
    };

    getData();  
  }, []); //UNE SEUL FOIS 

  //************************************************************** */

    const handleChange = (event, newValue) => {
      setValue(newValue); 
    };
  
   //**************************************************************/

  return (

    <div className={classes.container}>
      <Paper className={classes.root} elevation={5} >
        <AppBar position="static" className={classes.AppBar}>
          
        {/*The App Bar displays information and actions relating to the current screen*/}
          <Tabs
            value={value}
            variant="fullWidth"
            onChange={handleChange}
            indicatorColor="primary"
          >
            <Tab label="Questionnaire" {...a11yProps(0)} />
          </Tabs>

          
        </AppBar>
            

      {/********************************TAB_ACTUALITE***********************************/}
        <TabPanel value={value} index={0}>
        <TableContainer className={classes.container}>
            <TextField 
            placeholder="chercher..." 
            variant="standard"
              onChange={e => {
                const timerId = setTimeout(() => {
                  setSearch(e.target.value);
                }, 500);
                return () => {
                  clearTimeout(timerId);
                };
              }}
              size="small"
              className={classes.search}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />

        {/****************************QUESTIONS*****************************/}
            <Table className={classes.table}>
              <TableHead>
               
                  <TableRow>
                    {Columns.map(Columns => {
                      return (
                        <TableCell key={Columns.id}>
                          
                          <b> {Columns.label} </b>
                        </TableCell>
                      );
                    })}
                  </TableRow>
             
              </TableHead>

              <TableBody>
                {(rowsPerPage > 0
                  ? searchData.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : searchData
                ).map((data, index) => (
                  <TableRow key={index}>
                    <TableCell width="400"> {data.Sujet} </TableCell>
                    <TableCell width="200"> {data !== undefined  ? data.Etudiant !==  undefined ? data.Etudiant !==  null ? data.Etudiant.Nom_prénom :"" :"": ""} </TableCell>
                    <TableCell width="200"> {data !== undefined  ? data.Conseiller !==  undefined ? data.Conseiller !==  null ? data.Conseiller.Nom_prénom :"" :"": ""} </TableCell>
                    {/* <TableCell width="200"> {data.updatedAt} </TableCell> */}
                      
                    <TableCell>
                      <Button width="200"
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          setOpenPopupAffiche(true);
                          setDataAffichage(data);
                        }}
                      >
                      <i class="fas fa-info-circle"></i>
                      </Button>
                    </TableCell>

                        <TableCell width="200">
                          <Button 
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              setOpenPopupedelete(true);
                              setEdit(data);
                            }}
                          >
                      <i class="fas fa-eraser"></i>
                          </Button>
                        </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 25]}
            component="div"
            count={searchData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />

        </TabPanel>
      </Paper>

      <PopupAffiche
        OpenPopupAffiche={OpenPopupAffiche}
        setOpenPopupAffiche={setOpenPopupAffiche}
        data={DataAffichage}
      ></PopupAffiche>

      <Popupedelete
        openPopupedelete={openPopupedelete}
        setOpenPopupedelete={setOpenPopupedelete}
        data={Edit._id}
      ></Popupedelete>

      </div>
  );
    }
  

export default Questions;