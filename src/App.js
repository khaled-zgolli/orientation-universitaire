import "./App.css";
import React from "react";
import NavBar from "./Components/navbar_comp/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import universite from "./Components/Pages/universite";
import auth from "./Components/Pages/sign_up pages/Connexion";
import SignUp from "./Components/Pages/sign_up pages/sign_up";
import SignUp_cons from "./Components/Pages/sign_up pages/sign_up_cons";
import domaine from "./Components/Pages/domaine";
import diplome from "./Components/Pages/diplome";
import Acceuil from "./Components/Pages/home pages/Acceuil";
import universite_monastir from "./Components/Pages/université_monastir";
import welcome_cons from "./Components/Pages/sign_up pages/welcome_cons";
import welcome_etud from "./Components/Pages/sign_up pages/welcome_etud";
import forgot_password from "./Components/Pages/sign_up pages/forgot_password";
import Admin_table from "./Components/Pages/Profiles/Admin_table";
import Cons_profile from "./Components/Pages/Profiles/Conseiller_profil/Cons_profile";
import FormEditArticle from "./Components/Pages/Profiles/Conseiller_profil/ConsEditForm";
import Etud_profile from "./Components/Pages/Profiles/Etudiant_profil/Etud_profile";
import Reset_password from "./Components/Pages/sign_up pages/Reset_password";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import FormEtudiant from "./Components/Pages/Profiles/Etudiant_profil/FormEtudiant";
import FormConseiller from "./Components/Pages/Profiles/Conseiller_profil/FormConseiller";
import FormArticle from "./Components/Pages/Profiles/Conseiller_profil/FormArticle";
import Etablissement from "./Components/Pages/etablissement";
import AjoutArticle from "./Components/Pages/Profiles/Etudiant_profil/ajoutArticle";
import FormEditArticleEtud from "./Components/Pages/Profiles/Etudiant_profil/editArticle";
import ListeCons from "./Components/Pages/ListeCons";
import Actulites from "./Components/Pages/Actualite";
import Articles_exp from "./Components/Pages/articles";
import Espace_Conseiller from "./Components/Pages/Espace_Conseiller";
import Articles_cons from "./Components/Pages/ArticleCons";
import {ProtectedRouterAdmin} from "./ProtectedRouter";
import {ProtectedRouterEtudiant} from "./ProtectedRouter";
import {ProtectedRouterConseiller} from "./ProtectedRouter";
import {ProtectedRouterConsEtud} from "./ProtectedRouter";
import Agenda from "./Components/Pages/Agenda/Agenda";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "rgba(0, 0, 0, 0.80)",
    },
    secondary: {
      main: "#FFC92F",
    },
  },
});

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <NavBar />
        <Switch>
          <ProtectedRouterAdmin
            path="/Admin_table"
            component={props => <Admin_table {...props} />}
            isAuth={user !== null ? user.Role : ""}
          />
          <Route path="/" exact component={Acceuil} />
          <Route path="/universite" component={universite} />
          <Route path="/diplome/:nom" component={diplome} />
          <Route path="/domaine/:nom" component={domaine} />
          <Route path="/sign_up" component={SignUp} />
          <Route path="/sign_up_cons" component={SignUp_cons} />
          <Route path="/connexion" component={auth} />
          <Route path="/forgot_password" component={forgot_password} />
          <Route path="/université/:nom" component={universite_monastir} />
          <Route
            path="/confirm_cons/:confirmationCode"
            component={welcome_cons}
          />
          <Route
            path="/confirm_etud/:confirmationCode"
            component={welcome_etud}
          />
          <Route path="/reset/:token" component={Reset_password} />

          
          {/* <Route path="/Cons_profile" component={Cons_profile} /> */}
          <ProtectedRouterConseiller
            path="/Cons_profile"
            component={props => <Cons_profile {...props} />}
            isAuth={user !== null ? user.Role : ""}
          />


        <ProtectedRouterEtudiant
            path="/Etud_profile"
            component={props => <Etud_profile {...props} />}
            isAuth={user !== null ? user.Role : ""}
          />

          {/* <Route path="/Etud_profile" component={Etud_profile} /> */}
          {/* ************************************************************************** */}
          {/* <Route path="/Admin_table" component={Admin_table} /> */}
          {/* ************************************************************************** */}
          {/* <Route path="/FormEtudiant" component={FormEtudiant} /> */}

          <ProtectedRouterEtudiant
            path="/FormEtudiant"
            component={props => <FormEtudiant {...props} />}
            isAuth={user !== null ? user.Role : ""}
          />



          {/* <Route path="/FormConseiller" component={FormConseiller} /> */}
          <ProtectedRouterConseiller
            path="/FormConseiller"
            component={props => <FormConseiller {...props} />}
            isAuth={user !== null ? user.Role : ""}
          />
          <ProtectedRouterConseiller
            path="/FormArticle"
            component={props => <FormArticle {...props} />}
            isAuth={user !== null ? user.Role : ""}
          />

          {/* <Route path="/FormArticle" component={FormArticle} /> */}
          <Route path="/Etablissement/:id" component={Etablissement} />
          {/* <Route path="/FormEditArticle" component={FormEditArticle} /> */}
          <ProtectedRouterConseiller
            path="/FormEditArticle"
            component={props => <FormEditArticle {...props} />}
            isAuth={user !== null ? user.Role : ""}
          />
           <ProtectedRouterEtudiant
            path="/AjoutArticle"
            component={props => <AjoutArticle {...props} />}
            isAuth={user !== null ? user.Role : ""}
          />


          {/* <Route path="/AjoutArticle" component={AjoutArticle} /> */}
          <ProtectedRouterEtudiant
            path="/FormEditArticleEtud"
            component={props => <FormEditArticleEtud {...props} />}
            isAuth={user !== null ? user.Role : ""}
          />

          {/* <Route path="/FormEditArticleEtud" component={FormEditArticleEtud} /> */}
          <Route path="/ListeCons" component={ListeCons} />
          <Route path="/Actulites/:id" component={Actulites} />
          <Route path="/Articles_exp/:id" component={Articles_exp} />

          {/*  <ProtectedRouterEtudiant
            path="/Espace_Conseiller"
            component={props => <Espace_Conseiller {...props} />}
            isAuth={user !== null ? user.Role : ""}
          /> */}

          <ProtectedRouterConsEtud
            path="/Espace_Conseiller/:id"
            component={props => <Espace_Conseiller {...props} />}
            isAuth={user !== null ? user.Role : ""}
          /> 

          {/* <Route path="/Espace_Conseiller/:id" component={Espace_Conseiller} /> */}
          <Route path="/Articles_cons/:id" component={Articles_cons} />

          {/* <ProtectedRouterEtudiant
            path="/Articles_cons/:id"
            component={props => <Articles_cons {...props} />}
            isAuth={user !== null ? user.Role : ""}
          />
          <ProtectedRouterConseiller
            path="/Articles_cons/:id"
            component={props => <Articles_cons {...props} />}
            isAuth={user !== null ? user.Role : ""}
          /> */}

          <Route path="/Agenda" component={Agenda} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
