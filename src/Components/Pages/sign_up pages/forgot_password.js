import React, {Component} from 'react';
import axios  from 'axios';
import Swal from 'sweetalert2'

export default class forgot_password extends Component{
   
    //---------------------------------------------------------
    handleSubmit = e => {
      e.preventDefault();
  
      const data = {
        email: this.email,
      }
      axios.post('http://localhost:4000/api/userforgot/passwordF', data)
  
      .then( res => {
        Swal.fire({
          icon:'success',
          title: "Email valide",
          html : '<span style="color:#FFFFFF">Merci de consulter votre email. </span>',
          showCloseButton: false,
          showConfirmButton: false,
          background: "black",
          timer: 3500,
        })        

  
      })
  
      .catch((err) => {
        Swal.fire({
          icon:'warning',
          html : '<span style="color:#FFF6C5">   EMAIL invalide </span>',
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
          <h1>Réinitialisations de mot de passe</h1>
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
    
              <div className="createAccount">
                <button type="submit"  >Envoyer</button>
                <br/>
              </div>   
          </form>
      </div>
      </div>
    )}
  };