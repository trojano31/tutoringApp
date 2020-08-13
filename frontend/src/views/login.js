import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import cogoToast from "cogo-toast";

const LOGIN = gql`
  mutation($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      email
      id
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

export const Login = () => {
  const [login, setLogin] = useState(null);
  const [password, setPassword] = useState(null);
  const [loginUser] = useMutation(LOGIN);
  const classes = useStyles();

  useEffect(() => {
    register({ name: "login" }, { required: true });
    register({ name: "password" }, { required: true });
  }, []);

  const {
    register,
    errors,
    handleSubmit,
    setValue,
    triggerValidation,
  } = useForm({
    mode: "onBlur",
  });
  const onSubmit = (data, e) => {
    cogoToast.success("OK");
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={8} className={classes.image} />
      <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar src="https://i.ibb.co/cv7JyXJ/hat.png"></Avatar>
          {/*TO DO - ŚCIEŻKA */}
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="login"
              autoComplete="email"
              autoFocus
              ref={register({
                required: true,
                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
              onChange={async (e, { name, value }) => {
                setLogin(e.target.value);
                setValue(name, value);
                await triggerValidation({ name });
              }}
              error={errors.login && <p>This is required</p>}
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
              error={errors.password && <p>This is required</p>}
              ref={register({ required: true })}
              onChange={async (e, { name, value }) => {
                setPassword(e.target.value);
                setValue(name, value);
                await triggerValidation({ password });
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="outlined"
              color="primary"
              className={classes.submit}
              onClick={handleLoginClick}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}></Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );

  function handleLoginClick() {
    loginUser({ variables: { loginInput: { email: login, password } } })
      .then((loginData) => console.log("loginData", loginData))
      .catch(() => {
        cogoToast.error("Wrong login or password");
      });
  }
};
