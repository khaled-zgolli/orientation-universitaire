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
import Popupadd from "./Popup_membres/Popupadd";
import Popupeditadmin from "./Popup_membres/Popupeditadmin";
import Popupeditetud from "./Popup_membres/Popupeditetud";
import Popupeditcons from "./Popup_membres/Popueditcons";
import PopupeditconsFav from "./Popup_membres/PopueditconsFav";
import PopupedeleteAdmin from "./Popup_membres/PopuedeleteAdmin";
import PopupedeleteEtud from "./Popup_membres/PopuedeleteEtud";
import PopupedeleteCons from "./Popup_membres/PopuedeleteCons";
import axios from "axios";


//************************ */
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
        <Box p={3}>
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

// ***************************************************************//

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
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(5),
    marginBottom: theme.spacing(4),
  },
  ajout: {
    marginLeft: theme.spacing(92),
  },
  img: {
    width: "100px",
    height: "100px",
    marginRight: theme.spacing(2),
    borderRadius: "100%"

  }
}));

/*************************************************************************/
const columns = [
  {id: "nom", label: "NOM ET PRENOM"},
  {id: "email", label: "EMAIL"},
  {id: "date d'inscription", label: "DATE D'INSCRIPTION"},
  {id: "Modifier", label: "MODIFIER"},
  {id: "Supprimer", label: "SUPPRIMER"}
];
// ********************************************************************/
const columnsetud = [
  { id: "image", label: "IMAGE"},
  { id: "nom", label: "NOM COMPLET"},
  { id: "email", label: "EMAIL"},
  { id: "Niveau d'étude", label: "NIVEAU D'ETUDE" },
  { id: "status", label: "STATUTS" },
  { id: "Modifier", label: "MODIFIER" },
  { id: "Supprimer", label: "SUPPRIMER" },
];
/***********************************************************************/
const columnscons = [
  { id: "image", label: "IMAGE"},
  { id: "nom", label: "NOM COMPLET"},
  { id: "email", label: "EMAIL"},
  { id: "status", label: "STATUTS" },
  { id: "Modifier", label: "MODIFIER" },
  { id: "Favoris", label: "FAVORIS" },
  { id: "Supprimer", label: "SUPPRIMER" },

];

// *****************************CONST****************************//

function Membres() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopupedeleteAdmin, setOpenPopupedeleteAdmin] = useState(false);
  const [openPopupedeleteEtud, setOpenPopupedeleteEtud] = useState(false);
  const [openPopupedeleteCons, setOpenPopupedeleteCons] = useState(false);
  const [openPopupeditadmin, setOpenPopupeditadmin] = useState(false);
  const [openPopupeditetud, setOpenPopupeditetud] = useState(false);
  const [openPopupeditcons, setOpenPopupeditcons] = useState(false);
  const [openPopupeditconsFav, setOpenPopupeditconsFav] = useState(false);
  const [editAdmin,setEditAdmin] = useState({});
  const [editEtud, setEditEtud] = useState({});
  const [editCons, setEditCons] = useState({});



  //**************************ADMIN_DATA****************************************/
  const [adminData , setAdminData] = useState([]);

  useEffect(() => {
    const getAdminData = async () => {
      await axios
        .get("http://localhost:4000/api/data/admin")
        .then(response => {
          const data = response.data;
         
          setAdminData(data); 
          setSearchData(data); 
        })
        .catch(err => {
          console.log(err);
        });
    };

    getAdminData();  
  }, []); //UNE SEUL FOIS 

    //**************************ETUD_DATA****************************************/
    const [datasetud, setetudData] = useState([]);
  

    useEffect(() => {
      const getetudData = async () => {
        await axios
          .get("http://localhost:4000/api/data/etudiant")
          .then(response => {
            const data = response.data;
           
            setetudData(data); 
            setSearchDataEtud(data); 
          })
          .catch(err => {
            console.log(err);
          });
      };
  
      getetudData(); //exection 
    }, []); //UNE SEUL FOIS 

    
  //**************************CONS_DATA****************************************/
  const [datascons, setconsData] = useState([]);

  useEffect(() => {
    const getconsData = async () => {
      await axios
        .get("http://localhost:4000/api/data/conseiller")
        .then(response => {
          const data = response.data;
         
          setconsData(data); 
          setSearchDataCons(data); 
        })
        .catch(err => {
          console.log(err);
        });
    };

    getconsData(); //exection 
  }, []); //UNE SEUL FOIS 
  
  //*****************************ADMIN_PAGES************************************/
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //***************************ETUDIANT_PAGES**********************************/
  const [pageEtud, setPageEtud] = React.useState(0);
  const [rowsPerPageEtud, setRowsPerPageEtud] = React.useState(5);

  const handleChangePageEtud = (event, newPage) => {
    setPageEtud(newPage);
  };

  const handleChangeRowsPerPageEtud = event => {
    setRowsPerPageEtud(parseInt(event.target.value, 10));
    setPageEtud(0);
  };

  /*********************************CONSEILLER_PAGES***************************** */
  const [pageCons, setPageCons] = React.useState(0);
  const [rowsPerPagCons, setRowsPerPageCons] = React.useState(5);

  const handleChangePageCons = (event, newPage) => {
    setPageCons(newPage);
  };

  const handleChangeRowsPerPageCons = event => {
    setRowsPerPageCons(parseInt(event.target.value, 10));
    setPageCons(0);
  };

  //******************************ADMIN_SEARCH************************************************** */

  const [search, setSearch] = useState("");
  const [searchDatas, setSearchData] = useState(adminData);

  useEffect(() => {
    if (search === "") {
      setSearchData(adminData);
    } else {
      setSearchData(
        adminData.filter(val => {
          return val.Nom_prénom.toLowerCase().includes(search.toLowerCase());
        })
      );
    }
  }, [search, adminData]);

  //******************************ETUDIANT_SEARCH************************************************ */

  const [searchEtud, setSearchEtud] = useState("");
  const [searchDatasEtud, setSearchDataEtud] = useState(datasetud);

  useEffect(() => {
    if (searchEtud === "") {
      setSearchDataEtud(datasetud);
    } else {
      setSearchDataEtud(
        datasetud.filter(val => {
          return val.Nom_prénom.toLowerCase().includes(searchEtud.toLowerCase());
        })
      );
    }
  }, [searchEtud , datasetud]);

  /******************************CONSEILLER_SEARCH**************************************************** */

  const [searchCons, setSearchCons] = useState("");
  const [searchDatasCons, setSearchDataCons] = useState(datascons);

  useEffect(() => {
    if (searchCons === "") {
      setSearchDataCons(datascons);
    } else {
      setSearchDataCons(
        datascons.filter(val => {
          return val.Nom_prénom.toLowerCase().includes(searchCons.toLowerCase());
        })
      );
    }
  }, [searchCons, datascons]);

  /***************************************************************************/
    var jsonString = localStorage.getItem("user");
    var user = JSON.parse(jsonString);
  /****************************************************************************/
   const handleChange = (event, newValue) => {
    setValue(newValue); 
  };
   /**************************************************************** */

  return (

    <div className={classes.container}>
      <Paper className={classes.root} elevation={5}>
        <AppBar position="static" className={classes.AppBar}>
          
        {/*The App Bar displays information and actions relating to the current screen*/}
          <Tabs
            value={value}
            variant="fullWidth"
            onChange={handleChange}
            indicatorColor="primary"
          >
            <Tab label="Admin" {...a11yProps(0)} />
            <Tab label="Etudiant" {...a11yProps(1)} />
            <Tab label="Conseiller" {...a11yProps(2)} />
          </Tabs>
        </AppBar>

        {/********************************TAB_ADMIN***********************************/}
        <TabPanel value={value} index={0}>
          <TableContainer className={classes.container}>
            <TextField placeholder="chercher..." variant="standard"
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
      {/**************************** SUPER_ADMIN_ADD*****************************/}
             
              <Button
                variant="contained"
                color="primary"
                className={classes.ajout}
                onClick={() => {
                  setOpenPopup(true);
                }}
              >
                <i class="fas fa-user-plus"></i> &ensp; Ajouter un admin
              </Button>
           
            <Table className={classes.table}>
              <TableHead>

                  <TableRow>

                    {columns.map(column => {
                      return (
                        <TableCell key={column.id}>
                          
                          <b> {column.label} </b>
                        </TableCell>
                      );
                    })}
                  </TableRow>
               
              </TableHead>

              <TableBody>
                {(rowsPerPage > 0
                  ? searchDatas.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : searchDatas
                ).map((data, index) => (
                  <TableRow key={index}>
                    <TableCell> {data.Nom_prénom} </TableCell>
                    <TableCell> {data.email} </TableCell>
                    <TableCell> {data.createdAt} </TableCell>
                 
                        <TableCell>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                              setOpenPopupeditadmin(true);
                              setEditAdmin(data);
                            }}
                          >
                            <i class="fas fa-user-edit"></i>
                          </Button>
                        </TableCell>
                        <TableCell>
                        
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              setOpenPopupedeleteAdmin(true);
                              setEditAdmin(data);
                            }}
                          >
                            <i class="fas fa-user-minus"></i>
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
            count={searchDatas.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </TabPanel>

        {/**************************TAB_ETUDIANT**********************************/}
        <TabPanel value={value} index={1}>
          <TableContainer className={classes.container}>
            <TextField
              onChange={e => {
                const timerId = setTimeout(() => {
                  setSearchEtud(e.target.value);
                }, 500);

                return () => {
                  clearTimeout(timerId);
                };
              }}
              placeholder="chercher..."
              variant="standard"
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
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  {columnsetud.map(columnsetud => {
                    return (
                      <TableCell key={columnsetud.id}>
                        
                        <b> {columnsetud.label} </b>
                      
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>

              <TableBody>
                {(rowsPerPageEtud > 0 ? searchDatasEtud.slice( pageEtud * rowsPerPageEtud, pageEtud * rowsPerPageEtud + rowsPerPageEtud )
                : searchDatasEtud
                ).map((data, index) => (
                  <TableRow key={index}>
                    <TableCell width="100"><img src={data.img} alt="img" className={classes.img}/>
                    </TableCell>
                    <TableCell width="100"> {data.Nom_prénom} </TableCell>
                    <TableCell width="100"> {data.email} </TableCell>
                    <TableCell width="100"> {data.dataNiveau.Niveau} </TableCell>
                    <TableCell width="10"> {data.status} </TableCell>
                    <TableCell width="10">
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          setOpenPopupeditetud(true);
                          setEditEtud(data);
                        }}
                      >
                        <i class="fas fa-user-edit"></i>
                      </Button>
                    </TableCell>
                    <TableCell width="10">
                      
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          setOpenPopupedeleteEtud(true);
                          setEditEtud(data);
                        }}
                      >
                        <i class="fas fa-user-minus"></i>
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
            count={searchDatasEtud.length}
            rowsPerPage={rowsPerPageEtud}
            page={pageEtud}
            onChangePage={handleChangePageEtud}
            onChangeRowsPerPage={handleChangeRowsPerPageEtud}
          />
        </TabPanel>

        {/*****************************TAB_CONSEILLER*******************************/}
        <TabPanel value={value} index={2}>
          <TableContainer className={classes.container}>
            <TextField
              onChange={e => {
                const timerId = setTimeout(() => {
                  setSearchCons(e.target.value);
                }, 500);

                return () => {
                  clearTimeout(timerId);
                };
              }}
              placeholder="chercher..."
              variant="standard"
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
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  {columnscons.map(columnscons => {
                    return (
                      <TableCell key={columnscons.id}>
                        
                        <b> {columnscons.label} </b>
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPagCons > 0
                  ? searchDatasCons.slice( pageCons * rowsPerPagCons, pageCons * rowsPerPagCons + rowsPerPagCons )
                  : searchDatasCons
                ).map((data, index) => (
                  <TableRow key={index}>
                    <TableCell width="150"><img src={data.img} alt="img" className={classes.img}/>
                    </TableCell>
                    <TableCell width="150"> {data.Nom_prénom} </TableCell>
                    <TableCell width="150"> {data.email} </TableCell>
                    <TableCell width="150"> {data.status} </TableCell>

                    <TableCell>
                      
                    <Button width="80"
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          setOpenPopupeditcons(true);
                          setEditCons(data);
                        }}
                      >                        
                      <i class="fas fa-user-edit"></i>
                      </Button>
                    </TableCell>
                    <TableCell>
                    <Button width="80"
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          setOpenPopupeditconsFav(true);
                          setEditCons(data);
                        }}
                      >
                    <i class="fas fa-heart"></i>
                      </Button>
                    </TableCell>
                    <TableCell>

                    <Button width="80"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          setOpenPopupedeleteCons(true);
                          setEditCons(data);
                        }}
                      >
                      <i class="fas fa-user-minus"></i>
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
            count={searchDatasCons.length}
            rowsPerPage={rowsPerPagCons}
            page={pageCons}
            onChangePage={handleChangePageCons}
            onChangeRowsPerPage={handleChangeRowsPerPageCons}
          />
        </TabPanel>
      </Paper>

      {/***************************POPUP*********************************/}
          <Popupadd 
            openPopup={openPopup} 
            setOpenPopup={setOpenPopup}
          ></Popupadd>

          <Popupeditadmin
            openPopupeditadmin={openPopupeditadmin}
            setOpenPopupeditadmin={setOpenPopupeditadmin}
            data={editAdmin} 
          ></Popupeditadmin>

          <Popupeditetud
            openPopupeditetud={openPopupeditetud}
            setOpenPopupeditetud={setOpenPopupeditetud}
            data={editEtud}
          ></Popupeditetud>

          <Popupeditcons
            data={editCons}
            openPopupeditcons={openPopupeditcons}
            setOpenPopupeditcons={setOpenPopupeditcons}
          ></Popupeditcons>

          <PopupeditconsFav
            data={editCons}
            openPopupeditconsFav={openPopupeditconsFav}
            setOpenPopupeditconsFav={setOpenPopupeditconsFav}
          ></PopupeditconsFav>

          <PopupedeleteAdmin
            data={editAdmin._id}
            openPopupedeleteAdmin={openPopupedeleteAdmin}
            setOpenPopupedeleteAdmin={setOpenPopupedeleteAdmin}
          ></PopupedeleteAdmin>

          <PopupedeleteEtud
            data={editEtud._id}
            openPopupedeleteEtud={openPopupedeleteEtud}
            setOpenPopupedeleteEtud={setOpenPopupedeleteEtud}
          ></PopupedeleteEtud>

          <PopupedeleteCons
            data={editCons._id}
            openPopupedeleteCons={openPopupedeleteCons}
            setOpenPopupedeleteCons={setOpenPopupedeleteCons}
          ></PopupedeleteCons>
        </div>
  );
}

export default Membres;
