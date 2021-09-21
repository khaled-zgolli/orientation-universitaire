import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {Button, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import Popupadd_actualites from "./Popup_actualités/Popupadd_actualites";
import Popupedit_actualites from "./Popup_actualités/Popupedit_actualites";
import Popupedelete_Actualite from "./Popup_actualités/Popupdelete_actualites";
import axios from "axios";



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
    objectFit: 'cover',
    width: '150px',
    height: '80px',
    marginRight: theme.spacing(2),
  },
}));


/*************************************************************************/
const Columns = [
  {id: "Image", label: "Image"},
  {id: "Titre", label: "Titre"},
  {id: "Date", label: "Date"},
  {id: "Source", label: "Source"},
  {id: "Modifier", label: "Modifier"},
  {id: "Supprimer", label: "Supprimer"}
];

/****************************************************************************** */

function Actualités() {

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopupedit, setOpenPopupedit] = useState(false);
  const [openPopupedelete, setOpenPopupedelete] = useState(false);
  const [Edit, setEdit] = useState({});


  //*****************************ACTUALTE_PAGES************************************/
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  //******************************ACTUALITE_SEARCH************************************************** */
  const [actualiteData , setActualitesData] = useState([]);

  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState(actualiteData);



  useEffect(() => {
    if (search === "") {
      setSearchData(actualiteData);
    } else {
      setSearchData(
        actualiteData.filter(val => {
          return val.Titre.toLowerCase().includes(search);
        })
      );
    }
  }, [search , actualiteData]);



  //**************************ACTUALITE_DATA****************************************/

  useEffect(() => {
    const getData = async () => {
      await axios
        .get("http://localhost:4000/api/data/getactualites")
        .then(response => {
          const data = response.data;
         
          setActualitesData(data); 
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
            <Tab label="Actualités" {...a11yProps(0)} />
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
               {/****************************ACTUALITE_ADD*****************************/}
            
              <Button
                variant="contained"
                color="primary"
                className={classes.ajout}
                onClick={() => {
                  setOpenPopup(true);
                }}
              >
               <i class="fas fa-file"></i>  &ensp; Ajouter une actualité
              </Button>

        {/****************************ACTUALITE*****************************/}
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
                    <TableCell width="200"> <img src={data.img} alt="img" className={classes.img} /></TableCell>
                    <TableCell width="200"> {data.Titre} </TableCell>
                    <TableCell width="200"> {data.createdAt} </TableCell>
                    <TableCell width="200"> {data.Source} </TableCell>
                      
                        <TableCell>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                              setOpenPopupedit(true);
                              setEdit(data);
                            }}
                          >
                       <i class="fas fa-edit"></i>
                          </Button>
                        </TableCell>

                        <TableCell>
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

      <Popupadd_actualites 
        openPopup={openPopup} 
        setOpenPopup={setOpenPopup}
      ></Popupadd_actualites>

      <Popupedit_actualites 
        openPopupedit={openPopupedit} 
        setOpenPopupedit={setOpenPopupedit}
        data={Edit}
      ></Popupedit_actualites>

      <Popupedelete_Actualite
        openPopupedelete={openPopupedelete}
        setOpenPopupedelete={setOpenPopupedelete}
        data={Edit._id}
      ></Popupedelete_Actualite>

      </div>
  );
    }

export default Actualités;