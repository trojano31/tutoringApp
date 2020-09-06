import React from "react";
import gql from "graphql-tag";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";
import { MainAppBar } from "../components/appbar";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://i.ibb.co/9rN70yC/bgrev.png)",
    backgroundRepeat: "no-repeat",

    backgroundSize: "cover",
    backgroundPosition: "center",
    overflowY: "hidden",
    overflowX: "hidden",
  },
}));

export const Main = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <MainAppBar />
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={12} md={12} className={classes.image}>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
