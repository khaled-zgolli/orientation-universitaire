import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Button, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import Popupeditedit_article from './Popup_articles/Popupedit_article'
import Popupedelete_Article from "./Popup_articles/Popupdelete_articles";
import PopupedeleteAE from "./Popup_articles/PopupDelete";

import Swal from 'sweetalert2';
import PopupAffiche from './Popup_articles/PopupDetails'

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
        <Box p={2}>
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
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(5),
    marginBottom: theme.spacing(4),
  },
  ajout: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(90),
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
  { id: "Image", label: "Image" },
  { id: "Sujet", label: "Sujet" },
  { id: "Auteur", label: "Auteur" },
  { id: "Date creation", label: "Date creation" },
  { id: "Date modifié", label: "Date modifié" },
  { id: "Détails", label: "Détails" },
  { id: "Supprimer", label: "Supprimer" },
];
/****************************************************************************** */

const ColumnsDemande = [
  { id: "Image", label: "Image" },
  { id: "Sujet", label: "Sujet" },
  { id: "Auteur", label: "Auteur" },
  { id: "Date creation", label: "Date creation" },
  { id: "Date modifié", label: "Date modifié" },
  { id: "Valider", label: "Valider" },
  { id: "Refuser", label: "Refuser" },
  { id: "Détails", label: "Détails" },
  { id: "Supprimer", label: "Supprimer" },

];
/****************************************************************************** */

function Articles() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopupedit, setOpenPopupedit] = useState(false);
  const [openPopupedelete, setOpenPopupedelete] = useState(false);  
  const [openPopupedeleteE, setOpenPopupedeleteE] = useState(false);
  const [Edit, setEdit] = useState({});
  const [OpenPopupAffiche, setOpenPopupAffiche] = useState(false);

  //*****************************ARTICLE_PAGES************************************/
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [pageDemande, setPageDemande] = React.useState(0);
  const [rowsPerPageDemande, setRowsPerPageDemande] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const handleChangePageDemande = (event, newPage) => {
    setPageDemande(newPage);
  };

  const handleChangeRowsPerPageDemande = event => {
    setRowsPerPageDemande(parseInt(event.target.value, 10));
    setPageDemande(0);
  };
  
  //******************************ARTICLE_SEARCH************************************************** */
  const [articleData, setArticleData] = useState([{}]);
  const [DataAffichage , setDataAffichage] = useState([{}])
  const [articleDataAffichage, setArticleDataAffichage] = useState([{}]);

  console.log(articleDataAffichage);


  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState(articleData);

 

  

  const [searchArticle, setSearchArticle] = useState("");
  const [searchDataArticle, setSearchDataArticle] = useState(articleDataAffichage);

  

  useEffect(() => {
    if (searchArticle === "") {
      setSearchDataArticle(articleDataAffichage);
    } else {
      setSearchDataArticle(
        articleDataAffichage.filter(val => {
          return val.Sujet.toLowerCase().includes(searchArticle);
        })
      );
    }
  }, [searchArticle, articleDataAffichage]);


  useEffect(() => {
    if (search === "") {
      setSearchData(articleData);
    } else {
      setSearchData(
        articleData.filter(val => {
          return val.Sujet.toLowerCase().includes(search);
        })
      );
    }
  }, [search, articleData]);

  //**************************Article_DATA****************************************/

  useEffect(() => {
    const getData = async () => {
      await axios
        .get("http://localhost:4000/api/data/getArticles")
        .then(response => {
          const data = response.data;

          setArticleData(data);
           setSearchData(data);

        })
        .catch(err => {
          console.log(err);
        });
    };

    getData();
  }, []); //UNE SEUL FOIS

  
 

  //**************************Article_DATA etudiant****************************************/

  useEffect(() => {
    const getdataEtud = async () => {
      await axios
        .get("http://localhost:4000/api/data/getArticlesEtudAll")
        .then(response => {
          const dataEud = response.data;

          setArticleDataAffichage(dataEud);
           setSearchDataArticle(dataEud);

        })
        .catch(err => {
          console.log(err);
        });
    };

    getdataEtud();
  }, []); //UNE SEUL FOIS



  //**************************************************************/

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

     //**************************************************************/


     
    console.log(searchDataArticle);

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
            <Tab label="Articles Conseiller" {...a11yProps(0)} />
            <Tab label="Articles Etudiant" {...a11yProps(1)} />
          </Tabs>
        </AppBar>

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
                    <TableCell width="200"><img src={data.Image} alt="img" className={classes.img} />
                    </TableCell>
                    <TableCell width="150"> {data.Sujet} </TableCell>                    
                    <TableCell width="100"> {data !== undefined  ? data.AuteurCons !==  undefined ? data.AuteurCons !==  null ? data.AuteurCons.Nom_prénom :"" :"": ""} </TableCell>
                    <TableCell width="200"> {data.createdAt} </TableCell>
                    <TableCell width="200"> {data.updatedAt} </TableCell>


                    <TableCell>
                      <Button width="180"
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
        {/* //******************************************************************************************************* */}

        <TabPanel value={value} index={1}>
          <TableContainer className={classes.container}>
          <TextField
              placeholder="chercher..."
              variant="standard"
              onChange={e => {
                const timerId = setTimeout(() => {
                  setSearchArticle(e.target.value);
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
          <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  {ColumnsDemande.map(ColumnsDemande => {
                    return (
                      <TableCell key={ColumnsDemande.id}>
                        <b> {ColumnsDemande.label} </b>
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>

              <TableBody>
                {(rowsPerPageDemande > 0
                  ? searchDataArticle.slice(
                      pageDemande * rowsPerPageDemande,
                      pageDemande * rowsPerPageDemande + rowsPerPageDemande
                    )
                  : searchDataArticle
                ).map((dataEud, index) => (
                  <TableRow key={index}>
                    <TableCell width="200"><img src={dataEud.Image} alt="img" className={classes.img} />
                    </TableCell>

                    <TableCell width="200"> {dataEud.Sujet} </TableCell>
                    <TableCell width="100"> {dataEud !== undefined  ? dataEud.AuteurEtud !==  undefined ? dataEud.AuteurEtud !==  null ? dataEud.AuteurEtud.Nom_prénom :"" :"": ""} </TableCell>
                    <TableCell width="200"> {dataEud.createdAt} </TableCell>
                    <TableCell width="200"> {dataEud.updatedAt} </TableCell>

                


           {  dataEud.modifié === "M" && dataEud.affichage === "NA" ?

                     (<TableCell>
                      <Button width="180"
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          axios({
                            url: 'http://localhost:4000/api/data/acceptArticlesEtud',
                            method: 'PUT',
                            data: {
                              _id: dataEud._id
                            },
                          }).then(()=>{
                            Swal.fire({
                              icon: "success",
                              title: "Envoyé",
                              html: '<span style="color:#FFFFFF"> </span>',
                              showCloseButton: false,
                              showConfirmButton: false,
                              background: "black",
                              timer: 2000,
                          })  
                          setTimeout(() => {
                            window.location.reload();
                          }, 1000); 
                          })
                        }}

                      >
                    <i class="fas fa-check-circle"></i>
                      </Button>
                    </TableCell>)
                        : <TableCell>

                        </TableCell>
                     }              


          {  dataEud.modifié === "M" && dataEud.affichage === "NA" ?

                   ( <TableCell>
                      <Button width="180"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          axios({
                            url: 'http://localhost:4000/api/data/refusArticlesEtud',
                            method: 'PUT',
                            data: {
                              _id: dataEud._id
                            },
                          }).then(()=>{
                            Swal.fire({
                              icon: "success",
                              title: "Envoyé",
                              html: '<span style="color:#FFFFFF"> </span>',
                              showCloseButton: false,
                              showConfirmButton: false,
                              background: "black",
                              timer: 2000,
                          })  
                          setTimeout(() => {
                            window.location.reload();
                          }, 1000); 
                          })
                        }}

                      >
                    <i class="fas fa-times-circle"></i>
                      </Button>
                    </TableCell>)
                      :  <TableCell>
                          
                        </TableCell>
                        }      

                     <TableCell>
                      <Button width="180"
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          setOpenPopupAffiche(true);
                          setDataAffichage(dataEud);
                        }}
                      >
                      <i class="fas fa-info-circle"></i>
                      </Button>
                    </TableCell> 
                    <TableCell>
                      <Button width="180"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          setOpenPopupedeleteE(true);
                          setEdit(dataEud);
                        }}
                      >
                    <i class="fas fa-minus-circle"></i>
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
            count={searchDataArticle.length}
            rowsPerPage={rowsPerPageDemande}
            page={pageDemande}
            onChangePage={handleChangePageDemande}
            onChangeRowsPerPage={handleChangeRowsPerPageDemande}
          />
        </TabPanel>
      </Paper>


      {/***************************POPUP*********************************/}
          <Popupeditedit_article 
        openPopupedit={openPopupedit} 
        setOpenPopupedit={setOpenPopupedit}
        data={Edit}
      ></Popupeditedit_article>

      <Popupedelete_Article
        openPopupedelete={openPopupedelete}
        setOpenPopupedelete={setOpenPopupedelete}
        data={Edit._id}
      ></Popupedelete_Article>
      

      <PopupedeleteAE
        openPopupedeleteE={openPopupedeleteE}
        setOpenPopupedeleteE={setOpenPopupedeleteE}
        data={Edit._id}
      ></PopupedeleteAE>

      
        <PopupAffiche
        OpenPopupAffiche={OpenPopupAffiche}
        setOpenPopupAffiche={setOpenPopupAffiche}
        data={DataAffichage}
      ></PopupAffiche>


     
     

    </div>
  );
}

export default Articles;
