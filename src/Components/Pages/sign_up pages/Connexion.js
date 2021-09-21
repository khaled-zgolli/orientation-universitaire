import axios from 'axios';
import React, {Component} from 'react';
import '../../../App.css';
import './sign_up.css' 
import Swal from 'sweetalert2'


export default class auth extends Component{

  handleSubmit = e => {
    e.preventDefault();

    const data = {
      email: this.email,
      M_passe: this.M_passe
    }
    axios.post('http://localhost:4000/api/userlogin/login', data)

    .then( res => {
   
     localStorage.setItem('token' , res.data.token);
  
     localStorage.setItem('Loggedin' , true);
     
     localStorage.setItem("user", JSON.stringify(res.data.user));
   

      if (res.data.user.Role === "Admin"){
        
        window.location.href = "/Admin_table"
        localStorage.setItem('isAdmin' , true);
      } 

      else if (res.data.user.Role === "Etudiant"){

        window.location.href = "/Etud_profile"
        localStorage.setItem('isEtud' , true);

      } 

      else if (res.data.user.Role === "Conseiller"){ 
        
        window.location.href = "/Cons_profile"
        localStorage.setItem('isCons' , true);
      } 
    })

    .catch((err) => {
      Swal.fire({
        icon:'warning',
        html : '<span style="color:#FFF6C5">   EMAIL ou MOT DE PASSE invalide  <br> ou activer votre compte </span>',
        showCloseButton: false,
        showConfirmButton: false,
        background: "black",
        timer: 3000,

      })    
    })

  };

  



  render(){

  return (
  <div className="wrapper_connecter">
      <div className="form-wrapper-signin">
        <br/>
        <h1>Se connecter</h1>
        <br/><br/>
        <form onSubmit= {this.handleSubmit} autoComplete="off">  
            <div className="email_auth">
              <label htmlFor="email">Email</label>
              <input
                placeholder="Email"
                type="email"
                name="email"
                onChange = {e => this.email = e.target.value}

              />
            </div>

            <div className="Mot_passe">
              <label htmlFor="Mot_passe">Mot de passe </label>
              <input
                placeholder="Mot de passe"
                type="password"
                name="Mot_passe"
                onChange = {e => this.M_passe = e.target.value}
              />
            <a href="/forgot_password"><small className="oublie"> Mot de passe oublié ? </small></a> 

            </div>    
            <div className="createAccount">
              <button type="submit"  >Se connecter</button>
              <small>Vous n'avez pas un compte? <a href="/sign_up">Créer un compte</a></small>
            </div>   
        </form>
    </div>
    </div>
  )}
};