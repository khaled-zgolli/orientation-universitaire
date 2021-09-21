import {
  Box,
  createStyles,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";



const useStyles = makeStyles(theme =>
  createStyles({
    card: {
      width: "260px",
      height: "120px",
    },
    span: {
      width: "120px",
      height: "120px",
      display: "flex",

      justifyContent: "center",
      alignItems: "center",
    },
    img: {
      marginRight: "15px",
      width: "70px",
      height: "70px",
    },
  })
);

export const Card = ({ color, image, type, number }) => {
  const classes = useStyles();
  return (
    <Paper elevation={6} className={classes.card}>
      <Box display="flex">
        <Box>
          <Typography variant="h4">
            <div className={classes.span} style={{ backgroundColor: color }}>
              <img src={image} alt="" className={classes.img} />
            </div>
          </Typography>
        </Box>

        <Box
          style={{ marginLeft: "15px", textAlign: "center", marginTop: "10px" }}
        >
          <Typography variant="h2">{number}</Typography>
          <Typography variant="overline">{type}</Typography>
        </Box>
      </Box>
    </Paper>
  );
};
