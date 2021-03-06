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
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const SignUp = () => {
  const [redirect, setRedirect] = useState(false);
  const [email, setEmail] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [hashedPwd, setHashedPwd] = useState(null);
  const [addUser] = useMutation(ADD_USER);
  const [loginUser] = useMutation(LOGIN);
  const classes = useStyles();

  const { register, errors, setValue, triggerValidation } = useForm({
    mode: "onBlur",
  });

  useEffect(() => {
    register({ name: "email" }, { required: true });
    register({ name: "firstName" }, { required: true });
    register({ name: "lastName" }, { required: true });
    register({ name: "password" }, { required: true });
  }, []);

  if (redirect) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <React.Fragment>
      <MainAppBar />
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={8} className={classes.image} />
        <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar src="https://i.ibb.co/cv7JyXJ/hat.png"></Avatar>
            {/*TO DO - ŚCIEŻKA */}
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                ref={register({
                  required: true,
                })}
                onChange={async (e) => {
                  setEmail(e.target.value);
                  setValue(e.target.name, e.target.value);
                }}
                error={errors.login && <p>This is required</p>}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                placeholder="First Name"
                name="firstName"
                type="text"
                id="form-input-control-first-name"
                onChange={async (e) => {
                  setFirstName(e.target.value);
                  setValue(e.target.name, e.target.value);
                }}
                ref={register({ required: true, maxLength: 80 })}
                error={errors.firstName && <p>This is required</p>}
              />

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                placeholder="Last Name"
                name="lastName"
                type="text"
                id="form-input-control-last-name"
                autoComplete="current-name"
                onChange={async (e) => {
                  setLastName(e.target.value);
                  setValue(e.target.name, e.target.value);
                }}
                ref={register({ required: true })}
                error={errors.lastName && <p>This is required</p>}
              />

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={async (e) => {
                  setHashedPwd(e.target.value);
                  setValue(e.target.name, e.target.value);
                }}
                ref={register({ required: true })}
                error={errors.password && <p>This is required</p>}
              />

              <Button
                type="submit"
                fullWidth
                variant="outlined"
                color="primary"
                className={classes.submit}
                onClick={handleSignupClick}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="login" variant="body2">
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}></Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );

  function handleSignupClick(e) {
    e.preventDefault();
    addUser({
      variables: { user: { email, firstName, lastName, password: hashedPwd } },
    })
      .then((data) => {
        loginUser({ variables: { loginInput: { email, password: hashedPwd } } })
          .then(() => setRedirect(true))
          .catch(() =>
            cogoToast.error("Something went wrong, try again later")
          );
      })
      .catch(() => {
        cogoToast.error("Complete all fields");
      });
  }
};
