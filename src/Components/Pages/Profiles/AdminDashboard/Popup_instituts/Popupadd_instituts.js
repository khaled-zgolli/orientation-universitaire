import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Dialog, DialogContent, FormControl, FormControlLabel, FormHelperText, InputLabel, makeStyles, MenuItem, Select, TextField } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import { ErrorMessage, Field, Form, Formik, FieldArray } from "formik";
import AddBoxIcon from "@material-ui/icons/AddBox";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";


const universites = [
  "Sousse",
  "Monastir",
  "Tunis",
  "Zaytouna",
  "Tunis Manar",
  "Carthage",
  "Manouba",
  "Kairouan",
  "Sfax",
  "Jendouba",
  "Gabes",
  "Gafsa",

]
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
const Sections = [
  "Lettre",
  "Mathématique",
  "Science exprémentale",
  "Economie et gestion",
  "Science informatique",
  "Science technique",
  "Sport"
];
const filieres =[
  "Licence en arabe",
  "Licence en anglais",
  "Licence en français",
  "Licence en espagnole",
  "Licence en italienne",
  "Licence en Allemagne",
  "Licence en langues des signes",
  "Licence en traduction", 
  "Diplome classes préparatoires en arabe",
  "Diplome classes préparatoires en anglais ",
  "Diplome classes préparatoires en français",
  "Licence en sociologie",
  "Licence en psychologie",
  "Licence en philosophie",
  "Licence en archéologie",
  "Licence en éducation",
  "Licence en sciences des activités physiques et sportives",
  "Licence en tourisme",
  "Licence en droit", 
  "Licence en droit social",
  "Licence en sciences économiques",
  "Licence en sciences de gestion",
  "Licence en comptabilité et finance",
  "Licence en commerce et distribution",
  "Bachelor of Business Administration",
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
  "Architecture",
  "Licence en construction et préparation",
  "préparatoire intégré en génie biomédical",
  "préparatoire intégré en génie des biotechnologies de la santé",
  "préparatoire intégré en informatique",
  "préparatoire intégré en physique-chimie et informatique",
  "préparatoire mathématiques-physique",
  "préparatoire chimie-physique",
  "préparatoire-technologie",
  "préparatoire biologie-géologie",
  "Diplôme national de docteur en pharmacie",
  "Diplôme national de docteur en médecine",
  "Diplôme national de docteur en médecine dentaire",
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
  "licence en biotechnologie",
  "licence en sciences agronomiques",
  "licence en sciences de la mer - Femme",
  "licence en sciences de la mer - homme",
  "licence en industries alimentaires",
  "Sciences infirmières",
  "Anesthésie et réanimation",
  "Sciences militaires",
  "Sciences juridiques et commerciales",
  "Techniques d'armes",
  "Ingénierie en informatique",
  "Génie civil.",
  "Communications",
  "électromécanicien",
  "Conduite d'avion",
  "génie mécanique",
  "Télémécanique",
  "Aéromobile",
  "Sciences musicales",
  "Théâtre et arts de la scène",
  "Conception de l'espace",
  "Conception des produits",
  "Publicité et audiovisuel",
  "Arts et communication",
  "Conception de l'espace",
  "Conception des produits",
  "Publicité et audiovisuel", 
  "Arts et communication",
  "Interprétation spécialisée en langue des signes",
  "Traduction appliquée aux droits et aux Sciences",
  "Langues, communication et entreprises",
  "Langue, Littérature et Civilisation Françaises",
  "Communication, langue et patrimoine",
  "Psychologie de l'enfance et de l'adolescence",
  "Psychologie du travail: Formation, Orientation et Evaluation",
  "Ingénierie en intervention psychosociale",
  "Neuropsychologie clinique",
  "Design textile et Mode",
  "Management du textile et de la mode",
  "Design et technologie",
  "Technologie des sciences des données",
  "entrainement et préparation physique",
  "Droit des affaires",
  "Droit des affaires foncières",
  "Banques",
  "Comptabilité",
  "Évaluation et Gestion des risques en Finance et assurance",
  "Statistiques appliquées",
  "Affaires commerciales internationales",
  "Ingénierie de l'information pour la gestion de l'entreprise",
  "Ingénerie financière",
  "Entrepreneuriat: Entrepreneuriat et Management des projets",
  "Master Of Mgmt Of Non-Profit Organizations",
  "Master Of BA",
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
  "Qualité, environnement et sécurité",
  "Technologies des vivants et de l'environnement",
  "Agroalimentaire (technologies alimentaires)",
  "Systèmes électroniques embarqués et traitement de l'information médicale",
  "Génie Biomédical",
  "Nutrition humaine",
  "Gestion des soins critiques:urgences",
  "Mastère professionnel en Ergonomie",
  "Mastère professionnel en médecine de famille",
  "Qualitologie et Management de la Qualité dans le Domaine de la Santé",
  "Hémobiologie, Transfusion et Thérapie Cellulaire",
  " Management de la santé publique MedHealth",
  "Orthodontie fonctionnelle et esthétique",
  "Urbanisme",
  "Langues, Lettres et Civilisation Arabes",
  "Littératures et linguistique Françaises",
  "Inter-cultural studies",
  "Philosophie des lumières et de la modernité",
  "Sociologie et Développement",
  "Sciences des activités physiques et sportives",  
  "Didactique des activités physiques et sportives",
  "Droit privé",
  "Sciences criminelles",
  "Sciences politiques",
  "Droit public et Sciences politiques",
  "Comptabilité",
  "Finance",
  "Méthodes quantitatives",
  "Economie et finance internationales",
  "Economie monétaire et bancaire",
  "Marketing",
  "Management",
  "Banque et Finance Internationale",
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
  "Génie énergétique: Administration des affaires en énergie",
  "Biophysique, Radio-physique et Imagerie Médicale",
  "Biologie médicale et Technologie de la Santé",
  "Développement des Médicaments",
  "Santé, exploration et prévention",
  "Urbanisme et Aménagement",
  "Sciences de l'architecture",
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
]

const useStyles = makeStyles(theme => ({
  customizedButton: {
    position: "absolute",
    left: "93%",
    top: "3%",
    backgroundColor: "",
    color: "gray",
  },
  button: {
    width: theme.spacing(20),
    margin: theme.spacing(2),
  },
  textField: {
    margin: theme.spacing(1),
    width :"100%"
  },
  border: {
    border: "1px solid",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  select: {
    marginLeft: theme.spacing(1),
    width: "48%",
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  Image: {
    width: '860px',
    height: '300px',
  },

}));
const nmRegex = RegExp(
  /^[0-9]{8}$/
);

const validationSchema = Yup.object().shape({
  nom: Yup.string().required("champs obligatoire"),
  universite: Yup.string().required("champs obligatoire"),
  ville: Yup.string().required("champs obligatoire"),
  Description: Yup.string().required("champs obligatoire"),
  site: Yup.string().required("champs obligatoire"),
  email: Yup.string().email().required("champs obligatoire"),
  adress: Yup.string().required("champs obligatoire"),
  numero: Yup.string().matches(nmRegex, "Numero invalide").required("champs obligatoire"),
  filière: Yup.array().of(
    Yup.object().shape({
      filièreNom: Yup.string().required("champs obligatoire"),
      domaine: Yup.string().required("champs obligatoire"),
      diplome: Yup.string().required("champs obligatoire"),
      description : Yup.string().required("champs obligatoire"),
      section: Yup.array().of(
        Yup.object().shape({
          sectionName: Yup.string().required("champs obligatoire"),
          score: Yup.string().required("champs obligatoire"),
        })
      ),
    })
  ),
});

const options_domaines  = [
  {
    key: "Littérature, langues et classes préparatoires littéraires",
    value: "Littérature, langues et classes préparatoires littéraires",
  },
  {
    key: "Sciences humaines, sociales, religieuses et de l'éducation",
    value: "Sciences humaines, sociales, religieuses et de l'éducation",
  },
  {
    key: "Tourisme, revitalisation, sports et éducation physique",
    value: "Tourisme, revitalisation, sports et éducation physique",
  },   
  {
    key: "Sciences juridiques et politiques",
    value: "Sciences juridiques et politiques",
  }, 
  {
  key: "Culture, beaux-arts et arts",
  value: "Culture, beaux-arts et arts",
  }, 
  {
    key: "Sciences économiques et de gestion",
    value: "Sciences économiques et de gestion",
  },   
  {
    key: "Sciences et technologie",
    value: "Sciences et technologie",
  },     
  {
    key: "Ingénierie architecturale et classes préparatoires scientifiques",
    value: "Ingénierie architecturale et classes préparatoires scientifiques",
  },      
  {
    key: "Sciences de la santé, médecine, dentisterie et pharmacie",
    value: "Sciences de la santé, médecine, dentisterie et pharmacie",
  },  
  {
    key: "Sciences agronomiques, biotechnologies et environnement",
    value: "Sciences agronomiques, biotechnologies et environnement",
  },
 { 
   key: "Éducation militaire",
  value: "Éducation militaire",
 },      
];

const Diplomes  = [
  {
    key: "Licence",
    value: "Licence",
  },
  {
    key: "deuxiéme licence",
    value: "deuxiéme licence",
  },
  {
    key: "Diplome classes préparatoires",
    value: "Diplome classes préparatoires",
  }, 
  {
    key: "Prépa-intégré",
    value: "Prépa-intégré",
  },   
  {
    key: "Architecture",
    value: "Architecture",
  }, 
  {
    key: "Médicine",
    value: "Médicine",
  },   
  {
    key: "Pharmacie",
    value: "Pharmacie",
  },     
  {
    key: "Dentisterie",
    value: "Dentisterie",
  },      
  {
    key: "Ecoles d'ingenieurs",
    value: "Ecoles d'ingenieurs",
  },  
  {
    key: "Études d'ingénierie",
    value: "Études d'ingénierie",
  },
 { 
   key: "Mastère professionnel",
   value: "Mastère professionnel",
 },  
 { 
  key: "Mastère recherche",
  value: "Mastère recherche",
  },
  { 
    key: "Diplôme national d'ingénieur",
    value: "Diplôme national d'ingénieur",
  },           
];
const initialValues = {
  img:"",
  nom: "",
  universite: "",
  ville: "",
  Description:"",
  site:"",
  email:"",
  adress:"",
  numero:"",
  filière: [
    {
      filièreNom: "",
      diplome: "",
      domaine: "",
      description:"",
      section: [
        {
          sectionName: "",
          score: "",
        },
      ],
    },
  ],
};

export default function Popupadd(props) {
  const { openPopup, setOpenPopup } = props;


  const defaultImage = "data:image/png;base64,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"
  const classes = useStyles();

  const handleSubmit = props => {
    axios({
      url: "http://localhost:4000/api/data/addEtablissement",
      method: "post",
      data: {
      img: preview,
      nom: props.nom,
      universite: props.universite,
      ville: props.ville,
      filière: props.filière,
      Description: props.Description,
      site: props.site,
      email: props.email,
      adress: props.adress,
      numero: props.numero

    },
    }) .then((res)=>{
     
      setOpenPopup(false)
       Swal.fire({
      icon:'success',
      title: "Bien ajouté",
      html : '<span style="color:#FFFFFF"> </span>',
      showCloseButton: false,
      showConfirmButton: false,
      background: "black",
      timer: 2000,
    })                        
     setTimeout(() => {
      window.location.reload();
     }, 2000); 
  })

 .catch((err)=> {
  setOpenPopup(false)

  Swal.fire({
      icon:'warning',
      html : '<span style="color:#FFF6C5"> </span>',
      showCloseButton: false,
      showConfirmButton: false,
      background: "black",
      timer: 3500,

    })

 })
  };

  // *********************************************
  
  const [Image, setImage] = useState();
  const fileInputRef = useRef();
  const [preview, setPreview] = useState(defaultImage);
 

  useEffect(() => {
    if (Image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result );
      };
      reader.readAsDataURL(Image);
    } else {
      setPreview(Image); 
    }
  }, [Image]);

  return (
    <Container>
      <Dialog open={openPopup} maxWidth="md">
        <DialogContent>
          <IconButton
            className={classes.customizedButton}
            onClick={() => {
              setOpenPopup(false);
            }}
          >
            <CloseIcon />
          </IconButton>
          <h1>Ajouter un établissement</h1>
          <br />
          <br />
          <Formik
            validateOnChange={false}
            validateOnBlur={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, values }) => (
              <Form noValidate autoComplete="off">
                 <div>
                    <img
                        src={preview ? preview : defaultImage}
                        alt=""
                        className={classes.Image}
                        onClick={() => {
                        setImage(null);
                        }}
                    />
                    <br/> <br/>
                    <input
                        name="img"
                        type="file"
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={(e) => {
                        const file = e.target.files[0];
                        if (file && file.type.substr(0, 5) === 'image') {
                            setImage(file);
                        } 
                        else {
                            setImage(null);
                        }
                        }}
                    />
                    <center>
                    <Button 
                    variant="contained" 
                    color="primary" 
                    className={classes}
                    onClick={(e) => {
                        e.preventDefault();
                        fileInputRef.current.click();
                    }}
                    >
                    Selectionner une Image
                    </Button>
                    </center><br/>
                    </div>


                <Field
                  fullWidth
                  as={TextField}
                  name="nom"
                  variant="outlined"
                  className={classes.textField}
                  label="Nom d'établissement"
                  size="small"
                  helperText={<ErrorMessage name="nom" />}
                  error={errors.nom && touched.nom}
                />
              <FormControl
                 
                 size="small"
                  variant="outlined"
                  className={classes.textField}
                  error={errors.universite && touched.universite}
                >
                  <InputLabel>Universite</InputLabel>
                  <Field as={Select}  name="universite" label="universite" >
                    {universites.map((univ, index) => {
                      return (
                        <MenuItem key={index} value={univ}>
                          {univ}
                        </MenuItem>
                      );
                    })}
                  </Field>

                  <FormHelperText>
                    {<ErrorMessage name="ville" />}
                  </FormHelperText>
                </FormControl>

              <FormControl
                 
                 size="small"
                  variant="outlined"
                  className={classes.textField}
                  error={errors.ville && touched.ville}
                >
                  <InputLabel>Ville</InputLabel>
                  <Field as={Select}  name="ville" label="Ville" >
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

                <Field
                multiline={true}
                rows={3}
                as={TextField}
                name="Description"
                variant="outlined"
                className={classes.textField}
                label="Description"
                size="small"
                helperText={<ErrorMessage name="Description" />}
                error={errors.Description && touched.Description}
              />          
                <Field
                  fullWidth
                  as={TextField}
                  name="site"
                  variant="outlined"
                  className={classes.textField}
                  label="Site"
                  size="small"
                  helperText={<ErrorMessage name="site" />}
                  error={errors.site && touched.site}
                />
                <Field
                  fullWidth
                  as={TextField}
                  name="email"
                  variant="outlined"
                  className={classes.textField}
                  label="email"
                  size="small"
                  helperText={<ErrorMessage name="email" />}
                  error={errors.email && touched.email}
                />
                <Field
                  fullWidth
                  as={TextField}
                  name="adress"
                  variant="outlined"
                  className={classes.textField}
                  label="Adresse"
                  size="small"
                  helperText={<ErrorMessage name="adress" />}
                  error={errors.adress && touched.adress}
                />
                <Field
                  fullWidth
                  as={TextField}
                  name="numero"
                  variant="outlined"
                  className={classes.textField}
                  label="Numero"
                  size="small"
                  helperText={<ErrorMessage name="numero" />}
                  error={errors.numero && touched.numero}
                />

                <FieldArray
                  name="filière"
                  render={array => {
                    const { push, remove } = array;
                    const filière = values.filière;

                    return (
                      <React.Fragment>
                        {filière.map((spec, index) => {
                          return (
                            <React.Fragment>
                              <div className={classes.border}>
                              <FormControl
                 
                 size="small"
                  variant="outlined"
                  className={classes.textField}
                  error={
                    (errors.filière
                      ? errors.filière[index]
                        ? errors.filière[index].filièreNom
                          ? true
                          : false
                        : false
                      : false) &&
                    (touched.filière
                      ? touched.filière[index]
                        ? touched.filière[index]
                            .filièreNom
                          ? true
                          : false
                        : false
                      : false)
                  }
                >
                  <InputLabel>Filière</InputLabel>
                  <Field as={Select}   name={`filière.${index}.filièreNom`} label="Filière" >
                    {filieres.map((filiere, index) => {
                      return (
                        <MenuItem key={index} value={filiere}>
                          {filiere}
                        </MenuItem>
                      );
                    })}
                  </Field>

                  <FormHelperText>
                    {<ErrorMessage   name={`filière.${index}.filièreNom`} />}
                  </FormHelperText>
                </FormControl>



                                {/* <Field
                                  style={{ width: "98.5%" }}
                                  as={TextField}
                                  name={`filière.${index}.filièreNom`}
                                  variant="outlined"
                                  className={classes.textField}
                                  label="Filière"
                                  size="small"
                                  helperText={
                                    <ErrorMessage
                                      name={`filière.${index}.filièreNom`}
                                    />
                                  }
                                  error={
                                    (errors.filière
                                      ? errors.filière[index]
                                        ? errors.filière[index].filièreNom
                                          ? true
                                          : false
                                        : false
                                      : false) &&
                                    (touched.filière
                                      ? touched.filière[index]
                                        ? touched.filière[index]
                                            .filièreNom
                                          ? true
                                          : false
                                        : false
                                      : false)
                                  }
                                /> */}


                <FormControl
                 
                 size="small"
                  variant="outlined"
                  className={classes.textField}
                  error={ (errors.filière
                    ? errors.filière[index]
                      ? errors.filière[index].domaine
                        ? true
                        : false
                      : false
                    : false) &&
                  (touched.filière
                    ? touched.filière[index]
                      ? touched.filière[index]
                          .domaine
                        ? true
                        : false
                      : false
                    : false)}
                >
                  <InputLabel>domaine</InputLabel>
                  <Field as={Select}  name={`filière.${index}.domaine`} label="domaine" >
                    {options_domaines.map((dom, index) => {
                      return (
                        <MenuItem key={index} value={dom.value}>
                          {dom.value}
                        </MenuItem>
                      );
                    })}
                  </Field>

                  <FormHelperText>
                    {<ErrorMessage name={`filière.${index}.domaine`} />}
                  </FormHelperText>
                </FormControl>


                <FormControl
                 
                 size="small"
                  variant="outlined"
                  className={classes.textField}
                  error={ (errors.filière
                    ? errors.filière[index]
                      ? errors.filière[index].diplome
                        ? true
                        : false
                      : false
                    : false) &&
                  (touched.filière
                    ? touched.filière[index]
                      ? touched.filière[index]
                          .diplome
                        ? true
                        : false
                      : false
                    : false)}
                >
                  <InputLabel>Diplome</InputLabel>
                  <Field as={Select}  name={`filière.${index}.diplome`} label="diplome" >
                    {Diplomes.map((dip, index) => {
                      return (
                        <MenuItem key={index} value={dip.value}>
                          {dip.value}
                        </MenuItem>
                      );
                    })}
                  </Field>

                  <FormHelperText>
                    {<ErrorMessage name={`filière.${index}.domaine`} />}
                  </FormHelperText>
                </FormControl>


                
                <Field
                multiline={true}
                rows={3}
                as={TextField}
                name={`filière.${index}.description`} 
                variant="outlined"
                className={classes.textField}
                label="Description"
                size="small"
                helperText={<ErrorMessage name={`filière.${index}.description`}  />}
                error={(errors.filière
                  ? errors.filière[index]
                    ? errors.filière[index].description
                      ? true
                      : false
                    : false
                  : false) &&
                (touched.filière
                  ? touched.filière[index]
                    ? touched.filière[index]
                        .description
                      ? true
                      : false
                    : false
                  : false)}
              />    
                               

                             
                                <FieldArray
                                  name={`filière[${index}].section`}
                                  render={array => {
                                    const { push, remove } = array;
                                    const section = filière[index].section;

                                    return (
                                      <React.Fragment>
                                        {section.map((spec, indexSection) => {
                                          return (
                                            <React.Fragment>
                                              
                <FormControl
                 style={{
                  width: "44%",
                }} 
                 size="small"
                  variant="outlined"
                  className={classes.textField}
                  error={
                    (errors.filière
                      ? errors.filière[index]
                        ? errors.filière[index].section
                          ? errors.filière[index].section[indexSection]
                            ? errors.filière[index].section[indexSection].sectionName
                              ? true
                              : false
                            : false
                          : false
                        : false
                      : false) &&
                    (touched.filière
                      ? touched.filière[index]
                        ? touched.filière[
                            index
                          ].section
                          ? touched.filière[
                              index
                            ].section[
                              indexSection
                            ]
                            ? touched.filière[
                                index
                              ].section[
                                indexSection
                              ].sectionName
                              ? true
                              : false
                            : false
                          : false
                        : false
                      : false)
                  }
                >
                  <InputLabel>Section</InputLabel>
                  <Field as={Select}  name={`filière[${index}].section[${indexSection}].sectionName`} label="Section" >
                    {Sections.map((sec, index) => {
                      return (
                        <MenuItem key={index} value={sec}>
                          {sec}
                        </MenuItem>
                      );
                    })}
                  </Field>

                  <FormHelperText>
                    {<ErrorMessage  name={`filière[${index}].section[${indexSection}].sectionName`}/>}
                  </FormHelperText>
                </FormControl>
                                              {/* <Field
                                                style={{
                                                  width: "44%",
                                                }}
                                                as={TextField}
                                                name={`filière[${index}].section[${indexSection}].sectionName`}
                                                variant="outlined"
                                                className={classes.textField}
                                                label="section"
                                                size="small"
                                                helperText={
                                                  <ErrorMessage
                                                    name={`filière[${index}].section[${indexSection}].sectionName`}
                                                  />
                                                }
                                                error={
                                                  (errors.filière
                                                    ? errors.filière[index]
                                                      ? errors.filière[index].section
                                                        ? errors.filière[index].section[indexSection]
                                                          ? errors.filière[index].section[indexSection].sectionName
                                                            ? true
                                                            : false
                                                          : false
                                                        : false
                                                      : false
                                                    : false) &&
                                                  (touched.filière
                                                    ? touched.filière[index]
                                                      ? touched.filière[
                                                          index
                                                        ].section
                                                        ? touched.filière[
                                                            index
                                                          ].section[
                                                            indexSection
                                                          ]
                                                          ? touched.filière[
                                                              index
                                                            ].section[
                                                              indexSection
                                                            ].sectionName
                                                            ? true
                                                            : false
                                                          : false
                                                        : false
                                                      : false
                                                    : false)
                                                }
                                              /> */}
                                              <Field
                                                style={{
                                                  width: "44%",
                                                  verticalAlign: "middle",
                                                }}
                                                as={TextField}
                                                name={`filière[${index}].section[${indexSection}].score`}
                                                variant="outlined"
                                                className={classes.textField}
                                                label="score"
                                                size="small"
                                                helperText={
                                                  <ErrorMessage
                                                    name={`filière[${index}].section[${indexSection}].score`}
                                                  />
                                                }
                                                error={
                                                  (errors.filière
                                                    ? errors.filière[index]
                                                      ? errors.filière[index].section
                                                        ? errors.filière[index].section[indexSection]
                                                          ? errors.filière[index].section[indexSection].score
                                                            ? true
                                                            : false
                                                          : false
                                                        : false
                                                      : false
                                                    : false) &&
                                                  (touched.filière
                                                    ? touched.filière[index]
                                                      ? touched.filière[index].section
                                                        ? touched.filière[index].section[indexSection]
                                                          ? touched.filière[index].section[indexSection].score
                                                            ? true
                                                            : false
                                                          : false
                                                        : false
                                                      : false
                                                    : false)
                                                }
                                              />

                                              <IconButton
                                                color="secondary"
                                                size="small"
                                                onClick={() => {
                                                  push({ //formik
                                                    sectionName: "",
                                                    score: "",
                                                  });
                                                }}
                                              >
                                                <AddBoxIcon />
                                              </IconButton>

                                              <IconButton
                                                onClick={() => {
                                                  
                                                    remove(indexSection);
                                                  
                                                }}
                                                color="primary"
                                                size="small"
                                              >
                                                <IndeterminateCheckBoxIcon />
                                              </IconButton>
                                            </React.Fragment>
                                          );
                                        })}
                                      </React.Fragment>
                                    );
                                  }}
                                />

                                <Button
                                  style={{
                                    marginLeft: "7px",
                                    marginRight: "10px",
                                  }}
                                  variant="contained"
                                  color="secondary"
                                  onClick={() => {
                                    push({
                                      filièreNom: "",
                                      domaine: "",
                                      diplome: "",
                                      section: [
                                        {
                                          sectionName: "",
                                          score: "",
                                        },
                                      ],
                                    });
                                  }}
                                >
                                  Ajouter
                                </Button>
                                <Button
                                style={{
                                  marginLeft: "7px",
                                  marginRight: "10px",
                                }}
                                  variant="contained"
                                  color="primary"
                                  onClick={() => {
                                    if (index > 0) {
                                      remove(index);
                                    }
                                  }}
                                >
                                  Supprimer
                                </Button>
                              </div>
                            </React.Fragment>
                          );
                        })}
                      </React.Fragment>
                    );
                  }}
                />
                <div>
               <Button style={{marginLeft: "350px", marginBottom: "10px", marginTop: "10px"}} variant="contained" color="primary" type="submit">
                    Créer un établissement
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
