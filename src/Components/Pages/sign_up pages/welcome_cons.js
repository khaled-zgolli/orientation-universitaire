import axios from "axios";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import "../../../App.css";
import "./sign_up.css";

const verifyUser = async (code) => {
  return axios
    .get(`http://localhost:4000/api/user/confirm_cons/${code}`)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default function Welcome_cons(props) {
  useEffect(() => {
    verifyUser(props.match.params.confirmationCode);
  }, [props.match.params.confirmationCode]);

  return (
    <div className="wrapper_connecter">
      <div className="form-wrapper-signin">
        <br />
        <br />
        <h1> Félicitations, votre compte est activé!</h1>
        <br />
        <br />
        <h3>
          <center>Vous pouvez consulter votre compte</center>
        </h3>
        <br />
        <br />

        <button class="btn">
          <Link to={"/Connexion"}>Se connecter </Link>{" "}
        </button>
        <br />
      </div>
    </div>
  );
}
