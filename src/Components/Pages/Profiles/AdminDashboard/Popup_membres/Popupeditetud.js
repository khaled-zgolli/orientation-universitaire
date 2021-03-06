import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  Divider,
  FormControl,
  FormHelperText,
  makeStyles,
  MenuItem,
  Paper,
  Typography,
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import TextField from "@material-ui/core/TextField";
import * as Yup from "yup";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import axios from "axios";
import Swal from "sweetalert2";

/*******************************STYLE**************************************** */
const useStyles = makeStyles(theme => ({
  paper: {
    width: "98%",
    height: "fit-content",
   
    marginLeft: "1%",
    marginTop: "1%",
  },
  typography: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(6),
  },
  botton: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(2),
    // paddingRight: theme.spacing(6),
  },
  image: {
    borderRadius: "100%",
    width: "150px",
    height: "150px",
    marginTop: "20px",
  },
  photo: {
    paddingLeft: theme.spacing(70),
  },
  textField: {
    width: "50%",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },

  bachelier: {
    width: "90%",
  },
  section: {
    width: "20%",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  acceptbox: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(46),
  },
  soumettre: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(70),
  },
  customizedButton: {
    position: 'absolute',
    left: '93%',
    top: '3%',
    backgroundColor: '',
    color: 'gray',
  }
}))



/***************************DONNEE_SANS_CONDITION****************************** */

const villes = [
  "Ariana",
  "B??ja",
  "Arous",
  "Bizerte",
  "Gabes",
  "Gafsa",
  "Jendouba",
  "Kairouan",
  "Kasserine",
  "Kebili",
  "La Manouba",
  "Le Kef",
  "Mahdia",
  "M??denine",
  "Monastir",
  "Nabeul",
  "Sfax",
  "Sidi Bouzid",
  "Siliana",
  "Sousse",
  "Tataouine",
  "Tozeur",
  "Tunis",
  "Zaghouan",
];

const domaines = [
  "Litt??rature, langues et classes pr??paratoires litt??raires",
  "Sciences humaines, sociales, religieuses et de l'??ducation",
  "Culture, beaux-arts et arts",
  "Tourisme, revitalisation, sports et ??ducation physique",
  "Sciences juridiques et politiques",
  "Sciences ??conomiques et de gestion",
  "Sciences et technologie",
  "Ing??nierie architecturale et classes pr??paratoires scientifiques",
  "Sciences de la sant??, m??decine, dentisterie et pharmacie",
  "Sciences agronomiques, biotechnologies et environnement",
  "??ducation militaire",
];

const diplomesCherche = [
  "deuxi??me licence",
  "Mast??re professionnel",
  "Mast??re recherche",
  "Dipl??me national d'ing??nieur",
];

export default function Popupeditetud(props) {
  const {openPopupeditetud, setOpenPopupeditetud, data} = props;


 
  /***********************STATE******************************** */
  const classes = useStyles();
  const fileInputRef = useRef();

  // const [etudData, setEtudData] = useState({
  //   Nom_pr??nom: "",
  //   Ville: "",
  //   img: "",
  //   dataNiveau: {
  //     Niveau: "",
  //     domaine: "",
  //     diplome: "",
  //     fili??re: "",
  //     section: "",
  //     score: "",
  //     specialite: "",
  //     domaineDip: "",
  //     diplomeDip: "",
  //   },
  // });

 


  const [image, setImage] = useState();
  const [preview, setPreview] = useState("");
  const [section, setSection] = useState([""]);
  const [sectionValue, setSectionValue] = useState( data ? data.dataNiveau ? data.dataNiveau.section :"" :"" );
  const [domaine, setDomaine] = useState(data ? data.dataNiveau ? data.dataNiveau.domaine :"" :"" );
  const [diplome, setDiplome] = useState([""]);
  const [diplomeValue, setDiplomeValue] = useState(data ? data.dataNiveau ? data.dataNiveau.diplome :"" :"" );
  const [fili??res, setFili??re] = useState([""]);
  const [fili??reValue, setFili??reValue] = useState(data ? data.dataNiveau ? data.dataNiveau.fili??re :"" :"" );

  const [diplomeCherche, setdiplomeCherche] = useState(data ? data.dataNiveau ? data.dataNiveau.diplomeDip :"" :"");
  const [domaineDip, setdomaineDip] = useState([""]);
  const [domaineDipValue, setdomaineDipValue] = useState(data ? data.dataNiveau ? data.dataNiveau.domaineDip :"" :"");

  const [specialite, setSpecialite] = useState([""]);
  const [specialiteValue, setSpecialiteValue] = useState("");

  /*****************************DIPLOME***************************/
  const literature = ["Licence", "Diplome classes pr??paratoires"];
  const Sciences_humaines = ["Licence"];
  const Culture = ["Licence"];
  const Tourisme = ["Licence"];
  const politiques = ["Licence"];
  const ??conomiques = ["Licence", "Bachelor of Business Administration"];
  const technologie = ["Licence"];
  const pr??paratoires = [
    "Architecture",
    "Licence",
    "Pr??pa-int??gr??",
    "Classe pr??paratoire",
  ];
  const sant?? = ["M??dicine", "Pharmacie", "Dentisterie", "licence"];
  const biotechnologies = ["Licence"];
  const militaire = ["Licence", "??tudes d'ing??nierie"];

  /*************************YUP*************************************** */
  const passeRegex = RegExp(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
  );
  
  const validationSchema = Yup.object().shape({
    email: Yup
    .string()
    .email("Email invalide")
    .required("champs obligatoire!"),
  
    // M_passe: Yup
    //   .string()
    //   .matches(passeRegex, "Entrer des caract??res alpha-num??rique")
    //   .required("champs obligatoire!"),
  
    // Confirm_M_passe: Yup
    // .string()
    // .oneOf([Yup.ref('M_passe'), null], 'les mots de passe doivent correspondre')
    // .required("champs obligatoire!"),
  
    nom: Yup.string().required("champs obligatoire"),

  //   ville: Yup.string().required("champs obligatoire"),

  //   niveauEtude: Yup.string().required("champs obligatoire"),

  //   domaine: Yup.string().when("niveauEtude", {
  //     is: "Bachelier",
  //     then: Yup.string().required("champs obligatoire"),
  //   }),

  //   diplome: Yup.string().when("domaine", {
  //     is: domaine,
  //     then: Yup.string().required("champs obligatoire"),
  //   }),

  //   fili??re: Yup.string().when("diplome", {
  //     is: diplomeValue,
  //     then: Yup.string().required("champs obligatoire"),
  //   }),

  //   section: Yup.string().when("fili??re", {
  //     is: fili??reValue,
  //     then: Yup.string().required("champs obligatoire"),
  //   }),

  //   score: Yup.number().when("section", {
  //     is: sectionValue,
  //     then: Yup.number()
  //       .typeError("score doit ??tre un nombre")
  //       .min(80, "Score invalide")
  //       .max(240, "Score invalide")
  //       .required("champs obligatoire"),
  //   }),

  //   diplomeCherche: Yup.string().when("niveauEtude", {
  //     is: "Dipl??m??",
  //     then: Yup.string().required("champs obligatoire"),
  //   }),

  //   domaineDip: Yup.string().when("diplomeCherche", {
  //     is: diplomeCherche,
  //     then: Yup.string().required("champs obligatoire"),
  //   }),

  //   specialite: Yup.string().when("domaineDip", {
  //     is: domaineDipValue,
  //     then: Yup.string().required("champs obligatoire"),
  //   }),
  //   status: Yup.string().required("champs obligatoire"),
  });

  useEffect(() => {
    if (
      domaine === "Litt??rature, langues et classes pr??paratoires litt??raires"
    ) {
      setDiplome(literature);
    }
    if (
      domaine === "Sciences humaines, sociales, religieuses et de l'??ducation"
    ) {
      setDiplome(Sciences_humaines);
    }
    if (domaine === "Culture, beaux-arts et arts") {
      setDiplome(Culture);
    }
    if (domaine === "Tourisme, revitalisation, sports et ??ducation physique") {
      setDiplome(Tourisme);
    }
    if (domaine === "Sciences juridiques et politiques") {
      setDiplome(politiques);
    }
    if (domaine === "Sciences ??conomiques et de gestion") {
      setDiplome(??conomiques);
    }
    if (domaine === "Sciences et technologie") {
      setDiplome(technologie);
    }
    if (
      domaine ===
      "Ing??nierie architecturale et classes pr??paratoires scientifiques"
    ) {
      setDiplome(pr??paratoires);
    }
    if (
      domaine === "Sciences de la sant??, m??decine, dentisterie et pharmacie"
    ) {
      setDiplome(sant??);
    }
    if (domaine === "Sciences agronomiques, biotechnologies et environnement") {
      setDiplome(biotechnologies);
    }
    if (domaine === "??ducation militaire") {
      setDiplome(militaire);
    }
  }, [domaine]);

  /***********************FILIERE*************************** */
  const litt??rature_Licence = [
    "Licence en arabe",
    "Licence en anglais",
    "Licence en fran??ais",
    "Licence en espagnole",
    "Licence en italienne",
    "Licence en Allemagne",
    "Licence en langues des signes",
    "Licence en traduction",
  ];

  const litt??rature_pr??pa = [
    "Classe pr??paratoire en arabe",
    "Classe pr??paratoire en anglais ",
    "Classe pr??paratoire en fran??ais",
  ];

  const Sc_humaine_licence = [
    "Licence en sociologie",
    "Licence en psychologie",
    "Licence en philosophie",
    "Licence en arch??ologie",
    "Licence en ??ducation",
  ];

  const Tourisme_licence = [
    "Licence en sciences des activit??s physiques et sportives",
    "Licence en tourisme",
  ];

  const Politique_licence = ["Licence en droit", "Licence en droit social"];

  const ??conomiques_licence = [
    "Licence en sciences ??conomiques",
    "Licence en sciences de gestion",
    "Licence en comptabilit?? et finance",
    "Licence en commerce et distribution",
  ];

  const ??conomiques_bachlor = ["Bachelor of Business Administration"];

  const technologie_licence = [
    "Licence en gestion de l'informatique",
    "licence en chimie",
    "Licence en chimie et physique",
    "Licence en physique",
    "Licence en physique et ??nergie",
    "Licence en math??matiques appliqu??es",
    "Licence en math??matiques",
    "Licence en biologie",
    "Licence en sciences de la Terre",
    "Licence en science informatique",
    "Licence en ing??nierie des syst??mes d'information",
    "Licence en g??nie civil",
    "Licence en g??nie m??canique",
    "Licence en technologies de l'information et de la communication",
    "Licence en g??nie logistique",
    "Licence en ??lectronique et automatisation",
  ];

  const architecturale = ["Architecture"];

  const sc_licence = ["Licence en construction et pr??paration"];

  const pr??pa_int??gr?? = [
    "pr??paratoire int??gr?? en g??nie biom??dical",
    "pr??paratoire int??gr?? en g??nie des biotechnologies de la sant??",
    "pr??paratoire int??gr?? en informatique",
    "pr??paratoire int??gr?? en physique-chimie et informatique",
  ];

  const pr??paratoire = [
    "pr??paratoire math??matiques-physique",
    "pr??paratoire chimie-physique",
    "pr??paratoire-technologie",
    "pr??paratoire biologie-g??ologie",
  ];

  const pharmacie = ["Dipl??me national de docteur en pharmacie"];

  const m??dicine = ["Dipl??me national de docteur en m??decine"];

  const dentisterie = ["Dipl??me national de docteur en m??decine dentaire"];

  const licence_sant?? = [
    "licence en biotechnologie m??dicale",
    "licence en anesth??sie et r??animation",
    "licence en imagerie m??dicale et radioth??rapie",
    "licence en protection de la sant??",
    "licence en biologie m??dicale",
    "licence en physioth??rapie",
    "licence en chirurgie orthop??dique",
    "licence en nutrition humaine",
    "licence en ergoth??rapie",
    "licence en Prosthodontie",
    "licence en g??nie biom??dical",
    "licence en soins d'urgence et en r??animation",
    "licence sciences infirmi??res-Femme",
    "licence sciences infirmi??res-homme",
    "licence en obst??trique-Sage-femme",
  ];

  const licence_agronomique = [
    "licence en biotechnologie",
    "licence en sciences agronomiques",
    "licence en sciences de la mer - Femme",
    "licence en sciences de la mer - homme",
    "licence en industries alimentaires",
  ];

  const licence_militaire = [
    "Sciences infirmi??res",
    "Anesth??sie et r??animation",
    "Sciences militaires",
    "Sciences juridiques et commerciales",
  ];

  const ing_militaire = [
    "Techniques d'armes",
    "Ing??nierie en informatique",
    "G??nie civil.",
    "Communications",
    "??lectrom??canicien",
    "Conduite d'avion",
    "g??nie m??canique",
    "T??l??m??canique",
    "A??romobile",
  ];

  const Culture_licence = [
    "Sciences musicales",
    "Th????tre et arts de la sc??ne",
    "Conception de l'espace",
    "Conception des produits",
    "Publicit?? et audiovisuel",
    "Arts et communication",
  ];

  useEffect(() => {
    if (
      domaine === "Litt??rature, langues et classes pr??paratoires litt??raires" &&
      diplomeValue === "Licence"
    ) {
      setFili??re(litt??rature_Licence);
    }
    if (
      domaine === "Litt??rature, langues et classes pr??paratoires litt??raires" &&
      diplomeValue === "Diplome classes pr??paratoires"
    ) {
      setFili??re(litt??rature_pr??pa);
    }
    if (
      domaine ===
        "Sciences humaines, sociales, religieuses et de l'??ducation" &&
      diplomeValue === "Licence"
    ) {
      setFili??re(Sc_humaine_licence);
    }
    if (
      domaine === "Tourisme, revitalisation, sports et ??ducation physique" &&
      diplomeValue === "Licence"
    ) {
      setFili??re(Tourisme_licence);
    }
    if (
      domaine === "Sciences juridiques et politiques" &&
      diplomeValue === "Licence"
    ) {
      setFili??re(Politique_licence);
    }
    if (
      domaine === "Sciences ??conomiques et de gestion" &&
      diplomeValue === "Licence"
    ) {
      setFili??re(??conomiques_licence);
    }
    if (
      domaine === "Sciences ??conomiques et de gestion" &&
      diplomeValue === "Bachelor of Business Administration"
    ) {
      setFili??re(??conomiques_bachlor);
    }
    if (domaine === "Sciences et technologie" && diplomeValue === "Licence") {
      setFili??re(technologie_licence);
    }
    if (
      domaine ===
        "Ing??nierie architecturale et classes pr??paratoires scientifiques" &&
      diplomeValue === "Architecture"
    ) {
      setFili??re(architecturale);
    }
    if (
      domaine ===
        "Ing??nierie architecturale et classes pr??paratoires scientifiques" &&
      diplomeValue === "Licence"
    ) {
      setFili??re(sc_licence);
    }
    if (
      domaine ===
        "Ing??nierie architecturale et classes pr??paratoires scientifiques" &&
      diplomeValue === "Pr??pa-int??gr??"
    ) {
      setFili??re(pr??pa_int??gr??);
    }
    if (
      domaine ===
        "Ing??nierie architecturale et classes pr??paratoires scientifiques" &&
      diplomeValue === "Classe pr??paratoire"
    ) {
      setFili??re(pr??paratoire);
    }
    if (
      domaine === "Sciences de la sant??, m??decine, dentisterie et pharmacie" &&
      diplomeValue === "M??dicine"
    ) {
      setFili??re(m??dicine);
    }
    if (
      domaine === "Sciences de la sant??, m??decine, dentisterie et pharmacie" &&
      diplomeValue === "Pharmacie"
    ) {
      setFili??re(pharmacie);
    }
    if (
      domaine === "Sciences de la sant??, m??decine, dentisterie et pharmacie" &&
      diplomeValue === "Dentisterie"
    ) {
      setFili??re(dentisterie);
    }
    if (
      domaine === "Sciences de la sant??, m??decine, dentisterie et pharmacie" &&
      diplomeValue === "licence"
    ) {
      setFili??re(licence_sant??);
    }
    if (
      domaine === "Sciences agronomiques, biotechnologies et environnement" &&
      diplomeValue === "Licence"
    ) {
      setFili??re(licence_agronomique);
    }
    if (domaine === "??ducation militaire" && diplomeValue === "Licence") {
      setFili??re(licence_militaire);
    }
    if (
      domaine === "??ducation militaire" &&
      diplomeValue === "??tudes d'ing??nierie"
    ) {
      setFili??re(ing_militaire);
    }
    if (
      domaine === "Culture, beaux-arts et arts" &&
      diplomeValue === "Licence"
    ) {
      setFili??re(Culture_licence);
    }
  }, [domaine, diplomeValue]);

  /*********************************SECTION**************************** */
  useEffect(() => {
    if (fili??reValue === "Licence en arabe") {
      setSection([
        "Lettre",
        "Math??matique",
        "Science expr??mentale",
        "Economie et gestion",
        "Science informatique",
      ]);
    }
    if (fili??reValue === "Licence en anglais") {
      setSection([
        "Lettre",
        "Math??matique",
        "Science expr??mentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (fili??reValue === "Licence en fran??ais") {
      setSection([
        "Lettre",
        "Math??matique",
        "Science expr??mentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (fili??reValue === "Licence en espagnole") {
      setSection([
        "Lettre",
        "Math??matique",
        "Science expr??mentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (fili??reValue === "Licence en italienne") {
      setSection([
        "Lettre",
        "Math??matique",
        "Science expr??mentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (fili??reValue === "Licence en Allemagne") {
      setSection([
        "Lettre",
        "Math??matique",
        "Science expr??mentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (fili??reValue === "Licence en langues des signes") {
      setSection([
        "Lettre",
        "Math??matique",
        "Science expr??mentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (fili??reValue === "Licence en traduction") {
      setSection([
        "Lettre",
        "Math??matique",
        "Science expr??mentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (fili??reValue === "Classe pr??paratoire en arabe") {
      setSection([
        "Lettre",
        "Math??matique",
        "Science expr??mentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (fili??reValue === "Classe pr??paratoire en anglais") {
      setSection([
        "Lettre",
        "Math??matique",
        "Science expr??mentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (fili??reValue === "Classe pr??paratoire en fran??ais") {
      setSection([
        "Lettre",
        "Math??matique",
        "Science expr??mentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (fili??reValue === "Licence en sociologie") {
      setSection([
        "Lettre",
        "Math??matique",
        "Science expr??mentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (fili??reValue === "Licence en psychologie") {
      setSection([
        "Lettre",
        "Math??matique",
        "Science expr??mentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (fili??reValue === "Licence en philosophie") {
      setSection([
        "Lettre",
        "Math??matique",
        "Science expr??mentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (fili??reValue === "Licence en arch??ologie") {
      setSection([
        "Lettre",
        "Math??matique",
        "Science expr??mentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (fili??reValue === "Licence en ??ducation") {
      setSection([
        "Lettre",
        "Math??matique",
        "Science expr??mentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
      ]);
    }
    if (
      fili??reValue ===
      "Licence en sciences des activit??s physiques et sportives"
    ) {
      setSection([
        "Lettre",
        "Math??matique",
        "Science expr??mentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (fili??reValue === "Licence en tourisme") {
      setSection([
        "Lettre",
        "Math??matique",
        "Science expr??mentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (fili??reValue === "Licence en droit") {
      setSection([
        "Lettre",
        "Math??matique",
        "Science expr??mentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (fili??reValue === "Licence en droit social") {
      setSection(["Lettre", "Economie et gestion"]);
    }
    if (fili??reValue === "Licence en sciences ??conomiques") {
      setSection([
        "Math??matique",
        "Science expr??mentale",
        "Economie et gestion",
      ]);
    }
    if (fili??reValue === "Licence en sciences de gestion") {
      setSection([
        "Math??matique",
        "Science expr??mentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
      ]);
    }
    if (fili??reValue === "Licence en comptabilit?? et finance") {
      setSection([
        "Math??matique",
        "Science expr??mentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
      ]);
    }
    if (fili??reValue === "Licence en commerce et distribution") {
      setSection([
        "Math??matique",
        "Science expr??mentale",
        "Economie et gestion",
        "Science informatique , Science technique",
      ]);
    }
    if (fili??reValue === "Bachelor of Business Administration") {
      setSection([
        "Math??matique",
        "Science expr??mentale",
        "Economie et gestion",
        "Science informatique ",
      ]);
    }
    if (fili??reValue === "Licence en gestion de l'informatique") {
      setSection([
        "Math??matique",
        "Science expr??mentale",
        "Economie et gestion",
        "Science informatique ",
        "Science technique",
      ]);
    }
    if (fili??reValue === "licence en chimie") {
      setSection(["Math??matique", "Science expr??mentale", "Science technique"]);
    }
    if (fili??reValue === "Licence en chimie et physique") {
      setSection(["Math??matique", "Science expr??mentale", "Science technique"]);
    }
    if (fili??reValue === "Licence en physique") {
      setSection(["Math??matique", "Science expr??mentale", "Science technique"]);
    }
    if (fili??reValue === "Licence en physique et ??nergie") {
      setSection(["Math??matique", "Science expr??mentale", "Science technique"]);
    }
    if (fili??reValue === "Licence en math??matiques appliqu??es") {
      setSection([
        "Math??matique",
        "Science expr??mentale",
        "Science technique",
        "Science informatique",
      ]);
    }
    if (fili??reValue === "Licence en math??matiques") {
      setSection([
        "Math??matique",
        "Science expr??mentale",
        "Science technique",
        "Science informatique",
      ]);
    }
    if (fili??reValue === "Licence en biologie") {
      setSection(["Math??matique", "Science expr??mentale"]);
    }
    if (fili??reValue === "Licence en sciences de la Terre") {
      setSection(["Math??matique", "Science expr??mentale", "Science technique"]);
    }
    if (fili??reValue === "Licence en science informatique") {
      setSection([
        "Math??matique",
        "Science expr??mentale",
        "Science technique",
        "Science informatique",
      ]);
    }
    if (fili??reValue === "Licence en ing??nierie des syst??mes d'information") {
      setSection([
        "Math??matique",
        "Science expr??mentale",
        "Science technique",
        "Science informatique",
      ]);
    }
    if (fili??reValue === "Licence en g??nie civil") {
      setSection([
        "Math??matique",
        "Science expr??mentale",
        "Science technique",
        "Science informatique",
      ]);
    }
    if (fili??reValue === "Licence en g??nie m??canique") {
      setSection([
        "Math??matique",
        "Science expr??mentale",
        "Science technique",
        "Science informatique",
      ]);
    }
    if (
      fili??reValue ===
      "Licence en technologies de l'information et de la communication"
    ) {
      setSection([
        "Math??matique",
        "Science expr??mentale",
        "Science technique",
        "Science informatique",
      ]);
    }
    if (fili??reValue === "Licence en g??nie logistique") {
      setSection([
        "Math??matique",
        "Science expr??mentale",
        "Science technique",
        "Science informatique",
      ]);
    }
    if (fili??reValue === "Licence en ??lectronique et automatisation") {
      setSection([
        "Math??matique",
        "Science expr??mentale",
        "Science technique",
        "Science informatique",
      ]);
    }
    if (fili??reValue === "Architecture") {
      setSection([
        "Lettre",
        "Math??matique",
        "Science expr??mentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (fili??reValue === "Licence en construction et pr??paration") {
      setSection([
        "Lettre",
        "Math??matique",
        "Science expr??mentale",
        "Economie et gestion",
        "Science technique",
      ]);
    }
    if (fili??reValue === "pr??paratoire int??gr?? en g??nie biom??dical") {
      setSection(["Math??matique", "Science expr??mentale"]);
    }
    if (
      fili??reValue ===
      "pr??paratoire int??gr?? en g??nie des biotechnologies de la sant??"
    ) {
      setSection(["Math??matique", "Science expr??mentale"]);
    }
    if (fili??reValue === "pr??paratoire int??gr?? en informatique") {
      setSection([
        "Math??matique",
        "Science expr??mentale",
        "Science informatique",
        "Science technique",
      ]);
    }
    if (
      fili??reValue === "pr??paratoire int??gr?? en physique-chimie et informatique"
    ) {
      setSection([
        "Math??matique",
        "Science expr??mentale",
        "Science informatique",
      ]);
    }
    if (fili??reValue === "pr??paratoire math??matiques-physique") {
      setSection([
        "Math??matique",
        "Science expr??mentale",
        "Science informatique",
      ]);
    }
    if (fili??reValue === "pr??paratoire chimie-physique") {
      setSection([
        "Math??matique",
        "Science expr??mentale",
        "Science informatique",
      ]);
    }
    if (fili??reValue === "pr??paratoire-technologie") {
      setSection(["Science technique"]);
    }
    if (fili??reValue === "pr??paratoire biologie-g??ologie") {
      setSection(["Math??matique", "Science expr??mentale"]);
    }
    if (fili??reValue === "Pharmacie") {
      setSection(["Math??matique", "Science expr??mentale", "Lettre", "Sport"]);
    }
    if (fili??reValue === "M??dicine") {
      setSection(["Math??matique", "Science expr??mentale", "Lettre", "Sport"]);
    }
    if (fili??reValue === "Dentisterie") {
      setSection(["Math??matique", "Science expr??mentale", "Lettre", "Sport"]);
    }
    if (fili??reValue === "licence en biotechnologie m??dicale") {
      setSection(["Math??matique", "Science expr??mentale"]);
    }
    if (fili??reValue === "licence en anesth??sie et r??animation") {
      setSection(["Math??matique", "Science expr??mentale"]);
    }
    if (fili??reValue === "licence en imagerie m??dicale et radioth??rapie") {
      setSection(["Math??matique", "Science expr??mentale"]);
    }
    if (fili??reValue === "licence en protection de la sant??") {
      setSection(["Math??matique", "Science expr??mentale", "Lettre", "Sport"]);
    }
    if (fili??reValue === "licence en biologie m??dicale") {
      setSection(["Math??matique", "Science expr??mentale"]);
    }
    if (fili??reValue === "licence en physioth??rapie") {
      setSection(["Math??matique", "Science expr??mentale", "Lettre", "Sport"]);
    }
    if (fili??reValue === "licence en chirurgie orthop??dique") {
      setSection(["Math??matique", "Science expr??mentale"]);
    }
    if (fili??reValue === "licence en nutrition humaine") {
      setSection(["Math??matique", "Science expr??mentale", "Lettre", "Sport"]);
    }
    if (fili??reValue === "licence en ergoth??rapie") {
      setSection(["Math??matique", "Science expr??mentale", "Lettre", "Sport"]);
    }
    if (fili??reValue === "licence en Prosthodontie") {
      setSection(["Math??matique", "Science expr??mentale", "Lettre", "Sport"]);
    }
    if (fili??reValue === "licence en g??nie biom??dical") {
      setSection(["Math??matique", "Science expr??mentale", "Lettre", "Sport"]);
    }
    if (fili??reValue === "licence en soins d'urgence et en r??animation") {
      setSection(["Math??matique", "Science expr??mentale", "Lettre", "Sport"]);
    }
    if (fili??reValue === "licence sciences infirmi??res-Femme") {
      setSection(["Math??matique", "Science expr??mentale", "Lettre", "Sport"]);
    }
    if (fili??reValue === "licence sciences infirmi??res-homme") {
      setSection(["Math??matique", "Science expr??mentale", "Lettre", "Sport"]);
    }
    if (fili??reValue === "licence en obst??trique-Sage-femme") {
      setSection(["Math??matique", "Science expr??mentale", "Lettre", "Sport"]);
    }
    if (fili??reValue === "licence en biotechnologie") {
      setSection(["Math??matique", "Science expr??mentale"]);
    }
    if (fili??reValue === "licence en sciences agronomiques") {
      setSection(["Math??matique", "Science expr??mentale", "Science technique"]);
    }
    if (fili??reValue === "licence en sciences de la mer - Femme") {
      setSection(["Math??matique", "Science expr??mentale", "Science technique"]);
    }
    if (fili??reValue === "licence en sciences de la mer - homme") {
      setSection(["Math??matique", "Science expr??mentale", "Science technique"]);
    }
    if (fili??reValue === "licence en industries alimentaires") {
      setSection(["Math??matique", "Science expr??mentale"]);
    }
    if (fili??reValue === "Sciences infirmi??res") {
      setSection(["Math??matique", "Science expr??mentale"]);
    }
    if (fili??reValue === "Anesth??sie et r??animation") {
      setSection(["Math??matique", "Science expr??mentale"]);
    }
    if (fili??reValue === "Sciences militaires") {
      setSection([
        "Lettre",
        "Math??matique",
        "Science expr??mentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (fili??reValue === "Sciences juridiques et commerciales") {
      setSection([
        "Lettre",
        "Math??matique",
        "Science expr??mentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (fili??reValue === "Techniques d'armes") {
      setSection(["Math??matique", "Science expr??mentale", "Science technique"]);
    }
    if (fili??reValue === "Ing??nierie en informatique") {
      setSection(["Math??matique", "Science expr??mentale", "Science technique"]);
    }
    if (fili??reValue === "G??nie civil") {
      setSection(["Math??matique", "Science expr??mentale", "Science technique"]);
    }
    if (fili??reValue === "Communications") {
      setSection(["Math??matique", "Science expr??mentale", "Science technique"]);
    }
    if (fili??reValue === "??lectrom??canicien") {
      setSection(["Math??matique", "Science expr??mentale", "Science technique"]);
    }
    if (fili??reValue === "Conduite d'avion") {
      setSection(["Math??matique", "Science expr??mentale", "Science technique"]);
    }
    if (fili??reValue === "g??nie m??canique") {
      setSection(["Math??matique", "Science expr??mentale", "Science technique"]);
    }
    if (fili??reValue === "T??l??m??canique") {
      setSection(["Math??matique", "Science expr??mentale", "Science technique"]);
    }
    if (fili??reValue === "A??romobile") {
      setSection(["Math??matique", "Science expr??mentale", "Science technique"]);
    }
    if (fili??reValue === "Sciences musicales") {
      setSection([
        "Lettre",
        "Math??matique",
        "Science expr??mentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (fili??reValue === "Th????tre et arts de la sc??ne") {
      setSection([
        "Lettre",
        "Math??matique",
        "Science expr??mentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (fili??reValue === "Conception de l'espace") {
      setSection([
        "Lettre",
        "Math??matique",
        "Science expr??mentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (fili??reValue === "Conception des produits") {
      setSection([
        "Lettre",
        "Math??matique",
        "Science expr??mentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (fili??reValue === "Publicit?? et audiovisuel") {
      setSection([
        "Lettre",
        "Math??matique",
        "Science expr??mentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (fili??reValue === "Arts et communication") {
      setSection([
        "Lettre",
        "Math??matique",
        "Science expr??mentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
  }, [fili??reValue]);

/**********************************DOMAINE**************************************** */
useEffect(() => {
  if (diplomeCherche === "deuxi??me licence") {
    setdomaineDip([
      "Litt??rature, langues",
      "Sciences humaines, sociales, religieuses",
      "Culture, beaux-arts et arts",
      "Tourisme, revitalisation",
      "Sciences juridiques et politiques",
      "Sciences ??conomiques et de gestion",
      "Sciences et technologie",
      "Sciences agronomiques, biotechnologies et environnement"

    ]);
  }
  if (diplomeCherche === "Mast??re professionnel") {
    setdomaineDip([
      "Litt??rature, langues",
      "Sciences humaines, sociales, religieuses et de l'??ducation",
      "Culture, beaux-arts et arts",
      "Tourisme, revitalisation, sports et ??ducation physique",
      "Sciences juridiques et politiques",
      "Sciences ??conomiques et de gestion",
      "Sciences et technologie",
      "Sciences agronomiques, biotechnologies et environnement",       
      "Sciences m??dicales et pharmaceutiques",
      "Architecture"
    ]);
  }
  if (diplomeCherche === "Mast??re recherche") {
    setdomaineDip([
      "Litt??rature, langues",
      "Sciences humaines, sociales, religieuses et de l'??ducation",
      "Tourisme, revitalisation, sports et ??ducation physique",
      "Sciences juridiques et politiques",
      "Sciences ??conomiques et de gestion",
      "Sciences et technologie",
      "Sciences m??dicales et pharmaceutiques",
      "Architecture"
    ]);
  }
  if (diplomeCherche === "Dipl??me national d'ing??nieur") {
    setdomaineDip([
      "Sciences et technologie",

    ]);
  }

}, [diplomeCherche]);



/**********************************FILIERES**************************************** */
useEffect(() => {
  if (diplomeCherche === "deuxi??me licence" && 
  domaineDipValue === "Litt??rature, langues") {
    setSpecialite([
      "Licence en arabe",
      "Licence en anglais",
      "Licence en fran??ais",
      "Licence en espagnole",
      "Licence en italienne",
      "Licence en Allemagne",
      "Licence en langues des signes",
    ]);
  }
  if (diplomeCherche === "deuxi??me licence" && 
  domaineDipValue === "Sciences humaines, sociales, religieuses") {
    setSpecialite([
      "Licence en sociologie",
      "Licence en psychologie",
      "Licence en philosophie",
      "Licence en arch??ologie",
     ]);
  }
  if (diplomeCherche === "deuxi??me licence" && 
  domaineDipValue === "Culture, beaux-arts et arts") {
    setSpecialite([
      "Conception de l'espace",
      "Conception des produits",
      "Publicit?? et audiovisuel", 
      "Arts et communication"    
    ]);
  }
  if (diplomeCherche === "deuxi??me licence" && 
  domaineDipValue === "Tourisme, revitalisation") {
    setSpecialite([
      "Licence en tourisme",
    ]);
  }
  if (diplomeCherche === "deuxi??me licence" && 
  domaineDipValue === "Sciences juridiques et politiques") {
    setSpecialite([
      "Licence en droit"
        ]);
  }
  if (diplomeCherche === "deuxi??me licence" && 
  domaineDipValue === "Sciences ??conomiques et de gestion") {
    setSpecialite([
      "Licence en sciences ??conomiques",
      "Licence en sciences de gestion",
      "Licence en comptabilit?? et finance",
      "Licence en commerce et distribution",
      ]);
  }
  if (diplomeCherche === "deuxi??me licence" && 
  domaineDipValue === "Sciences et technologie") {
    setSpecialite([
      "Licence en gestion de l'informatique",
      "licence en chimie",
      "Licence en chimie et physique",
      "Licence en physique",
      "Licence en physique et ??nergie",
      "Licence en math??matiques appliqu??es",
      "Licence en math??matiques",
      "Licence en biologie",
      "Licence en sciences de la Terre",
      "Licence en science informatique",
      "Licence en ing??nierie des syst??mes d'information",
      "Licence en g??nie civil",
      "Licence en g??nie m??canique",
      "Licence en technologies de l'information et de la communication",
      "Licence en g??nie logistique",
      "Licence en ??lectronique et automatisation",
          ]);
  }
  if (diplomeCherche === "deuxi??me licence" && 
  domaineDipValue === "Sciences m??dicales et pharmaceutiques") {
    setSpecialite([
      "licence en g??nie biom??dical",
          ]);
  }
  if (diplomeCherche === "deuxi??me licence" && 
  domaineDipValue === "Sciences m??dicales et pharmaceutiques") {
    setSpecialite([
      "licence en g??nie biom??dical",
          ]);
  }
  if (diplomeCherche === "deuxi??me licence" && 
  domaineDipValue === "Sciences agronomiques, biotechnologies et environnement") {
    setSpecialite([
      "licence en biotechnologie",
      "licence en sciences agronomiques",
    ]);
  }
 /*********************Mast??re professionnel*************************** */
  if (diplomeCherche === "Mast??re professionnel" && 
  domaineDipValue === "Litt??rature, langues") {
    setSpecialite([
      "Interpr??tation sp??cialis??e en langue des signes",
      "Traduction appliqu??e aux droits et aux Sciences",
      "Langues, communication et entreprises",
      "Langue, Litt??rature et Civilisation Fran??aises",
      "Communication, langue et patrimoine"
    ]);
  }
  if (diplomeCherche === "Mast??re professionnel" && 
  domaineDipValue === "Sciences humaines, sociales, religieuses et de l'??ducation") {
    setSpecialite([
      "Psychologie de l'enfance et de l'adolescence",
      "Psychologie du travail: Formation, Orientation et Evaluation",
      "Ing??nierie en intervention psychosociale",
      "Neuropsychologie clinique"
    ]);
  }
  if (diplomeCherche === "Mast??re professionnel" && 
  domaineDipValue === "Culture, beaux-arts et arts") {
    setSpecialite([
    "Design textile et Mode",
    "Management du textile et de la mode",
    "Design et technologie",
    "Technologie des sciences des donn??es"

    ]);
  }
  if (diplomeCherche === "Mast??re professionnel" && 
  domaineDipValue === "Tourisme, revitalisation, sports et ??ducation physique") {
    setSpecialite([
      "entrainement et pr??paration physique",
    ]);
  }
  if (diplomeCherche === "Mast??re professionnel" && 
  domaineDipValue === "Sciences juridiques et politiques") {
    setSpecialite([
      "Droit des affaires",
      "Droit des affaires fonci??res"
      ]);
  }
  if (diplomeCherche === "Mast??re professionnel" && 
  domaineDipValue === "Sciences ??conomiques et de gestion") {
    setSpecialite([
      "Banques",
      "Comptabilit??",
      "??valuation et Gestion des risques en Finance et assurance",
      "Statistiques appliqu??es",
      "Affaires commerciales internationales",
      "Ing??nierie de l'information pour la gestion de l'entreprise",
      "Ing??nerie financi??re",
      "Entrepreneuriat: Entrepreneuriat et Management des projets",
      "Master Of Mgmt Of Non-Profit Organizations",
      "Master Of BA"
    ]);
  }
  if (diplomeCherche === "Mast??re professionnel" && 
  domaineDipValue === "Sciences et technologie") {
    setSpecialite([
      "G??omatique",
      "G??ophysique Appliqu??e",
      "Hygi??ne et S??curit?? Appliqu??es",
      "Syst??me R??seaux et T??l??communication" ,
      "S??curit?? des syst??mes informatiques communiquant et embarqu??s",
      "Innovation Management",
      "Analyses Physico-chimiques et Environnement",
      " Instrumentation avanc??e et applications",
      "Ing??nierie des Syst??mes d'Informations",
      "G??nie logiciel",
      "Contr??le qualit?? des aliments et hygi??ne",
      "Technologie en production m??canique",
      "Biotechnologie",
    ]);
  }
  if (diplomeCherche === "Mast??re professionnel" && 
  domaineDipValue === "Sciences agronomiques, biotechnologies et environnement") {
    setSpecialite([
      "Qualit??, environnement et s??curit??",
      "Technologies des vivants et de l'environnement",
      "Agroalimentaire (technologies alimentaires)"
      ]);
  }
  if (diplomeCherche === "Mast??re professionnel" && 
  domaineDipValue === "Sciences m??dicales et pharmaceutiques") {
    setSpecialite([
      "Syst??mes ??lectroniques embarqu??s et traitement de l'information m??dicale",
      "G??nie Biom??dical",
      "Nutrition humaine",
      "Gestion des soins critiques:urgences",
      "Mast??re professionnel en Ergonomie",
      "Mast??re professionnel en m??decine de famille",
      "Qualitologie et Management de la Qualit?? dans le Domaine de la Sant??",
      "H??mobiologie, Transfusion et Th??rapie Cellulaire",
      " Management de la sant?? publique MedHealth",
      "Orthodontie fonctionnelle et esth??tique"
    ]);
  }
  if (diplomeCherche === "Mast??re professionnel" && 
  domaineDipValue === "Architecture") {
    setSpecialite([
      "Urbanisme",
    ]);
  }
 /*********************Mast??re recherche*************************** */
  if (diplomeCherche === "Mast??re recherche" && 
  domaineDipValue === "Litt??rature, langues") {
    setSpecialite([
      "Langues, Lettres et Civilisation Arabes",
      "Litt??ratures et linguistique Fran??aises",
    ]);
  }
  if (diplomeCherche === "Mast??re recherche" && 
  domaineDipValue === "Sciences humaines, sociales, religieuses et de l'??ducation") {
    setSpecialite([
      "Inter-cultural studies",
      "Philosophie des lumi??res et de la modernit??",
      "Sociologie et D??veloppement"    
     ]);
  }
  if (diplomeCherche === "Mast??re recherche" && 
  domaineDipValue === "Tourisme, revitalisation, sports et ??ducation physique") {
    setSpecialite([
      "Sciences des activit??s physiques et sportives",  
      "Didactique des activit??s physiques et sportives",
    ]);
  }
  if (diplomeCherche === "Mast??re recherche" && 
  domaineDipValue === "Sciences juridiques et politiques") {
    setSpecialite([
      "Droit priv??",
      "Sciences criminelles",
      "Sciences politiques",
      "Droit public et Sciences politiques"
      ]);
  }
  if (diplomeCherche === "Mast??re recherche" && 
  domaineDipValue === "Sciences ??conomiques et de gestion") {
    setSpecialite([
      "Comptabilit??",
      "Finance",
      "M??thodes quantitatives",
      "Economie et finance internationales",
      "Economie mon??taire et bancaire",
      "Marketing",
      "Management",
      "Banque et Finance Internationale",
    ]);
  }
  if (diplomeCherche === "Mast??re recherche" && 
  domaineDipValue === "Sciences et technologie") {
    setSpecialite([
      "Math??matiques Appliqu??es",
      "Mati??re Condens??e",
      "Math??matiques Fondamentales",
      "Biochimie",
      "Informatique",
      "Mod??lisation et calcul scientifique",
      "Syst??mes de communications",
      "Traitement de l???information et complexit?? du vivant",
      "Micro??lectronique et Instrumentation",
      "Sciences de l'informatique: G??nie logiciel",
      "G??nie m??canique",
      "G??nie ??nerg??tique: Administration des affaires en ??nergie"
      
    ]);
  }
  if (diplomeCherche === "Mast??re recherche" && 
  domaineDipValue === "Sciences m??dicales et pharmaceutiques") {
    setSpecialite([
      "Biophysique, Radio-physique et Imagerie M??dicale",
      "Biologie m??dicale et Technologie de la Sant??",
      "D??veloppement des M??dicaments",
      "Sant??, exploration et pr??vention"
    ]);
  }
  if (diplomeCherche === "Mast??re recherche" && 
  domaineDipValue === "Architecture") {
    setSpecialite([
      "Urbanisme et Am??nagement",
      "Sciences de l'architecture"
    ]);
  }
  if (diplomeCherche === "Dipl??me national d'ing??nieur" && 
  domaineDipValue === "Sciences et technologie"){
    setSpecialite([
    "G??nie Electrique",
    "G??nie Hydraulique et environnement",
    "G??nie Civil",
    "G??nie M??canique",
    "G??nie Industriel",
    "Informatique",
    "Techniques Avanc??es",
    "T??l??communications",
    "Chimie Analytique",
    "G??osciences",
    "??lectronique",
    "G??nie Informatique des Syst??mes Industriels",
    "G??nie du Logiciel et des Syst??mes d'Information",
    "G??nie ??nerg??tique",
    "G??nie textile",
    "Micro??lectronique"
  ]);
}

}, [diplomeCherche , domaineDipValue]);
/**************************************************************************** /
 *   /**************************************************************************** */
  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(data.img);
    }
  }, [image, data.img]);

  

  const handleSubmit = props => { 
  if (niveauEtude === "" && data.dataNiveau.Niveau === "Bachelier") {
      const dataBachelier = {
        Niveau: props.niveauEtude,
        domaine: props.domaine,
        fili??re: props.fili??re,
        section: props.section,
        score: props.score,
        diplome: props.diplome,
      };

      const niveau = {
        _id: data._id,
        Ville: props.ville,
        Nom_pr??nom: props.nom,
        email: props.email,
        // M_passe : props.M_passe,
        status: props.status,
        img: preview,

        dataNiveau: dataBachelier,
      };

      axios({
        url: "http://localhost:4000/api/data/updateEtud",
        method: "put",
        data: niveau,
      })
      .then((res)=>{
          setOpenPopupeditetud(false); 
        Swal.fire({
          icon: "success",
          title: "Modifi?? avec succ??s",
          html: '<span style="color:#FFFFFF">Les champs sont bien modifi??s. </span>',
          showCloseButton: false,
          showConfirmButton: false,
          background: "black",
          timer: 2000,
        });
         setTimeout(() => {
          window.location.reload();
         }, 2000); 
      })

      .catch(err => {
        Swal.fire({
          icon: "warning",
          html: '<span style="color:#FFF6C5">   Erreur </span>',
          showCloseButton: false,
          showConfirmButton: false,
          background: "black",
          timer: 2000,
        });
      });


    }
    if (niveauEtude === "Bachelier") { 
      const dataBachelier = {
        Niveau: props.niveauEtude,
        domaine: props.domaine,
        fili??re: props.fili??re,
        section: props.section,
        score: props.score,
        diplome: props.diplome,
      };

      const niveau = {
        _id: data._id,
        Ville: props.ville,
        Nom_pr??nom: props.nom,
        email: props.email,
        // M_passe : props.M_passe,
        status: props.status,
        img: preview,

        dataNiveau: dataBachelier,
      };

      axios({
        url: "http://localhost:4000/api/data/updateEtud",
        method: "put",
        data: niveau,
      })
      .then((res)=>{
        setOpenPopupeditetud(false); 
        Swal.fire({
          icon: "success",
          title: "Modifi?? avec succ??s",
          html: '<span style="color:#FFFFFF">Les champs sont bien modifi??s. </span>',
          showCloseButton: false,
          showConfirmButton: false,
          background: "black",
          timer: 2000,
        });
         setTimeout(() => {
          window.location.reload();
         }, 2000); 
      })

      .catch(err => {
        Swal.fire({
          icon: "warning",
          html: '<span style="color:#FFF6C5">   Erreur </span>',
          showCloseButton: false,
          showConfirmButton: false,
          background: "black",
          timer: 2000,
        });
      });


  
    }
    if (niveauEtude === "" && data.dataNiveau.Niveau === "Dipl??m??") {
      const dataDiplome = {
        Niveau: props.niveauEtude,
        diplomeDip: props.diplomeCherche,
        domaineDip: props.domaineDip,
        specialite: props.specialite,
      };
      const niveau = {
        _id: data._id,
        Ville: props.ville,
        Nom_pr??nom: props.nom,
        email: props.email,
        // M_passe : props.M_passe,
        status: props.status,
        img: preview,
        dataNiveau: dataDiplome,
      };
      

      axios({
        url: "http://localhost:4000/api/data/updateEtud",
        method: "put",
        data: niveau,
      })
      .then((res)=>{
        setOpenPopupeditetud(false); 
        Swal.fire({
          icon: "success",
          title: "Modifi?? avec succ??s",
          html: '<span style="color:#FFFFFF">Les champs sont bien modifi??s. </span>',
          showCloseButton: false,
          showConfirmButton: false,
          background: "black",
          timer: 2000,
        });
         setTimeout(() => {
          window.location.reload();
         }, 2000); 
      })

      .catch(err => {
        Swal.fire({
          icon: "warning",
          html: '<span style="color:#FFF6C5">   Erreur </span>',
          showCloseButton: false,
          showConfirmButton: false,
          background: "black",
          timer: 2000,
        });
      });
    }

    if (niveauEtude === "Dipl??m??") {
      console.log("dsgdfgdf");
      const dataDiplome = {
        Niveau: props.niveauEtude,
        diplomeDip: props.diplomeCherche,
        domaineDip: props.domaineDip,
        specialite: props.specialite,
      };
      const niveau = {
        _id: data._id,
        Ville: props.ville,
        Nom_pr??nom: props.nom,
        email: props.email,
        // M_passe : props.M_passe,
        status: props.status,
        img: preview,
        dataNiveau: dataDiplome,
      };
    

      axios({
        url: "http://localhost:4000/api/data/updateEtud",
        method: "put",
        data: niveau,
      })
      .then((res)=>{
        setOpenPopupeditetud(false); 
        Swal.fire({
          icon: "success",
          title: "Modifi?? avec succ??s",
          html: '<span style="color:#FFFFFF">Les champs sont bien modifi??s. </span>',
          showCloseButton: false,
          showConfirmButton: false,
          background: "black",
          timer: 2000,
        });
         setTimeout(() => {
          window.location.reload();
         }, 2000); 
      })

      .catch(err => {
        Swal.fire({
          icon: "warning",
          html: '<span style="color:#FFF6C5">   Erreur </span>',
          showCloseButton: false,
          showConfirmButton: false,
          background: "black",
          timer: 2000,
        });
      });

    }



    if (niveauEtude === "") {
      console.log("dsgdfgdf");
      const dataDiplome = {
        Niveau: props.niveauEtude,
        diplomeDip: props.diplomeCherche,
        domaineDip: props.domaineDip,
        specialite: props.specialite,
      };
      const niveau = {
        _id: data._id,
        Ville: props.ville,
        Nom_pr??nom: props.nom,
        email: props.email,
        // M_passe : props.M_passe,
        status: props.status,
        img: preview,
        dataNiveau: "",
      };
    

      axios({
        url: "http://localhost:4000/api/data/updateEtud",
        method: "put",
        data: niveau,
      })
      .then((res)=>{
        setOpenPopupeditetud(false); 
        Swal.fire({
          icon: "success",
          title: "Modifi?? avec succ??s",
          html: '<span style="color:#FFFFFF">Les champs sont bien modifi??s. </span>',
          showCloseButton: false,
          showConfirmButton: false,
          background: "black",
          timer: 2000,
        });
         setTimeout(() => {
          window.location.reload();
         }, 2000); 
      })

      .catch(err => {
        Swal.fire({
          icon: "warning",
          html: '<span style="color:#FFF6C5">  Erreur </span>',
          showCloseButton: false,
          showConfirmButton: false,
          background: "black",
          timer: 2000,
        });
      });

    }




  };

  //***************************************************************** */

  const [niveauEtude, setNiveauEtude] = useState("");

  useEffect(() => {
    const getEtudData = async () => {
   
      
        setDomaine(data ? data.dataNiveau ? data.dataNiveau.domaine :"" :"");
         setDiplomeValue(data ? data.dataNiveau ? data.dataNiveau.diplome :"" :"" );
         setFili??reValue(data ? data.dataNiveau ? data.dataNiveau.fili??re :"" :"" );
         setSectionValue(data ? data.dataNiveau ? data.dataNiveau.section :"" :"" );
        setdiplomeCherche(data ? data.dataNiveau ? data.dataNiveau.diplomeDip :"" :"");
         setdomaineDipValue(data ? data.dataNiveau ? data.dataNiveau.domaineDip :"" :"");
   
    };

    getEtudData();
  }, [data]); //UNE SEUL FOIS

  const initialValues = {
    img: data.img,
    nom: data.Nom_pr??nom,
    email: data.email,
    // M_passe: data.M_passe,
    // Confirm_M_passe: data.M_passe,
    status: data.status,
    niveauEtude: data ? data.dataNiveau ? data.dataNiveau.Niveau :"" :"",
    ville: data.Ville,
    section: data ? data.dataNiveau ? data.dataNiveau.section :"" :"",
    diplome: data ? data.dataNiveau ? data.dataNiveau.diplome :"" :"",
    domaine:data ? data.dataNiveau ? data.dataNiveau.domaine :"" :"",
    fili??re:data ? data.dataNiveau ? data.dataNiveau.fili??re :"" :"",
    
    diplomeCherche: data ? data.dataNiveau ? data.dataNiveau.diplomeDip :"" :"",
    score: data ? data.dataNiveau ? data.dataNiveau.score :"" :"",
    specialite: data ? data.dataNiveau ? data.dataNiveau.specialite :"" :"",
    domaineDip: data ? data.dataNiveau ? data.dataNiveau.domaineDip :"" :"",
    accept: true,
  };

        return (
        <Dialog open={openPopupeditetud} maxWidth="lg">
            <DialogContent >
            <IconButton className={classes.customizedButton}
            onClick={()=>{setOpenPopupeditetud(false)}}>
                 <CloseIcon /> 
                </IconButton>
                {/* <Paper elevation={6} className={classes.paper}> */}
      <Box display="flex">
        <Box flexGrow={1}>
          {/* <Typography className={classes.typography} variant="h4">
            <strong>Modifier mon profil</strong>
          </Typography>
        </Box>

        <Box className={classes.botton}>
          <Link to="/Etud_profile">
            <Button variant="contained" color="secondary" size="large">
              Acc??der ?? votre profil
            </Button>
          </Link> */}
        </Box>
      </Box>

      {/* <br />
      <Divider />
      <br />
      <center>
        <em>
          Afin d'utiliser les services de site, il est n??cessaire que vous nous
          donniez des informations.
        </em>
      </center>
      <br />
      <br /> */}
      <Formik
        enableReinitialize={true}
        validateOnBlur={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values }) => (
          <Form noValidate autoComplete="off">
            <div className={classes.photo}>
              <img
                src={preview ? preview : data.img}
                alt=""
                className={classes.image}
                // onClick={() => {
                //   setImage(null);
                // }}
              />
              <input
                name="img"
                style={{ display: "none" }}
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={e => {
                  const file = e.target.files[0];
                  if (file && file.type.substr(0, 5) === "image") {
                    setImage(file);
                  } else {
                    setImage(null);
                  }
                }}
              />
              <br />
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={e => {
                  e.preventDefault();
                  fileInputRef.current.click();
                }}
              >
                Select Profile Picture
              </Button>
            </div>

            <Container style={{ marginTop: "20px" }}>
              <Divider style={{ marginBottom: "20px" }} />
              <center>
                <Field
                  fullWidth
                  as={TextField}
                  name="nom"
                  variant="outlined"
                  className={classes.textField}
                  label="Nom complet"
                  size="small"
                  helperText={<ErrorMessage name="nom" />}
                  error={errors.nom && touched.nom}
                />
                <br/>
                   <Field
                  fullWidth
                  as={TextField}
                  name="email"
                  variant="outlined"
                  className={classes.textField}
                  label="email"
                  size="small"
                  type="email"
                  helperText={<ErrorMessage name="email" />}
                  error={errors.email && touched.email}
                />
                <br/>
                   {/* <Field
                  fullWidth
                  as={TextField}
                  name="M_passe"
                  variant="outlined"
                  className={classes.textField}
                  label="Mot de passe"
                  size="small"
                  type="password"
                  helperText={<ErrorMessage name="M_passe" />}
                  error={errors.M_passe && touched.M_passe}
                />
                <br/>
                  <Field
                  fullWidth
                  as={TextField}
                  name="Confirm_M_passe"
                  variant="outlined"
                  className={classes.textField}
                  label="Confirme mot de passe"
                  size="small"
                  type="password"
                  helperText={<ErrorMessage name="Confirm_M_passe" />}
                  error={errors.Confirm_M_passe && touched.Confirm_M_passe}
                />
 */}
                <br />
                <FormControl
                  size="small"
                  variant="outlined"
                  className={classes.textField}
                  error={errors.status && touched.status}
                >
                  <InputLabel>Status</InputLabel>
                  <Field
                    as={Select}
                    name="status"
                    label="status"
                  >
                    <MenuItem value={"Active"}>Active </MenuItem>
                    <MenuItem value={"En attente"}>En attente</MenuItem>
                  </Field>
                  </FormControl>

                <br/>
                <FormControl
                  size="small"
                  variant="outlined"
                  className={classes.textField}
                  error={errors.ville && touched.ville}
                >
                  <InputLabel>Ville</InputLabel>
                  <Field as={Select} name="ville" label="Ville">
                    {villes.map((vil, index) => {
                      return (
                        <MenuItem key={index} value={vil}>
                          {vil}
                        </MenuItem>
                      );
                    })}
                  </Field>

                  <FormHelperText>
                    {<ErrorMessage name="ville" />}
                  </FormHelperText>
                </FormControl>
                <br />

                <FormControl
                  size="small"
                  variant="outlined"
                  className={classes.textField}
                  error={errors.niveauEtude && touched.niveauEtude}
                >
                  <InputLabel>Niveau d'??tude</InputLabel>
                  <Field
                    as={Select}
                    name="niveauEtude"
                    label="Niveau d'??tude"
                    onClick={e => {
                      if (e.target.value) {
                        setNiveauEtude(e.target.value);
                      }
                    }}
                  >
                    <MenuItem value={"Bachelier"}>Bachelier </MenuItem>
                    <MenuItem value={"Dipl??m??"}>Dipl??m??</MenuItem>
                  </Field>
                  <FormHelperText>
                    {<ErrorMessage name="niveauEtude" />}
                  </FormHelperText>
                </FormControl>
                {/* *********************************************************************************** */}
                {niveauEtude === "" ? (
                  data.dataNiveau.Niveau === "Bachelier" ? (
                    <>
                      <Divider
                        style={{ marginTop: "20px", marginBottom: "20px" }}
                      />

                      <FormControl
                        size="small"
                        variant="outlined"
                        className={classes.textField}
                        error={errors.domaine && touched.domaine}
                      >
                        <InputLabel>Domaine</InputLabel>

                        <Field
                          onClick={e => {
                            if (e.target.value) {
                              setDomaine(e.target.value);
                            }
                          }}
                          as={Select}
                          name="domaine"
                          label="Domaine"
                        >
                          {domaines.map((domaine, index) => {
                            return (
                              <MenuItem key={index} value={domaine}>
                                {domaine}
                              </MenuItem>
                            );
                          })}
                        </Field>
                        <FormHelperText>
                          {<ErrorMessage name="domaine" />}
                        </FormHelperText>
                      </FormControl>
                      <br />

                      <FormControl
                        size="small"
                        variant="outlined"
                        className={classes.textField}
                        error={errors.diplome && touched.diplome}
                      >
                        <InputLabel>Diplome</InputLabel>
                        <Field
                          onClick={e => {
                            if (e.target.value) {
                              // if (domaine) {
                              setDiplomeValue(e.target.value);
                              // }
                            }
                          }}
                          as={Select}
                          name="diplome"
                          label="Diplome"
                        >
                          {diplome.map((dip, index) => {
                            return (
                              <MenuItem key={index} value={dip}>
                                {dip}
                              </MenuItem>
                            );
                          })}
                        </Field>
                        <FormHelperText>
                          {<ErrorMessage name="diplome" />}
                        </FormHelperText>
                      </FormControl>

                      <br />

                      <FormControl
                        size="small"
                        variant="outlined"
                        className={classes.textField}
                        error={errors.fili??re && touched.fili??re}
                      >
                        <InputLabel>Fili??re</InputLabel>
                        <Field
                          onClick={e => {
                            if (e.target.value) {
                              setFili??reValue(e.target.value);
                            }
                          }}
                          as={Select}
                          name="fili??re"
                          label="Fili??re"
                        >
                          {fili??res.map((dip, index) => {
                            return (
                              <MenuItem key={index} value={dip}>
                                {dip}
                              </MenuItem>
                            );
                          })}
                        </Field>
                        <FormHelperText>
                          {<ErrorMessage name="fili??re" />}
                        </FormHelperText>
                      </FormControl>

                      <br />

                      <FormControl
                        size="small"
                        variant="outlined"
                        className={classes.textField}
                        error={errors.section && touched.section}
                      >
                        <InputLabel>Section</InputLabel>
                        <Field
                          as={Select}
                          name="section"
                          label="Section"
                          onClick={e => {
                            if (e.target.value) {
                              setSectionValue(e.target.value);
                            }
                          }}
                        >
                          {section.map((sec, index) => {
                            return (
                              <MenuItem key={index} value={sec}>
                                {sec}
                              </MenuItem>
                            );
                          })}
                        </Field>
                        <FormHelperText>
                          {<ErrorMessage name="section" />}
                        </FormHelperText>
                      </FormControl>

                      <br />

                      {sectionValue ? (
                        <>
                          <br />
                          <Divider />
                          <br />
                          <em>
                            NB: Entrez le score total pour cette fili??re (T= FG
                            + NOTE).
                          </em>
                          <br />
                          <Field
                            fullWidth
                            as={TextField}
                            name="score"
                            variant="outlined"
                            className={classes.textField}
                            label="Score"
                            size="small"
                            helperText={<ErrorMessage name="score" />}
                            error={errors.score && touched.score}
                          />
                        </>
                      ) : data.dataNiveau.Niveau === "Dipl??m??" ? (
                        <>
                          <Divider
                            style={{ marginTop: "20px", marginBottom: "20px" }}
                          />

                          <FormControl
                            size="small"
                            variant="outlined"
                            className={classes.textField}
                            error={
                              errors.diplomeCherche && touched.diplomeCherche
                            }
                          >
                            <InputLabel>Type de dipl??me cherch??</InputLabel>
                            <Field
                              onClick={e => {
                                if (e.target.value) {
                                  setdiplomeCherche(e.target.value);
                                }
                              }}
                              as={Select}
                              name="diplomeCherche"
                              label="Type de dipl??me cherch??"
                            >
                              {diplomesCherche.map((diplomeCh, index) => {
                                return (
                                  <MenuItem key={index} value={diplomeCh}>
                                    {diplomeCh}
                                  </MenuItem>
                                );
                              })}
                            </Field>
                            <FormHelperText>
                              {<ErrorMessage name="diplomeCherche" />}
                            </FormHelperText>
                          </FormControl>
                          <br />

                          <FormControl
                            size="small"
                            variant="outlined"
                            className={classes.textField}
                            error={errors.domaineDip && touched.domaineDip}
                          >
                            <InputLabel>Domaine d'??tude</InputLabel>
                            <Field
                              onClick={e => {
                                if (e.target.value) {
                                  setdomaineDipValue(e.target.value);
                                }
                              }}
                              as={Select}
                              name="domaineDip"
                              label="Diplome cherch??"
                            >
                              {domaineDip.map((domaineDip, index) => {
                                return (
                                  <MenuItem key={index} value={domaineDip}>
                                    {domaineDip}
                                  </MenuItem>
                                );
                              })}
                            </Field>
                            <FormHelperText>
                              {<ErrorMessage name="domaineDip" />}
                            </FormHelperText>
                          </FormControl>

                          <br />

                          <FormControl
                            size="small"
                            variant="outlined"
                            className={classes.textField}
                            error={errors.specialite && touched.specialite}
                          >
                            <InputLabel>Sp??cialit??</InputLabel>
                            <Field
                              onClick={e => {
                                if (e.target.value) {
                                  setSpecialiteValue(e.target.value);
                                }
                              }}
                              as={Select}
                              name="specialite"
                              label="Sp??cialit??"
                            >
                              {specialite.map((sep, index) => {
                                return (
                                  <MenuItem key={index} value={sep}>
                                    {sep}
                                  </MenuItem>
                                );
                              })}
                            </Field>
                            <FormHelperText>
                              {<ErrorMessage name="specialite" />}
                            </FormHelperText>
                          </FormControl>

                          <br />
                        </>
                      ) : (
                        ""
                      )}
                    </>
                  ) : data.dataNiveau.Niveau === "Dipl??m??" ? (
                    <>
                      <Divider
                        style={{ marginTop: "20px", marginBottom: "20px" }}
                      />
                      <FormControl
                        size="small"
                        variant="outlined"
                        className={classes.textField}
                        error={errors.diplomeCherche && touched.diplomeCherche}
                      >
                        <InputLabel>Type de dipl??me cherch??</InputLabel>
                        <Field
                          onClick={e => {
                            if (e.target.value) {
                              setdiplomeCherche(e.target.value);
                            }
                          }}
                          as={Select}
                          name="diplomeCherche"
                          label="Type de dipl??me cherch??"
                        >
                          {diplomesCherche.map((diplomeCh, index) => {
                            return (
                              <MenuItem key={index} value={diplomeCh}>
                                {diplomeCh}
                              </MenuItem>
                            );
                          })}
                        </Field>
                        <FormHelperText>
                          {<ErrorMessage name="diplomeCherche" />}
                        </FormHelperText>
                      </FormControl>
                      <br />

                      <FormControl
                        size="small"
                        variant="outlined"
                        className={classes.textField}
                        error={errors.domaineDip && touched.domaineDip}
                      >
                        <InputLabel>Domaine d'??tude</InputLabel>
                        <Field
                          onClick={e => {
                            if (e.target.value) {
                              setdomaineDipValue(e.target.value);
                            }
                          }}
                          as={Select}
                          name="domaineDip"
                          label="Diplome cherch??"
                        >
                          {domaineDip.map((domaineDip, index) => {
                            return (
                              <MenuItem key={index} value={domaineDip}>
                                {domaineDip}
                              </MenuItem>
                            );
                          })}
                        </Field>
                        <FormHelperText>
                          {<ErrorMessage name="domaineDip" />}
                        </FormHelperText>
                      </FormControl>
                      <br />
                      <FormControl
                        size="small"
                        variant="outlined"
                        className={classes.textField}
                        error={errors.specialite && touched.specialite}
                      >
                        <InputLabel>Sp??cialit??</InputLabel>
                        <Field
                          onClick={e => {
                            if (e.target.value) {
                              setSpecialiteValue(e.target.value);
                            }
                          }}
                          as={Select}
                          name="specialite"
                          label="Sp??cialit??"
                        >
                          {specialite.map((sep, index) => {
                            return (
                              <MenuItem key={index} value={sep}>
                                {sep}
                              </MenuItem>
                            );
                          })}
                        </Field>
                        <FormHelperText>
                          {<ErrorMessage name="specialite" />}
                        </FormHelperText>
                      </FormControl>
                      <br />
                    </>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}

                {niveauEtude === "Bachelier" ? (
                  <>
                    <FormControl
                      style={{ display: "none" }}
                      size="small"
                      variant="outlined"
                      className={classes.textField}
                      error={errors.section && touched.section}
                    >
                      <InputLabel>Section</InputLabel>
                      <Field
                        disabled={fili??reValue === "" ? true : false}
                        as={Select}
                        name="section"
                        label="Section"
                        onClick={e => {
                          if (e.target.value) {
                            setSectionValue(e.target.value);
                          }
                        }}
                      >
                        {section.map((sec, index) => {
                          return (
                            <MenuItem key={index} value={sec}>
                              {sec}
                            </MenuItem>
                          );
                        })}
                      </Field>
                      <FormHelperText>
                        {<ErrorMessage name="section" />}
                      </FormHelperText>
                    </FormControl>
                    {/* *************************************** */}
                    <Divider
                      style={{ marginTop: "20px", marginBottom: "20px" }}
                    />
                    <FormControl
                      size="small"
                      variant="outlined"
                      className={classes.textField}
                      error={errors.domaine && touched.domaine}
                    >
                      <InputLabel>Domaine</InputLabel>
                      <Field
                        onClick={e => {
                          if (e.target.value) {
                            setDomaine(e.target.value);
                          }
                        }}
                        as={Select}
                        name="domaine"
                        label="Domaine"
                      >
                        {domaines.map((domaine, index) => {
                          return (
                            <MenuItem key={index} value={domaine}>
                              {domaine}
                            </MenuItem>
                          );
                        })}
                      </Field>
                      <FormHelperText>
                        {<ErrorMessage name="domaine" />}
                      </FormHelperText>
                    </FormControl>
                    <br />
                    <FormControl
                      size="small"
                      variant="outlined"
                      className={classes.textField}
                      error={errors.diplome && touched.diplome}
                    >
                      <InputLabel>Diplome</InputLabel>
                      <Field
                        onClick={e => {
                          if (e.target.value) {
                            // if (domaine) {
                            setDiplomeValue(e.target.value);
                            // }
                          }
                        }}
                        disabled={domaine === "" ? true : false}
                        as={Select}
                        name="diplome"
                        label="Diplome"
                      >
                        {diplome.map((dip, index) => {
                          return (
                            <MenuItem key={index} value={dip}>
                              {dip}
                            </MenuItem>
                          );
                        })}
                      </Field>
                      <FormHelperText>
                        {<ErrorMessage name="diplome" />}
                      </FormHelperText>
                    </FormControl>
                    <br />
                    <FormControl
                      size="small"
                      variant="outlined"
                      className={classes.textField}
                      error={errors.fili??re && touched.fili??re}
                    >
                      <InputLabel>Fili??re</InputLabel>
                      <Field
                        onClick={e => {
                          if (e.target.value) {
                            setFili??reValue(e.target.value);
                          }
                        }}
                        disabled={diplomeValue === "" ? true : false}
                        as={Select}
                        name="fili??re"
                        label="Fili??re"
                      >
                        {fili??res.map((dip, index) => {
                          return (
                            <MenuItem key={index} value={dip}>
                              {dip}
                            </MenuItem>
                          );
                        })}
                      </Field>
                      <FormHelperText>
                        {<ErrorMessage name="fili??re" />}
                      </FormHelperText>
                    </FormControl>
                    <br />

                    <FormControl
                      size="small"
                      variant="outlined"
                      className={classes.textField}
                      error={errors.section && touched.section}
                    >
                      <InputLabel>Section</InputLabel>
                      <Field
                        disabled={fili??reValue === "" ? true : false}
                        as={Select}
                        name="section"
                        label="Section"
                        onClick={e => {
                          if (e.target.value) {
                            setSectionValue(e.target.value);
                          }
                        }}
                      >
                        {section.map((sec, index) => {
                          return (
                            <MenuItem key={index} value={sec}>
                              {sec}
                            </MenuItem>
                          );
                        })}
                      </Field>
                      <FormHelperText>
                        {<ErrorMessage name="section" />}
                      </FormHelperText>
                    </FormControl>
                    <br />
                    {sectionValue ? (
                      <>
                        {" "}
                        <br />
                        <Divider />
                        <br />
                        <br />
                        <Field
                          fullWidth
                          as={TextField}
                          name="score"
                          variant="outlined"
                          className={classes.textField}
                          label="Score"
                          size="small"
                          helperText={<ErrorMessage name="score" />}
                          error={errors.score && touched.score}
                        />
                      </>
                    ) : (
                      ""
                    )}
                  </>
                ) : niveauEtude === "Dipl??m??" ? (
                  <>
                    <Divider
                      style={{ marginTop: "20px", marginBottom: "20px" }}
                    />

                    <FormControl
                      size="small"
                      variant="outlined"
                      className={classes.textField}
                      error={errors.diplomeCherche && touched.diplomeCherche}
                    >
                      <InputLabel>Type de dipl??me cherch??</InputLabel>
                      <Field
                        onClick={e => {
                          if (e.target.value) {
                            setdiplomeCherche(e.target.value);
                          }
                        }}
                        as={Select}
                        name="diplomeCherche"
                        label="Type de dipl??me cherch??"
                      >
                        {diplomesCherche.map((diplomeCh, index) => {
                          return (
                            <MenuItem key={index} value={diplomeCh}>
                              {diplomeCh}
                            </MenuItem>
                          );
                        })}
                      </Field>
                      <FormHelperText>
                        {<ErrorMessage name="diplomeCherche" />}
                      </FormHelperText>
                    </FormControl>
                    <br />

                    <FormControl
                      size="small"
                      variant="outlined"
                      className={classes.textField}
                      error={errors.domaineDip && touched.domaineDip}
                    >
                      <InputLabel>Domaine d'??tude</InputLabel>
                      <Field
                        onClick={e => {
                          if (e.target.value) {
                            setdomaineDipValue(e.target.value);
                          }
                        }}
                        disabled={diplomeCherche === "" ? true : false}
                        as={Select}
                        name="domaineDip"
                        label="Diplome cherch??"
                      >
                        {domaineDip.map((domaineDip, index) => {
                          return (
                            <MenuItem key={index} value={domaineDip}>
                              {domaineDip}
                            </MenuItem>
                          );
                        })}
                      </Field>
                      <FormHelperText>
                        {<ErrorMessage name="domaineDip" />}
                      </FormHelperText>
                    </FormControl>

                    <br />

                    <FormControl
                      size="small"
                      variant="outlined"
                      className={classes.textField}
                      error={errors.specialite && touched.specialite}
                    >
                      <InputLabel>Sp??cialit??</InputLabel>
                      <Field
                        onClick={e => {
                          if (e.target.value) {
                            setSpecialiteValue(e.target.value);
                          }
                        }}
                        disabled={domaineDipValue === "" ? true : false}
                        as={Select}
                        name="specialite"
                        label="Sp??cialit??"
                      >
                        {specialite.map((sep, index) => {
                          return (
                            <MenuItem key={index} value={sep}>
                              {sep}
                            </MenuItem>
                          );
                        })}
                      </Field>
                      <FormHelperText>
                        {<ErrorMessage name="specialite" />}
                      </FormHelperText>
                    </FormControl>

                    <br />
                  </>
                ) : null}
              </center>
            </Container>

            <div>
              <Button
                className={classes.soumettre}
                variant="contained"
                color="secondary"
                type="submit"
                size="large"
              >
                Se soumettre
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    {/* </Paper> */}
       
         
            </DialogContent>
        </Dialog>
    )
   
}
