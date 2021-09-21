import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Dialog, DialogContent, FormControl, FormHelperText, InputLabel, makeStyles, MenuItem, Select, TextField } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import { ErrorMessage, Field, Form, Formik, FieldArray } from "formik";
import AddBoxIcon from "@material-ui/icons/AddBox";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";

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

export default function Popupedit(props) {
  const { openPopupedit, setOpenPopupedit , data} = props;

  const initialValues = {
    _id: data._id,
    img :data.img,
    nom: data.nom,
    universite: data.universite,
    ville: data.ville,
    Description: data.Description,
    site: data.site,
    email: data.email,
    adress: data.adress,
    numero : data.numero,
    filière: data.filière
  };
  



  const classes = useStyles();

  const handleSubmit = props => {
    if(props ===  initialValues) {
      setOpenPopupedit(false);
      Swal.fire({
        icon: "warning",
        title: "Pas de modifications",
        html: '<span style="color:#FFFFFF">  </span>',
        showCloseButton: false,
        showConfirmButton: false,
        background: "black",
        timer: 3500,
      });
    }else {
      axios({
        url: "http://localhost:4000/api/data/updateEtablissment",
        method: "put",
        data: {
          _id: data._id,
          img :preview,
          nom: props.nom,
          universite: props.universite,
          ville: props.ville,
          Description: props.Description,
          site: props.site,
          email: props.email,
          adress: props.adress,
          numero : props.numero,
          filière: props.filière
        },
      })  .then((res)=>{
        setOpenPopupedit(false)
         Swal.fire({
          icon: "success",
          title: "Modifié avec succès",
          html: '<span style="color:#FFFFFF">Les champs sont bien modifiés. </span>',
          showCloseButton: false,
          showConfirmButton: false,
          background: "black",
          timer: 2000,
      })     
      setTimeout(() => {
        window.location.reload();
      }, 1000);         
     })

     .catch((err)=> {
      setOpenPopupedit (false)
      Swal.fire({
          icon:'warning',
          html : '<span style="color:#FFF6C5"> EMAIL  existe </span>',
          showCloseButton: false,
          showConfirmButton: false,
          background: "black",
          timer: 3500,
        });
      });
    }
   
  };

  //*************************************** */
  const [image, setImage] = useState();
  const fileInputRef = useRef();
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(image);
    }
  }, [image, data.Image]);
  return (
    <Container>
      <Dialog open={openPopupedit} maxWidth="md">
        <DialogContent>
          <IconButton
            className={classes.customizedButton}
            onClick={() => {
              setOpenPopupedit(false);
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
                        src={preview ? preview : data.img}
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
