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
  "Béja",
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
  "Médenine",
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
  "Littérature, langues et classes préparatoires littéraires",
  "Sciences humaines, sociales, religieuses et de l'éducation",
  "Culture, beaux-arts et arts",
  "Tourisme, revitalisation, sports et éducation physique",
  "Sciences juridiques et politiques",
  "Sciences économiques et de gestion",
  "Sciences et technologie",
  "Ingénierie architecturale et classes préparatoires scientifiques",
  "Sciences de la santé, médecine, dentisterie et pharmacie",
  "Sciences agronomiques, biotechnologies et environnement",
  "Éducation militaire",
];

const diplomesCherche = [
  "deuxiéme licence",
  "Mastère professionnel",
  "Mastère recherche",
  "Diplôme national d'ingénieur",
];

export default function Popupeditetud(props) {
  const {openPopupeditetud, setOpenPopupeditetud, data} = props;


 
  /***********************STATE******************************** */
  const classes = useStyles();
  const fileInputRef = useRef();

  // const [etudData, setEtudData] = useState({
  //   Nom_prénom: "",
  //   Ville: "",
  //   img: "",
  //   dataNiveau: {
  //     Niveau: "",
  //     domaine: "",
  //     diplome: "",
  //     filière: "",
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
  const [filières, setFilière] = useState([""]);
  const [filièreValue, setFilièreValue] = useState(data ? data.dataNiveau ? data.dataNiveau.filière :"" :"" );

  const [diplomeCherche, setdiplomeCherche] = useState(data ? data.dataNiveau ? data.dataNiveau.diplomeDip :"" :"");
  const [domaineDip, setdomaineDip] = useState([""]);
  const [domaineDipValue, setdomaineDipValue] = useState(data ? data.dataNiveau ? data.dataNiveau.domaineDip :"" :"");

  const [specialite, setSpecialite] = useState([""]);
  const [specialiteValue, setSpecialiteValue] = useState("");

  /*****************************DIPLOME***************************/
  const literature = ["Licence", "Diplome classes préparatoires"];
  const Sciences_humaines = ["Licence"];
  const Culture = ["Licence"];
  const Tourisme = ["Licence"];
  const politiques = ["Licence"];
  const économiques = ["Licence", "Bachelor of Business Administration"];
  const technologie = ["Licence"];
  const préparatoires = [
    "Architecture",
    "Licence",
    "Prépa-intégré",
    "Classe préparatoire",
  ];
  const santé = ["Médicine", "Pharmacie", "Dentisterie", "licence"];
  const biotechnologies = ["Licence"];
  const militaire = ["Licence", "Études d'ingénierie"];

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
    //   .matches(passeRegex, "Entrer des caractéres alpha-numérique")
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

  //   filière: Yup.string().when("diplome", {
  //     is: diplomeValue,
  //     then: Yup.string().required("champs obligatoire"),
  //   }),

  //   section: Yup.string().when("filière", {
  //     is: filièreValue,
  //     then: Yup.string().required("champs obligatoire"),
  //   }),

  //   score: Yup.number().when("section", {
  //     is: sectionValue,
  //     then: Yup.number()
  //       .typeError("score doit être un nombre")
  //       .min(80, "Score invalide")
  //       .max(240, "Score invalide")
  //       .required("champs obligatoire"),
  //   }),

  //   diplomeCherche: Yup.string().when("niveauEtude", {
  //     is: "Diplômé",
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
      domaine === "Littérature, langues et classes préparatoires littéraires"
    ) {
      setDiplome(literature);
    }
    if (
      domaine === "Sciences humaines, sociales, religieuses et de l'éducation"
    ) {
      setDiplome(Sciences_humaines);
    }
    if (domaine === "Culture, beaux-arts et arts") {
      setDiplome(Culture);
    }
    if (domaine === "Tourisme, revitalisation, sports et éducation physique") {
      setDiplome(Tourisme);
    }
    if (domaine === "Sciences juridiques et politiques") {
      setDiplome(politiques);
    }
    if (domaine === "Sciences économiques et de gestion") {
      setDiplome(économiques);
    }
    if (domaine === "Sciences et technologie") {
      setDiplome(technologie);
    }
    if (
      domaine ===
      "Ingénierie architecturale et classes préparatoires scientifiques"
    ) {
      setDiplome(préparatoires);
    }
    if (
      domaine === "Sciences de la santé, médecine, dentisterie et pharmacie"
    ) {
      setDiplome(santé);
    }
    if (domaine === "Sciences agronomiques, biotechnologies et environnement") {
      setDiplome(biotechnologies);
    }
    if (domaine === "Éducation militaire") {
      setDiplome(militaire);
    }
  }, [domaine]);

  /***********************FILIERE*************************** */
  const littérature_Licence = [
    "Licence en arabe",
    "Licence en anglais",
    "Licence en français",
    "Licence en espagnole",
    "Licence en italienne",
    "Licence en Allemagne",
    "Licence en langues des signes",
    "Licence en traduction",
  ];

  const littérature_prépa = [
    "Classe préparatoire en arabe",
    "Classe préparatoire en anglais ",
    "Classe préparatoire en français",
  ];

  const Sc_humaine_licence = [
    "Licence en sociologie",
    "Licence en psychologie",
    "Licence en philosophie",
    "Licence en archéologie",
    "Licence en éducation",
  ];

  const Tourisme_licence = [
    "Licence en sciences des activités physiques et sportives",
    "Licence en tourisme",
  ];

  const Politique_licence = ["Licence en droit", "Licence en droit social"];

  const économiques_licence = [
    "Licence en sciences économiques",
    "Licence en sciences de gestion",
    "Licence en comptabilité et finance",
    "Licence en commerce et distribution",
  ];

  const économiques_bachlor = ["Bachelor of Business Administration"];

  const technologie_licence = [
    "Licence en gestion de l'informatique",
    "licence en chimie",
    "Licence en chimie et physique",
    "Licence en physique",
    "Licence en physique et énergie",
    "Licence en mathématiques appliquées",
    "Licence en mathématiques",
    "Licence en biologie",
    "Licence en sciences de la Terre",
    "Licence en science informatique",
    "Licence en ingénierie des systèmes d'information",
    "Licence en génie civil",
    "Licence en génie mécanique",
    "Licence en technologies de l'information et de la communication",
    "Licence en génie logistique",
    "Licence en électronique et automatisation",
  ];

  const architecturale = ["Architecture"];

  const sc_licence = ["Licence en construction et préparation"];

  const prépa_intégré = [
    "préparatoire intégré en génie biomédical",
    "préparatoire intégré en génie des biotechnologies de la santé",
    "préparatoire intégré en informatique",
    "préparatoire intégré en physique-chimie et informatique",
  ];

  const préparatoire = [
    "préparatoire mathématiques-physique",
    "préparatoire chimie-physique",
    "préparatoire-technologie",
    "préparatoire biologie-géologie",
  ];

  const pharmacie = ["Diplôme national de docteur en pharmacie"];

  const médicine = ["Diplôme national de docteur en médecine"];

  const dentisterie = ["Diplôme national de docteur en médecine dentaire"];

  const licence_santé = [
    "licence en biotechnologie médicale",
    "licence en anesthésie et réanimation",
    "licence en imagerie médicale et radiothérapie",
    "licence en protection de la santé",
    "licence en biologie médicale",
    "licence en physiothérapie",
    "licence en chirurgie orthopédique",
    "licence en nutrition humaine",
    "licence en ergothérapie",
    "licence en Prosthodontie",
    "licence en génie biomédical",
    "licence en soins d'urgence et en réanimation",
    "licence sciences infirmières-Femme",
    "licence sciences infirmières-homme",
    "licence en obstétrique-Sage-femme",
  ];

  const licence_agronomique = [
    "licence en biotechnologie",
    "licence en sciences agronomiques",
    "licence en sciences de la mer - Femme",
    "licence en sciences de la mer - homme",
    "licence en industries alimentaires",
  ];

  const licence_militaire = [
    "Sciences infirmières",
    "Anesthésie et réanimation",
    "Sciences militaires",
    "Sciences juridiques et commerciales",
  ];

  const ing_militaire = [
    "Techniques d'armes",
    "Ingénierie en informatique",
    "Génie civil.",
    "Communications",
    "électromécanicien",
    "Conduite d'avion",
    "génie mécanique",
    "Télémécanique",
    "Aéromobile",
  ];

  const Culture_licence = [
    "Sciences musicales",
    "Théâtre et arts de la scène",
    "Conception de l'espace",
    "Conception des produits",
    "Publicité et audiovisuel",
    "Arts et communication",
  ];

  useEffect(() => {
    if (
      domaine === "Littérature, langues et classes préparatoires littéraires" &&
      diplomeValue === "Licence"
    ) {
      setFilière(littérature_Licence);
    }
    if (
      domaine === "Littérature, langues et classes préparatoires littéraires" &&
      diplomeValue === "Diplome classes préparatoires"
    ) {
      setFilière(littérature_prépa);
    }
    if (
      domaine ===
        "Sciences humaines, sociales, religieuses et de l'éducation" &&
      diplomeValue === "Licence"
    ) {
      setFilière(Sc_humaine_licence);
    }
    if (
      domaine === "Tourisme, revitalisation, sports et éducation physique" &&
      diplomeValue === "Licence"
    ) {
      setFilière(Tourisme_licence);
    }
    if (
      domaine === "Sciences juridiques et politiques" &&
      diplomeValue === "Licence"
    ) {
      setFilière(Politique_licence);
    }
    if (
      domaine === "Sciences économiques et de gestion" &&
      diplomeValue === "Licence"
    ) {
      setFilière(économiques_licence);
    }
    if (
      domaine === "Sciences économiques et de gestion" &&
      diplomeValue === "Bachelor of Business Administration"
    ) {
      setFilière(économiques_bachlor);
    }
    if (domaine === "Sciences et technologie" && diplomeValue === "Licence") {
      setFilière(technologie_licence);
    }
    if (
      domaine ===
        "Ingénierie architecturale et classes préparatoires scientifiques" &&
      diplomeValue === "Architecture"
    ) {
      setFilière(architecturale);
    }
    if (
      domaine ===
        "Ingénierie architecturale et classes préparatoires scientifiques" &&
      diplomeValue === "Licence"
    ) {
      setFilière(sc_licence);
    }
    if (
      domaine ===
        "Ingénierie architecturale et classes préparatoires scientifiques" &&
      diplomeValue === "Prépa-intégré"
    ) {
      setFilière(prépa_intégré);
    }
    if (
      domaine ===
        "Ingénierie architecturale et classes préparatoires scientifiques" &&
      diplomeValue === "Classe préparatoire"
    ) {
      setFilière(préparatoire);
    }
    if (
      domaine === "Sciences de la santé, médecine, dentisterie et pharmacie" &&
      diplomeValue === "Médicine"
    ) {
      setFilière(médicine);
    }
    if (
      domaine === "Sciences de la santé, médecine, dentisterie et pharmacie" &&
      diplomeValue === "Pharmacie"
    ) {
      setFilière(pharmacie);
    }
    if (
      domaine === "Sciences de la santé, médecine, dentisterie et pharmacie" &&
      diplomeValue === "Dentisterie"
    ) {
      setFilière(dentisterie);
    }
    if (
      domaine === "Sciences de la santé, médecine, dentisterie et pharmacie" &&
      diplomeValue === "licence"
    ) {
      setFilière(licence_santé);
    }
    if (
      domaine === "Sciences agronomiques, biotechnologies et environnement" &&
      diplomeValue === "Licence"
    ) {
      setFilière(licence_agronomique);
    }
    if (domaine === "Éducation militaire" && diplomeValue === "Licence") {
      setFilière(licence_militaire);
    }
    if (
      domaine === "Éducation militaire" &&
      diplomeValue === "Études d'ingénierie"
    ) {
      setFilière(ing_militaire);
    }
    if (
      domaine === "Culture, beaux-arts et arts" &&
      diplomeValue === "Licence"
    ) {
      setFilière(Culture_licence);
    }
  }, [domaine, diplomeValue]);

  /*********************************SECTION**************************** */
  useEffect(() => {
    if (filièreValue === "Licence en arabe") {
      setSection([
        "Lettre",
        "Mathématique",
        "Science exprémentale",
        "Economie et gestion",
        "Science informatique",
      ]);
    }
    if (filièreValue === "Licence en anglais") {
      setSection([
        "Lettre",
        "Mathématique",
        "Science exprémentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (filièreValue === "Licence en français") {
      setSection([
        "Lettre",
        "Mathématique",
        "Science exprémentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (filièreValue === "Licence en espagnole") {
      setSection([
        "Lettre",
        "Mathématique",
        "Science exprémentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (filièreValue === "Licence en italienne") {
      setSection([
        "Lettre",
        "Mathématique",
        "Science exprémentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (filièreValue === "Licence en Allemagne") {
      setSection([
        "Lettre",
        "Mathématique",
        "Science exprémentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (filièreValue === "Licence en langues des signes") {
      setSection([
        "Lettre",
        "Mathématique",
        "Science exprémentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (filièreValue === "Licence en traduction") {
      setSection([
        "Lettre",
        "Mathématique",
        "Science exprémentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (filièreValue === "Classe préparatoire en arabe") {
      setSection([
        "Lettre",
        "Mathématique",
        "Science exprémentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (filièreValue === "Classe préparatoire en anglais") {
      setSection([
        "Lettre",
        "Mathématique",
        "Science exprémentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (filièreValue === "Classe préparatoire en français") {
      setSection([
        "Lettre",
        "Mathématique",
        "Science exprémentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (filièreValue === "Licence en sociologie") {
      setSection([
        "Lettre",
        "Mathématique",
        "Science exprémentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (filièreValue === "Licence en psychologie") {
      setSection([
        "Lettre",
        "Mathématique",
        "Science exprémentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (filièreValue === "Licence en philosophie") {
      setSection([
        "Lettre",
        "Mathématique",
        "Science exprémentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (filièreValue === "Licence en archéologie") {
      setSection([
        "Lettre",
        "Mathématique",
        "Science exprémentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (filièreValue === "Licence en éducation") {
      setSection([
        "Lettre",
        "Mathématique",
        "Science exprémentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
      ]);
    }
    if (
      filièreValue ===
      "Licence en sciences des activités physiques et sportives"
    ) {
      setSection([
        "Lettre",
        "Mathématique",
        "Science exprémentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (filièreValue === "Licence en tourisme") {
      setSection([
        "Lettre",
        "Mathématique",
        "Science exprémentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (filièreValue === "Licence en droit") {
      setSection([
        "Lettre",
        "Mathématique",
        "Science exprémentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (filièreValue === "Licence en droit social") {
      setSection(["Lettre", "Economie et gestion"]);
    }
    if (filièreValue === "Licence en sciences économiques") {
      setSection([
        "Mathématique",
        "Science exprémentale",
        "Economie et gestion",
      ]);
    }
    if (filièreValue === "Licence en sciences de gestion") {
      setSection([
        "Mathématique",
        "Science exprémentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
      ]);
    }
    if (filièreValue === "Licence en comptabilité et finance") {
      setSection([
        "Mathématique",
        "Science exprémentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
      ]);
    }
    if (filièreValue === "Licence en commerce et distribution") {
      setSection([
        "Mathématique",
        "Science exprémentale",
        "Economie et gestion",
        "Science informatique , Science technique",
      ]);
    }
    if (filièreValue === "Bachelor of Business Administration") {
      setSection([
        "Mathématique",
        "Science exprémentale",
        "Economie et gestion",
        "Science informatique ",
      ]);
    }
    if (filièreValue === "Licence en gestion de l'informatique") {
      setSection([
        "Mathématique",
        "Science exprémentale",
        "Economie et gestion",
        "Science informatique ",
        "Science technique",
      ]);
    }
    if (filièreValue === "licence en chimie") {
      setSection(["Mathématique", "Science exprémentale", "Science technique"]);
    }
    if (filièreValue === "Licence en chimie et physique") {
      setSection(["Mathématique", "Science exprémentale", "Science technique"]);
    }
    if (filièreValue === "Licence en physique") {
      setSection(["Mathématique", "Science exprémentale", "Science technique"]);
    }
    if (filièreValue === "Licence en physique et énergie") {
      setSection(["Mathématique", "Science exprémentale", "Science technique"]);
    }
    if (filièreValue === "Licence en mathématiques appliquées") {
      setSection([
        "Mathématique",
        "Science exprémentale",
        "Science technique",
        "Science informatique",
      ]);
    }
    if (filièreValue === "Licence en mathématiques") {
      setSection([
        "Mathématique",
        "Science exprémentale",
        "Science technique",
        "Science informatique",
      ]);
    }
    if (filièreValue === "Licence en biologie") {
      setSection(["Mathématique", "Science exprémentale"]);
    }
    if (filièreValue === "Licence en sciences de la Terre") {
      setSection(["Mathématique", "Science exprémentale", "Science technique"]);
    }
    if (filièreValue === "Licence en science informatique") {
      setSection([
        "Mathématique",
        "Science exprémentale",
        "Science technique",
        "Science informatique",
      ]);
    }
    if (filièreValue === "Licence en ingénierie des systèmes d'information") {
      setSection([
        "Mathématique",
        "Science exprémentale",
        "Science technique",
        "Science informatique",
      ]);
    }
    if (filièreValue === "Licence en génie civil") {
      setSection([
        "Mathématique",
        "Science exprémentale",
        "Science technique",
        "Science informatique",
      ]);
    }
    if (filièreValue === "Licence en génie mécanique") {
      setSection([
        "Mathématique",
        "Science exprémentale",
        "Science technique",
        "Science informatique",
      ]);
    }
    if (
      filièreValue ===
      "Licence en technologies de l'information et de la communication"
    ) {
      setSection([
        "Mathématique",
        "Science exprémentale",
        "Science technique",
        "Science informatique",
      ]);
    }
    if (filièreValue === "Licence en génie logistique") {
      setSection([
        "Mathématique",
        "Science exprémentale",
        "Science technique",
        "Science informatique",
      ]);
    }
    if (filièreValue === "Licence en électronique et automatisation") {
      setSection([
        "Mathématique",
        "Science exprémentale",
        "Science technique",
        "Science informatique",
      ]);
    }
    if (filièreValue === "Architecture") {
      setSection([
        "Lettre",
        "Mathématique",
        "Science exprémentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (filièreValue === "Licence en construction et préparation") {
      setSection([
        "Lettre",
        "Mathématique",
        "Science exprémentale",
        "Economie et gestion",
        "Science technique",
      ]);
    }
    if (filièreValue === "préparatoire intégré en génie biomédical") {
      setSection(["Mathématique", "Science exprémentale"]);
    }
    if (
      filièreValue ===
      "préparatoire intégré en génie des biotechnologies de la santé"
    ) {
      setSection(["Mathématique", "Science exprémentale"]);
    }
    if (filièreValue === "préparatoire intégré en informatique") {
      setSection([
        "Mathématique",
        "Science exprémentale",
        "Science informatique",
        "Science technique",
      ]);
    }
    if (
      filièreValue === "préparatoire intégré en physique-chimie et informatique"
    ) {
      setSection([
        "Mathématique",
        "Science exprémentale",
        "Science informatique",
      ]);
    }
    if (filièreValue === "préparatoire mathématiques-physique") {
      setSection([
        "Mathématique",
        "Science exprémentale",
        "Science informatique",
      ]);
    }
    if (filièreValue === "préparatoire chimie-physique") {
      setSection([
        "Mathématique",
        "Science exprémentale",
        "Science informatique",
      ]);
    }
    if (filièreValue === "préparatoire-technologie") {
      setSection(["Science technique"]);
    }
    if (filièreValue === "préparatoire biologie-géologie") {
      setSection(["Mathématique", "Science exprémentale"]);
    }
    if (filièreValue === "Pharmacie") {
      setSection(["Mathématique", "Science exprémentale", "Lettre", "Sport"]);
    }
    if (filièreValue === "Médicine") {
      setSection(["Mathématique", "Science exprémentale", "Lettre", "Sport"]);
    }
    if (filièreValue === "Dentisterie") {
      setSection(["Mathématique", "Science exprémentale", "Lettre", "Sport"]);
    }
    if (filièreValue === "licence en biotechnologie médicale") {
      setSection(["Mathématique", "Science exprémentale"]);
    }
    if (filièreValue === "licence en anesthésie et réanimation") {
      setSection(["Mathématique", "Science exprémentale"]);
    }
    if (filièreValue === "licence en imagerie médicale et radiothérapie") {
      setSection(["Mathématique", "Science exprémentale"]);
    }
    if (filièreValue === "licence en protection de la santé") {
      setSection(["Mathématique", "Science exprémentale", "Lettre", "Sport"]);
    }
    if (filièreValue === "licence en biologie médicale") {
      setSection(["Mathématique", "Science exprémentale"]);
    }
    if (filièreValue === "licence en physiothérapie") {
      setSection(["Mathématique", "Science exprémentale", "Lettre", "Sport"]);
    }
    if (filièreValue === "licence en chirurgie orthopédique") {
      setSection(["Mathématique", "Science exprémentale"]);
    }
    if (filièreValue === "licence en nutrition humaine") {
      setSection(["Mathématique", "Science exprémentale", "Lettre", "Sport"]);
    }
    if (filièreValue === "licence en ergothérapie") {
      setSection(["Mathématique", "Science exprémentale", "Lettre", "Sport"]);
    }
    if (filièreValue === "licence en Prosthodontie") {
      setSection(["Mathématique", "Science exprémentale", "Lettre", "Sport"]);
    }
    if (filièreValue === "licence en génie biomédical") {
      setSection(["Mathématique", "Science exprémentale", "Lettre", "Sport"]);
    }
    if (filièreValue === "licence en soins d'urgence et en réanimation") {
      setSection(["Mathématique", "Science exprémentale", "Lettre", "Sport"]);
    }
    if (filièreValue === "licence sciences infirmières-Femme") {
      setSection(["Mathématique", "Science exprémentale", "Lettre", "Sport"]);
    }
    if (filièreValue === "licence sciences infirmières-homme") {
      setSection(["Mathématique", "Science exprémentale", "Lettre", "Sport"]);
    }
    if (filièreValue === "licence en obstétrique-Sage-femme") {
      setSection(["Mathématique", "Science exprémentale", "Lettre", "Sport"]);
    }
    if (filièreValue === "licence en biotechnologie") {
      setSection(["Mathématique", "Science exprémentale"]);
    }
    if (filièreValue === "licence en sciences agronomiques") {
      setSection(["Mathématique", "Science exprémentale", "Science technique"]);
    }
    if (filièreValue === "licence en sciences de la mer - Femme") {
      setSection(["Mathématique", "Science exprémentale", "Science technique"]);
    }
    if (filièreValue === "licence en sciences de la mer - homme") {
      setSection(["Mathématique", "Science exprémentale", "Science technique"]);
    }
    if (filièreValue === "licence en industries alimentaires") {
      setSection(["Mathématique", "Science exprémentale"]);
    }
    if (filièreValue === "Sciences infirmières") {
      setSection(["Mathématique", "Science exprémentale"]);
    }
    if (filièreValue === "Anesthésie et réanimation") {
      setSection(["Mathématique", "Science exprémentale"]);
    }
    if (filièreValue === "Sciences militaires") {
      setSection([
        "Lettre",
        "Mathématique",
        "Science exprémentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (filièreValue === "Sciences juridiques et commerciales") {
      setSection([
        "Lettre",
        "Mathématique",
        "Science exprémentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (filièreValue === "Techniques d'armes") {
      setSection(["Mathématique", "Science exprémentale", "Science technique"]);
    }
    if (filièreValue === "Ingénierie en informatique") {
      setSection(["Mathématique", "Science exprémentale", "Science technique"]);
    }
    if (filièreValue === "Génie civil") {
      setSection(["Mathématique", "Science exprémentale", "Science technique"]);
    }
    if (filièreValue === "Communications") {
      setSection(["Mathématique", "Science exprémentale", "Science technique"]);
    }
    if (filièreValue === "électromécanicien") {
      setSection(["Mathématique", "Science exprémentale", "Science technique"]);
    }
    if (filièreValue === "Conduite d'avion") {
      setSection(["Mathématique", "Science exprémentale", "Science technique"]);
    }
    if (filièreValue === "génie mécanique") {
      setSection(["Mathématique", "Science exprémentale", "Science technique"]);
    }
    if (filièreValue === "Télémécanique") {
      setSection(["Mathématique", "Science exprémentale", "Science technique"]);
    }
    if (filièreValue === "Aéromobile") {
      setSection(["Mathématique", "Science exprémentale", "Science technique"]);
    }
    if (filièreValue === "Sciences musicales") {
      setSection([
        "Lettre",
        "Mathématique",
        "Science exprémentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (filièreValue === "Théâtre et arts de la scène") {
      setSection([
        "Lettre",
        "Mathématique",
        "Science exprémentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (filièreValue === "Conception de l'espace") {
      setSection([
        "Lettre",
        "Mathématique",
        "Science exprémentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (filièreValue === "Conception des produits") {
      setSection([
        "Lettre",
        "Mathématique",
        "Science exprémentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (filièreValue === "Publicité et audiovisuel") {
      setSection([
        "Lettre",
        "Mathématique",
        "Science exprémentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
    if (filièreValue === "Arts et communication") {
      setSection([
        "Lettre",
        "Mathématique",
        "Science exprémentale",
        "Economie et gestion",
        "Science informatique",
        "Science technique",
        "Sport",
      ]);
    }
  }, [filièreValue]);

/**********************************DOMAINE**************************************** */
useEffect(() => {
  if (diplomeCherche === "deuxiéme licence") {
    setdomaineDip([
      "Littérature, langues",
      "Sciences humaines, sociales, religieuses",
      "Culture, beaux-arts et arts",
      "Tourisme, revitalisation",
      "Sciences juridiques et politiques",
      "Sciences économiques et de gestion",
      "Sciences et technologie",
      "Sciences agronomiques, biotechnologies et environnement"

    ]);
  }
  if (diplomeCherche === "Mastère professionnel") {
    setdomaineDip([
      "Littérature, langues",
      "Sciences humaines, sociales, religieuses et de l'éducation",
      "Culture, beaux-arts et arts",
      "Tourisme, revitalisation, sports et éducation physique",
      "Sciences juridiques et politiques",
      "Sciences économiques et de gestion",
      "Sciences et technologie",
      "Sciences agronomiques, biotechnologies et environnement",       
      "Sciences médicales et pharmaceutiques",
      "Architecture"
    ]);
  }
  if (diplomeCherche === "Mastère recherche") {
    setdomaineDip([
      "Littérature, langues",
      "Sciences humaines, sociales, religieuses et de l'éducation",
      "Tourisme, revitalisation, sports et éducation physique",
      "Sciences juridiques et politiques",
      "Sciences économiques et de gestion",
      "Sciences et technologie",
      "Sciences médicales et pharmaceutiques",
      "Architecture"
    ]);
  }
  if (diplomeCherche === "Diplôme national d'ingénieur") {
    setdomaineDip([
      "Sciences et technologie",

    ]);
  }

}, [diplomeCherche]);



/**********************************FILIERES**************************************** */
useEffect(() => {
  if (diplomeCherche === "deuxiéme licence" && 
  domaineDipValue === "Littérature, langues") {
    setSpecialite([
      "Licence en arabe",
      "Licence en anglais",
      "Licence en français",
      "Licence en espagnole",
      "Licence en italienne",
      "Licence en Allemagne",
      "Licence en langues des signes",
    ]);
  }
  if (diplomeCherche === "deuxiéme licence" && 
  domaineDipValue === "Sciences humaines, sociales, religieuses") {
    setSpecialite([
      "Licence en sociologie",
      "Licence en psychologie",
      "Licence en philosophie",
      "Licence en archéologie",
     ]);
  }
  if (diplomeCherche === "deuxiéme licence" && 
  domaineDipValue === "Culture, beaux-arts et arts") {
    setSpecialite([
      "Conception de l'espace",
      "Conception des produits",
      "Publicité et audiovisuel", 
      "Arts et communication"    
    ]);
  }
  if (diplomeCherche === "deuxiéme licence" && 
  domaineDipValue === "Tourisme, revitalisation") {
    setSpecialite([
      "Licence en tourisme",
    ]);
  }
  if (diplomeCherche === "deuxiéme licence" && 
  domaineDipValue === "Sciences juridiques et politiques") {
    setSpecialite([
      "Licence en droit"
        ]);
  }
  if (diplomeCherche === "deuxiéme licence" && 
  domaineDipValue === "Sciences économiques et de gestion") {
    setSpecialite([
      "Licence en sciences économiques",
      "Licence en sciences de gestion",
      "Licence en comptabilité et finance",
      "Licence en commerce et distribution",
      ]);
  }
  if (diplomeCherche === "deuxiéme licence" && 
  domaineDipValue === "Sciences et technologie") {
    setSpecialite([
      "Licence en gestion de l'informatique",
      "licence en chimie",
      "Licence en chimie et physique",
      "Licence en physique",
      "Licence en physique et énergie",
      "Licence en mathématiques appliquées",
      "Licence en mathématiques",
      "Licence en biologie",
      "Licence en sciences de la Terre",
      "Licence en science informatique",
      "Licence en ingénierie des systèmes d'information",
      "Licence en génie civil",
      "Licence en génie mécanique",
      "Licence en technologies de l'information et de la communication",
      "Licence en génie logistique",
      "Licence en électronique et automatisation",
          ]);
  }
  if (diplomeCherche === "deuxiéme licence" && 
  domaineDipValue === "Sciences médicales et pharmaceutiques") {
    setSpecialite([
      "licence en génie biomédical",
          ]);
  }
  if (diplomeCherche === "deuxiéme licence" && 
  domaineDipValue === "Sciences médicales et pharmaceutiques") {
    setSpecialite([
      "licence en génie biomédical",
          ]);
  }
  if (diplomeCherche === "deuxiéme licence" && 
  domaineDipValue === "Sciences agronomiques, biotechnologies et environnement") {
    setSpecialite([
      "licence en biotechnologie",
      "licence en sciences agronomiques",
    ]);
  }
 /*********************Mastère professionnel*************************** */
  if (diplomeCherche === "Mastère professionnel" && 
  domaineDipValue === "Littérature, langues") {
    setSpecialite([
      "Interprétation spécialisée en langue des signes",
      "Traduction appliquée aux droits et aux Sciences",
      "Langues, communication et entreprises",
      "Langue, Littérature et Civilisation Françaises",
      "Communication, langue et patrimoine"
    ]);
  }
  if (diplomeCherche === "Mastère professionnel" && 
  domaineDipValue === "Sciences humaines, sociales, religieuses et de l'éducation") {
    setSpecialite([
      "Psychologie de l'enfance et de l'adolescence",
      "Psychologie du travail: Formation, Orientation et Evaluation",
      "Ingénierie en intervention psychosociale",
      "Neuropsychologie clinique"
    ]);
  }
  if (diplomeCherche === "Mastère professionnel" && 
  domaineDipValue === "Culture, beaux-arts et arts") {
    setSpecialite([
    "Design textile et Mode",
    "Management du textile et de la mode",
    "Design et technologie",
    "Technologie des sciences des données"

    ]);
  }
  if (diplomeCherche === "Mastère professionnel" && 
  domaineDipValue === "Tourisme, revitalisation, sports et éducation physique") {
    setSpecialite([
      "entrainement et préparation physique",
    ]);
  }
  if (diplomeCherche === "Mastère professionnel" && 
  domaineDipValue === "Sciences juridiques et politiques") {
    setSpecialite([
      "Droit des affaires",
      "Droit des affaires foncières"
      ]);
  }
  if (diplomeCherche === "Mastère professionnel" && 
  domaineDipValue === "Sciences économiques et de gestion") {
    setSpecialite([
      "Banques",
      "Comptabilité",
      "Évaluation et Gestion des risques en Finance et assurance",
      "Statistiques appliquées",
      "Affaires commerciales internationales",
      "Ingénierie de l'information pour la gestion de l'entreprise",
      "Ingénerie financière",
      "Entrepreneuriat: Entrepreneuriat et Management des projets",
      "Master Of Mgmt Of Non-Profit Organizations",
      "Master Of BA"
    ]);
  }
  if (diplomeCherche === "Mastère professionnel" && 
  domaineDipValue === "Sciences et technologie") {
    setSpecialite([
      "Géomatique",
      "Géophysique Appliquée",
      "Hygiène et Sécurité Appliquées",
      "Système Réseaux et Télécommunication" ,
      "Sécurité des systèmes informatiques communiquant et embarqués",
      "Innovation Management",
      "Analyses Physico-chimiques et Environnement",
      " Instrumentation avancée et applications",
      "Ingénierie des Systèmes d'Informations",
      "Génie logiciel",
      "Contrôle qualité des aliments et hygiène",
      "Technologie en production mécanique",
      "Biotechnologie",
    ]);
  }
  if (diplomeCherche === "Mastère professionnel" && 
  domaineDipValue === "Sciences agronomiques, biotechnologies et environnement") {
    setSpecialite([
      "Qualité, environnement et sécurité",
      "Technologies des vivants et de l'environnement",
      "Agroalimentaire (technologies alimentaires)"
      ]);
  }
  if (diplomeCherche === "Mastère professionnel" && 
  domaineDipValue === "Sciences médicales et pharmaceutiques") {
    setSpecialite([
      "Systèmes électroniques embarqués et traitement de l'information médicale",
      "Génie Biomédical",
      "Nutrition humaine",
      "Gestion des soins critiques:urgences",
      "Mastère professionnel en Ergonomie",
      "Mastère professionnel en médecine de famille",
      "Qualitologie et Management de la Qualité dans le Domaine de la Santé",
      "Hémobiologie, Transfusion et Thérapie Cellulaire",
      " Management de la santé publique MedHealth",
      "Orthodontie fonctionnelle et esthétique"
    ]);
  }
  if (diplomeCherche === "Mastère professionnel" && 
  domaineDipValue === "Architecture") {
    setSpecialite([
      "Urbanisme",
    ]);
  }
 /*********************Mastère recherche*************************** */
  if (diplomeCherche === "Mastère recherche" && 
  domaineDipValue === "Littérature, langues") {
    setSpecialite([
      "Langues, Lettres et Civilisation Arabes",
      "Littératures et linguistique Françaises",
    ]);
  }
  if (diplomeCherche === "Mastère recherche" && 
  domaineDipValue === "Sciences humaines, sociales, religieuses et de l'éducation") {
    setSpecialite([
      "Inter-cultural studies",
      "Philosophie des lumières et de la modernité",
      "Sociologie et Développement"    
     ]);
  }
  if (diplomeCherche === "Mastère recherche" && 
  domaineDipValue === "Tourisme, revitalisation, sports et éducation physique") {
    setSpecialite([
      "Sciences des activités physiques et sportives",  
      "Didactique des activités physiques et sportives",
    ]);
  }
  if (diplomeCherche === "Mastère recherche" && 
  domaineDipValue === "Sciences juridiques et politiques") {
    setSpecialite([
      "Droit privé",
      "Sciences criminelles",
      "Sciences politiques",
      "Droit public et Sciences politiques"
      ]);
  }
  if (diplomeCherche === "Mastère recherche" && 
  domaineDipValue === "Sciences économiques et de gestion") {
    setSpecialite([
      "Comptabilité",
      "Finance",
      "Méthodes quantitatives",
      "Economie et finance internationales",
      "Economie monétaire et bancaire",
      "Marketing",
      "Management",
      "Banque et Finance Internationale",
    ]);
  }
  if (diplomeCherche === "Mastère recherche" && 
  domaineDipValue === "Sciences et technologie") {
    setSpecialite([
      "Mathématiques Appliquées",
      "Matière Condensée",
      "Mathématiques Fondamentales",
      "Biochimie",
      "Informatique",
      "Modélisation et calcul scientifique",
      "Systèmes de communications",
      "Traitement de l’information et complexité du vivant",
      "Microélectronique et Instrumentation",
      "Sciences de l'informatique: Génie logiciel",
      "Génie mécanique",
      "Génie énergétique: Administration des affaires en énergie"
      
    ]);
  }
  if (diplomeCherche === "Mastère recherche" && 
  domaineDipValue === "Sciences médicales et pharmaceutiques") {
    setSpecialite([
      "Biophysique, Radio-physique et Imagerie Médicale",
      "Biologie médicale et Technologie de la Santé",
      "Développement des Médicaments",
      "Santé, exploration et prévention"
    ]);
  }
  if (diplomeCherche === "Mastère recherche" && 
  domaineDipValue === "Architecture") {
    setSpecialite([
      "Urbanisme et Aménagement",
      "Sciences de l'architecture"
    ]);
  }
  if (diplomeCherche === "Diplôme national d'ingénieur" && 
  domaineDipValue === "Sciences et technologie"){
    setSpecialite([
    "Génie Electrique",
    "Génie Hydraulique et environnement",
    "Génie Civil",
    "Génie Mécanique",
    "Génie Industriel",
    "Informatique",
    "Techniques Avancées",
    "Télécommunications",
    "Chimie Analytique",
    "Géosciences",
    "Électronique",
    "Génie Informatique des Systèmes Industriels",
    "Génie du Logiciel et des Systèmes d'Information",
    "Génie énergétique",
    "Génie textile",
    "Microélectronique"
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
        filière: props.filière,
        section: props.section,
        score: props.score,
        diplome: props.diplome,
      };

      const niveau = {
        _id: data._id,
        Ville: props.ville,
        Nom_prénom: props.nom,
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
          title: "Modifié avec succès",
          html: '<span style="color:#FFFFFF">Les champs sont bien modifiés. </span>',
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
        filière: props.filière,
        section: props.section,
        score: props.score,
        diplome: props.diplome,
      };

      const niveau = {
        _id: data._id,
        Ville: props.ville,
        Nom_prénom: props.nom,
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
          title: "Modifié avec succès",
          html: '<span style="color:#FFFFFF">Les champs sont bien modifiés. </span>',
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
    if (niveauEtude === "" && data.dataNiveau.Niveau === "Diplômé") {
      const dataDiplome = {
        Niveau: props.niveauEtude,
        diplomeDip: props.diplomeCherche,
        domaineDip: props.domaineDip,
        specialite: props.specialite,
      };
      const niveau = {
        _id: data._id,
        Ville: props.ville,
        Nom_prénom: props.nom,
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
          title: "Modifié avec succès",
          html: '<span style="color:#FFFFFF">Les champs sont bien modifiés. </span>',
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

    if (niveauEtude === "Diplômé") {
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
        Nom_prénom: props.nom,
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
          title: "Modifié avec succès",
          html: '<span style="color:#FFFFFF">Les champs sont bien modifiés. </span>',
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
        Nom_prénom: props.nom,
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
          title: "Modifié avec succès",
          html: '<span style="color:#FFFFFF">Les champs sont bien modifiés. </span>',
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
         setFilièreValue(data ? data.dataNiveau ? data.dataNiveau.filière :"" :"" );
         setSectionValue(data ? data.dataNiveau ? data.dataNiveau.section :"" :"" );
        setdiplomeCherche(data ? data.dataNiveau ? data.dataNiveau.diplomeDip :"" :"");
         setdomaineDipValue(data ? data.dataNiveau ? data.dataNiveau.domaineDip :"" :"");
   
    };

    getEtudData();
  }, [data]); //UNE SEUL FOIS

  const initialValues = {
    img: data.img,
    nom: data.Nom_prénom,
    email: data.email,
    // M_passe: data.M_passe,
    // Confirm_M_passe: data.M_passe,
    status: data.status,
    niveauEtude: data ? data.dataNiveau ? data.dataNiveau.Niveau :"" :"",
    ville: data.Ville,
    section: data ? data.dataNiveau ? data.dataNiveau.section :"" :"",
    diplome: data ? data.dataNiveau ? data.dataNiveau.diplome :"" :"",
    domaine:data ? data.dataNiveau ? data.dataNiveau.domaine :"" :"",
    filière:data ? data.dataNiveau ? data.dataNiveau.filière :"" :"",
    
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
              Accéder à votre profil
            </Button>
          </Link> */}
        </Box>
      </Box>

      {/* <br />
      <Divider />
      <br />
      <center>
        <em>
          Afin d'utiliser les services de site, il est nécessaire que vous nous
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
                  <InputLabel>Niveau d'étude</InputLabel>
                  <Field
                    as={Select}
                    name="niveauEtude"
                    label="Niveau d'étude"
                    onClick={e => {
                      if (e.target.value) {
                        setNiveauEtude(e.target.value);
                      }
                    }}
                  >
                    <MenuItem value={"Bachelier"}>Bachelier </MenuItem>
                    <MenuItem value={"Diplômé"}>Diplômé</MenuItem>
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
                        error={errors.filière && touched.filière}
                      >
                        <InputLabel>Filière</InputLabel>
                        <Field
                          onClick={e => {
                            if (e.target.value) {
                              setFilièreValue(e.target.value);
                            }
                          }}
                          as={Select}
                          name="filière"
                          label="Filière"
                        >
                          {filières.map((dip, index) => {
                            return (
                              <MenuItem key={index} value={dip}>
                                {dip}
                              </MenuItem>
                            );
                          })}
                        </Field>
                        <FormHelperText>
                          {<ErrorMessage name="filière" />}
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
                            NB: Entrez le score total pour cette filiére (T= FG
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
                      ) : data.dataNiveau.Niveau === "Diplômé" ? (
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
                            <InputLabel>Type de diplôme cherché</InputLabel>
                            <Field
                              onClick={e => {
                                if (e.target.value) {
                                  setdiplomeCherche(e.target.value);
                                }
                              }}
                              as={Select}
                              name="diplomeCherche"
                              label="Type de diplôme cherché"
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
                            <InputLabel>Domaine d'étude</InputLabel>
                            <Field
                              onClick={e => {
                                if (e.target.value) {
                                  setdomaineDipValue(e.target.value);
                                }
                              }}
                              as={Select}
                              name="domaineDip"
                              label="Diplome cherché"
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
                            <InputLabel>Spécialité</InputLabel>
                            <Field
                              onClick={e => {
                                if (e.target.value) {
                                  setSpecialiteValue(e.target.value);
                                }
                              }}
                              as={Select}
                              name="specialite"
                              label="Spécialité"
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
                  ) : data.dataNiveau.Niveau === "Diplômé" ? (
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
                        <InputLabel>Type de diplôme cherché</InputLabel>
                        <Field
                          onClick={e => {
                            if (e.target.value) {
                              setdiplomeCherche(e.target.value);
                            }
                          }}
                          as={Select}
                          name="diplomeCherche"
                          label="Type de diplôme cherché"
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
                        <InputLabel>Domaine d'étude</InputLabel>
                        <Field
                          onClick={e => {
                            if (e.target.value) {
                              setdomaineDipValue(e.target.value);
                            }
                          }}
                          as={Select}
                          name="domaineDip"
                          label="Diplome cherché"
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
                        <InputLabel>Spécialité</InputLabel>
                        <Field
                          onClick={e => {
                            if (e.target.value) {
                              setSpecialiteValue(e.target.value);
                            }
                          }}
                          as={Select}
                          name="specialite"
                          label="Spécialité"
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
                        disabled={filièreValue === "" ? true : false}
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
                      error={errors.filière && touched.filière}
                    >
                      <InputLabel>Filière</InputLabel>
                      <Field
                        onClick={e => {
                          if (e.target.value) {
                            setFilièreValue(e.target.value);
                          }
                        }}
                        disabled={diplomeValue === "" ? true : false}
                        as={Select}
                        name="filière"
                        label="Filière"
                      >
                        {filières.map((dip, index) => {
                          return (
                            <MenuItem key={index} value={dip}>
                              {dip}
                            </MenuItem>
                          );
                        })}
                      </Field>
                      <FormHelperText>
                        {<ErrorMessage name="filière" />}
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
                        disabled={filièreValue === "" ? true : false}
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
                ) : niveauEtude === "Diplômé" ? (
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
                      <InputLabel>Type de diplôme cherché</InputLabel>
                      <Field
                        onClick={e => {
                          if (e.target.value) {
                            setdiplomeCherche(e.target.value);
                          }
                        }}
                        as={Select}
                        name="diplomeCherche"
                        label="Type de diplôme cherché"
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
                      <InputLabel>Domaine d'étude</InputLabel>
                      <Field
                        onClick={e => {
                          if (e.target.value) {
                            setdomaineDipValue(e.target.value);
                          }
                        }}
                        disabled={diplomeCherche === "" ? true : false}
                        as={Select}
                        name="domaineDip"
                        label="Diplome cherché"
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
                      <InputLabel>Spécialité</InputLabel>
                      <Field
                        onClick={e => {
                          if (e.target.value) {
                            setSpecialiteValue(e.target.value);
                          }
                        }}
                        disabled={domaineDipValue === "" ? true : false}
                        as={Select}
                        name="specialite"
                        label="Spécialité"
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
