import React from "react";

import { Route, Redirect } from "react-router-dom";



export function ProtectedRouterAdmin({
  component: Component,
  isAuth,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props => {
        if (isAuth === "Admin") {
          return <Component {...props} />;
        } else {
          return (
            <Redirect to={{ pathname: "/connexion", state: { from: props.location } }} />
          );
        }
      }}
    />
  );
}

export function ProtectedRouterEtudiant({
  component: Component,
  isAuth,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props => {
        if (isAuth === "Etudiant") {
          return <Component {...props} />;
        } else {
          return (
            <Redirect to={{ pathname: "/connexion", state: { from: props.location } }} />
          );
        }
      }}
    />
  );
}

export function ProtectedRouterConseiller({
  component: Component,
  isAuth,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props => {
        if (isAuth === "Conseiller") {
          return <Component {...props} />;
        } else {
          return (
            <Redirect to={{ pathname: "/connexion", state: { from: props.location } }} />
          );
        }
      }}
    />
  );
}

export function ProtectedRouterConsEtud({
  component: Component,
  isAuth,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props => {
        if (isAuth === "Conseiller" || isAuth === "Etudiant" ) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect to={{ pathname: "/connexion", state: { from: props.location } }} />
          );
        }
      }}
    />
  );
}
