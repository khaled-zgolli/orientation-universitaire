import {
  FormControl,
  TextField,
  InputAdornment,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 6,
    backgroundColor: "rgba(248, 250, 178, 0.59)",
    margin: "8px",
  },
  AppBar: {
    backgroundColor: "#FFC92F",
    color: "white",
  },
  container: {
    maxHeight: 500,
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
  textField: {
    width: "200px",
    marginTop: "20px",
    marginBottom: "20px",
    marginRight: "10px",
    marginLeft: "30px",
  },
}));

const countOccurrences = (arr, val) =>
  arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

/*************************************************************************/
const Columns = [
  { id: "universite", label: "Universite" },
  { id: "Etablissement", label: "Etablissement" },
  { id: "ville", label: "ville" },
  { id: "diplome", label: "Diplome" },
  { id: "domaine", label: "Domaine" },
  { id: "Filière", label: "Filière" },
  { id: "section", label: "Section" },
  { id: "score", label: "Score" },
];

export default function Domaine(props) {
  const [datas, setDatas] = useState([
    {
      ville: "",
      filière: [
        {
          section: [{ sectionName: "", score: "" }],
          diplome: "",
          domaine: "",
          filièreNom: "",
        },
      ],
      nom: "",
    },
  ]);

  const [searchDatas, setSearchData] = useState(datas);
  const [a, seta] = useState([{ diplome: "" }]);

  const [searchEtabDispaly, setSearchEtabDisplay] = useState("none");
  const [searchDipDispaly, setSearchDipDisplay] = useState("none");
  const [searchFilDispaly, setSearchFilDisplay] = useState("none");
  const [searchSecDispaly, setSearchSecDisplay] = useState("none");

  const [etab, setEtab] = useState("");
  const [dip, setDip] = useState("");
  const [filiere, setFiliere] = useState("");
  const [section, setSection] = useState("");

  let repeatSec = [""];
  // let repeatVille = [""];
  let repeatDip = [""];
  let repeatFil = [""];
  let repeatetab = [""];
  useEffect(() => {
    const getConsdData = async () => {
      let search = "";
      if (props.location.pathname === "/domaine/Littérature") {
        search = "Littérature, langues et classes préparatoires littéraires";
      }
      if (props.location.pathname === "/domaine/Tourisme") {
        search = "Tourisme, revitalisation, sports et éducation physique";
      }
      if (props.location.pathname === "/domaine/SciencesJuridiques") {
        search = "Sciences juridiques et politiques";
      }
      if (props.location.pathname === "/domaine/Culture") {
        search = "Culture, beaux-arts et arts";
      }
      if (props.location.pathname === "/domaine/Scienceséconomiques") {
        search = "Sciences économiques et de gestion";
      }
      if (props.location.pathname === "/domaine/SciencesEtTechnologie") {
        search = "Sciences et technologie";
      }
      if (props.location.pathname === "/domaine/Ingénierie") {
        search =
          "Ingénierie architecturale et classes préparatoires scientifiques";
      }
      if (props.location.pathname === "/domaine/Sciencesdelasanté") {
        search = "Sciences de la santé, médecine, dentisterie et pharmacie";
      }
      if (props.location.pathname === "/diplome/DiplômeNationalD'ingénieur") {
        search = "Diplôme national d'ingénieur";
      }
      if (props.location.pathname === "/domaine/SciencesAgronomiques") {
        search = "Sciences agronomiques, biotechnologies et environnement";
      }
      if (props.location.pathname === "/domaine/ÉducationMilitaire") {
        search = "Éducation militaire";
      }
      let aa = [];
      let fData = [];
      await axios({
        url: "http://localhost:4000/api/Affiche/ChercheEtablissementDomaine",
        method: "post",
        data: { domaine: search },
      }).then(res => {
        res.data.map(val => {
          return val.filière.map(x => {
            if (x.domaine === search) return aa.push(x);
          });
        });

        res.data.map(x => {
          const data = {
            _id : x._id,
            nom: x.nom,
            universite: x.universite,
            ville: x.ville,
            Description: x.Description,
            site: x.site,
            email: x.email,
            adress: x.adress,
            numero: x.numero,
            filière: aa,
          };
          fData.push(data);
        });
        setDatas(fData);

        seta(aa);
      });
    };

    getConsdData();
  }, [props.location.pathname]); //s

  useEffect(() => {
    if (etab === "") {
      setSearchData(datas);
    } else {
      setSearchData(
        datas.filter(val => {
          return val.nom.toLowerCase().includes(etab.toLowerCase());
        })
      );
    }
  }, [etab, datas]);

  useEffect(() => {
    if (dip === "") {
      setSearchData(datas);
    } else {
      let aa = [];
      datas.map(val => {
        const d = val.filière.filter(val => {
          return val.diplome.toLowerCase().includes(dip.toLowerCase());
        });

        if (d.length !== 0) {
          aa.push({
            nom: val.nom,
            universite: val.universite,
            ville: val.ville,
            Description: val.Description,
            site: val.site,
            email: val.email,
            adress: val.adress,
            numero: val.numero,
            filière: d,
          });
        }
      });

      setSearchData(aa);
    }
  }, [dip, datas, a]);

  useEffect(() => {
    if (filiere === "") {
      setSearchData(datas);
    } else {
      let aa = [];
      datas.map(val => {
        const d = val.filière.filter(val => {
          return val.filièreNom.toLowerCase().includes(filiere.toLowerCase());
        });

        if (d.length !== 0) {
          aa.push({
            nom: val.nom,
            universite: val.universite,
            ville: val.ville,
            Description: val.Description,
            site: val.site,
            email: val.email,
            adress: val.adress,
            numero: val.numero,
            filière: d,
          });
        }
      });

      setSearchData(aa);
    }
  }, [filiere, datas, a]);

  //***************************************************************** */

  useEffect(() => {
    if (section === "") {
      setSearchData(datas);
    } else {
      let aa = [];

      datas.map(val => {
        val.filière.map(sec => {
          const d = sec.section.filter(val => {
            return val.sectionName
              .toLowerCase()
              .includes(section.toLowerCase());
          });
          if (d.length !== 0) {
            aa.push({
              nom: val.nom,
              universite: val.universite,
              ville: val.ville,
              Description: val.Description,
              site: val.site,
              email: val.email,
              adress: val.adress,
              numero: val.numero,
              filière: [
                {
                  filièreNom: sec.filièreNom,
                  diplome: sec.diplome,
                  domaine: sec.domaine,
                  description: sec.description,
                  section: d,
                },
              ],
            });
          }
        });
      });
      setSearchData(aa);

      // return sec.filter(val => {
      //   val.sectionName.toLowerCase().includes(section.toLowerCase());
      // });
    }
  }, [section, datas, a]);

  console.log(a);

  const classes = useStyles();

  return (
    <>
      <Paper className={classes.root}>
        <FormControl
          size="small"
          variant="outlined"
          className={classes.textField}
        >
          <InputLabel>Type de recherche</InputLabel>
          <Select
            name="type"
            label="Type de recherche"
            onChange={e => {
              if (e.target.value === "Etablissement") {
                setSearchEtabDisplay("");
                setSearchSecDisplay("none");
                setSearchFilDisplay("none");
                setSearchDipDisplay("none");
                setDip("");
                setFiliere("");
                setSection("");
              }
              if (e.target.value === "Diplome") {
                setSearchDipDisplay("");
                setSearchSecDisplay("none");
                setSearchFilDisplay("none");
                setSearchEtabDisplay("none");
                setFiliere("");
                setSection("");
                setEtab("");
              }
              if (e.target.value === "Filière") {
                setSearchFilDisplay("");
                setSearchSecDisplay("none");
                setSearchDipDisplay("none");
                setSearchEtabDisplay("none");
                setDip("");
                setSection("");
                setEtab("");
              }
              if (e.target.value === "Section") {
                setSearchSecDisplay("");
                setSearchFilDisplay("none");
                setSearchDipDisplay("none");
                setSearchEtabDisplay("none");
                setDip("");
                setFiliere("");
                setEtab("");
              }
              if (e.target.value === "All") {
                setSearchSecDisplay("none");
                setSearchFilDisplay("none");
                setSearchDipDisplay("none");
                setSearchEtabDisplay("none");
                setDip("");
                setFiliere("");
                setSection("");
                setEtab("");
              }
            }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Etablissement">Etablissement</MenuItem>
            <MenuItem value="Diplome">Diplome</MenuItem>
            <MenuItem value="Filière">Filière</MenuItem>
            <MenuItem value="Section">Section</MenuItem>
          </Select>
        </FormControl>

        <FormControl
          size="small"
          variant="outlined"
          className={classes.textField}
          style={{ display: searchEtabDispaly }}
        >
          <InputLabel>Etablissement</InputLabel>
          <Select
            name="Etablissement"
            label="Etablissement"
            onChange={e => {
              setEtab(e.target.value);
            }}
          >
            {datas.map((data, index) => {
              repeatetab.push(data.nom);

              if (countOccurrences(repeatetab, data.nom) > 1) {
                return;
              }

              return (
                <MenuItem key={index} value={data.nom}>
                  {data.nom}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <FormControl
          size="small"
          variant="outlined"
          className={classes.textField}
          style={{ display: searchDipDispaly }}
        >
          <InputLabel>Diplome</InputLabel>
          <Select
            name="Diplome"
            label="Diplome"
            onChange={e => {
              setDip(e.target.value);
            }}
          >
            {datas.map((data, index) => {
              return data.filière.map(fil => {
                repeatDip.push(fil.diplome);

                if (countOccurrences(repeatDip, fil.diplome) > 1) {
                  return;
                }
                return (
                  <MenuItem key={index} value={fil.diplome}>
                    {fil.diplome}
                  </MenuItem>
                );
              });
            })}
          </Select>
        </FormControl>

        <FormControl
          size="small"
          variant="outlined"
          className={classes.textField}
          style={{ display: searchFilDispaly }}
        >
          <InputLabel>Filière</InputLabel>
          <Select
            name="Filière"
            label="Filière"
            onChange={e => {
              setFiliere(e.target.value);
            }}
          >
            {datas.map((data, index) => {
              return data.filière.map(fil => {
                repeatFil.push(fil.repeatFil);

                if (countOccurrences(repeatFil, fil.filièreNom) > 1) {
                  return;
                }
                return (
                  <MenuItem key={index} value={fil.filièreNom}>
                    {fil.filièreNom}
                  </MenuItem>
                );
              });
            })}
          </Select>
        </FormControl>

        <FormControl
          size="small"
          variant="outlined"
          className={classes.textField}
          style={{ display: searchSecDispaly }}
        >
          <InputLabel>Section</InputLabel>
          <Select
            name="Section"
            label="Section"
            onChange={e => {
              setSection(e.target.value);
            }}
          >
            {datas.map((data, index) => {
              return data.filière.map(fil => {
                return fil.section.map(sec => {
                  repeatSec.push(sec.sectionName);

                  if (countOccurrences(repeatSec, sec.sectionName) > 1) {
                    return;
                  }

                  return (
                    <MenuItem key={index} value={sec.sectionName}>
                      {sec.sectionName}
                    </MenuItem>
                  );
                });
              });
            })}
          </Select>
        </FormControl>

        <Table className={classes.table}>
          <TableHead
            style={{ backgroundColor: "rgba(0, 0, 0, 0.80)", color: "#FFFFFF" }}
          >
            <TableRow>
              {Columns.map(Columns => {
                return (
                  <TableCell key={Columns.id}>
                    <b style={{ color: "#FFC92F" }}> {Columns.label} </b>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {searchDatas.map((data, index) => (
              <TableRow key={index}>
                <TableCell width="50"> {data.universite} </TableCell>
                <TableCell width="50">
                  {" "}
                  <a href={`/Etablissement/${data._id}`}> {data.nom}</a>{" "}
                </TableCell>
                <TableCell width="50"> {data.ville} </TableCell>
                <TableCell width="50">
                  {data.filière.map(spec => {
                    return (
                      <TableRow>
                        <TableCell height={150}>{spec.diplome}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableCell>
                <TableCell width="50">
                  {data.filière.map(spec => {
                    return (
                      <TableRow>
                        <TableCell height={150}>{spec.domaine}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableCell>

                <TableCell width="150">
                  {data.filière.map(spec => {
                    return (
                      <TableRow>
                        <TableCell height={150}>{spec.filièreNom}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableCell>

                <TableCell width="100">
                  {data.filière.map(spec => {
                    return (
                      <TableRow>
                        <TableCell height={150}>
                          {spec.section.map(sec => {
                            return (
                              <>
                                {sec.sectionName} <br />
                              </>
                            );
                          })}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableCell>

                <TableCell width="50">
                  {data.filière.map(spec => {
                    return (
                      <TableRow>
                        <TableCell height={150}>
                          {spec.section.map(sec => {
                            return (
                              <>
                                {sec.score} <br />
                              </>
                            );
                          })}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}
