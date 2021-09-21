import React from "react";
import { Dialog, DialogContent, makeStyles, Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  dialog: {},
  customizedButton: {
    position: "absolute",
    left: "87%",
    top: "2%",
    backgroundColor: "",
    color: "gray",
  },
}));

export default function FormDeleteArticle({
  openPopupedelete,
  setOpenPopupedelete,
  data,
}) {
  const classes = useStyles();

  function delete_Actualite() {
    axios({
      url: "http://localhost:4000/api/data/deleteArticles",
      method: "delete",
      data: { _id: data },
    }).then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });
  }
  return (
    <Dialog open={openPopupedelete} maxWidth="lg" className={classes.dialog}>
      <DialogContent>
        <IconButton
          className={classes.customizedButton}
          onClick={() => {
            setOpenPopupedelete(false);
          }}
        >
          <CloseIcon />
        </IconButton>
        <br />
        <center>
          {" "}
          <h3>souhaitez vous vraiment supprimer ce article? </h3>{" "}
        </center>
        <br />
        <center>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setOpenPopupedelete(false);
            }}
          >
            {" "}
            Annuler
          </Button>{" "}
          &ensp;
          <Button
            variant="contained"
            color="secondary"
            onClick={delete_Actualite}
          >
            {" "}
            Oui
          </Button>
        </center>{" "}
        <br />
      </DialogContent>
    </Dialog>
  );
}
