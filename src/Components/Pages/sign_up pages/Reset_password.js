import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import * as yup from "yup";
import { useFormik } from "formik";

const passeRegex = RegExp(
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
);

const validationSchema = yup.object().shape({
  M_passe: yup
    .string()
    .matches(passeRegex, "Entrer des caractéres alpha-numérique")
    .required("champs obligatoire!"),

  Confirm_M_passe: yup
    .string()
    .oneOf([yup.ref("M_passe"), null], "les mots de passe doivent correspondre")
    .required("champs obligatoire!"),
});

const Reset_password = props => {
  useEffect(() => {
    const response = async () => {
      await axios
        .get("http://localhost:4000/api/userforgot/reset", {
          params: {
            resetPasswordToken: props.match.params.token,
          },
        })
        .then(res => {
          setData(res.data.message);
          setId(res.data._id);
        });
    };
    response();
  }, [props.match.params.token]);

  const [data, setData] = useState(undefined);
  const [id, setId] = useState(undefined);

  const formik = useFormik({
    initialValues: {
      M_passe: "",
      Confirm_M_passe: "",
    },
    validationSchema: validationSchema,
    validateOnBlur: true,
    onSubmit: values => {
      if (data !== undefined) {
        axios({
          url: "http://localhost:4000/api/userforgot/updatePassword",
          method: "PUT",
          data: { _id: id, M_passe: values.M_passe},
        }).then(res => {
          if (res.data.message === "password updated") {
            Swal.fire({
              icon: "success",
              title: "Updated",
              html: '<span style="color:#FFFFFF"> </span>',
              showCloseButton: false,
              showConfirmButton: false,
              background: "black",
              timer: 3500,
            });
          }

          setTimeout(() => {
            window.location.href = "/connexion";
          }, 1000);
        });

      } else {
        Swal.fire({
          icon: "warning",
          html: '<span style="color:#FFF6C5"> Error  </span>',
          showCloseButton: false,
          showConfirmButton: false,
          background: "black",
          timer: 3500,
        });
      }
    },
  });

  return (
    <div className="wrapper_connecter">
      <div className="form-wrapper-signin">
        <br />
        <h1> Réinitialise votre mot de passe</h1>
        <br />
        <br />
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className="Mot_passe">
            <label htmlFor="M_passe">
              Mot de passe <span className="oblig">*</span>
            </label>
            <input
              placeholder="Mot de passe"
              type="password"
              name="M_passe"
              value={formik.values.M_passe}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className="errorMessage">
              {formik.touched.M_passe && formik.errors.M_passe
                ? formik.errors.M_passe
                : ""}
            </span>
          </div>

          <div className="Mot_passe">
            <label htmlFor="Confirm_M_passe">
              Confirme mot de passe <span className="oblig">*</span>
            </label>
            <input
              placeholder="Confirme mot de passe"
              type="password"
              name="Confirm_M_passe"
              value={formik.values.Confirm_M_passe}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className="errorMessage">
              {formik.touched.Confirm_M_passe && formik.errors.Confirm_M_passe
                ? formik.errors.Confirm_M_passe
                : ""}
            </span>
          </div>
          <div className="createAccount">
            <button type="submit">Envoyer</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reset_password;