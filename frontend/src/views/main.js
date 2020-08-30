import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import cogoToast from "cogo-toast";
import { LOGIN } from "../mutations";
import { Redirect } from "react-router-dom";
import { MainAppBar } from "./components/appbar";

const ADD_USER = gql`
  mutation createUser($user: UserInput!) {
    createUser(user: $user) {
      email
      firstName
      lastName
    }
  }
`;

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
        <Grid item xs={false} sm={12} md={12} className={classes.image} />
      </Grid>
    </React.Fragment>
  );
};
