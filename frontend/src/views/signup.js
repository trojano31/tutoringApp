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

const ADD_USER = gql`
  mutation createUser($user: UserInput!) {
    createUser(user: $user) {
      email
      firstName
      lastName
      hashedPwd
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://previews.123rf.com/images/sanumko/sanumko1808/sanumko180800008/106180119-vector-back-to-school-doodle-elements-pattern-or-background-study-and-learning-objects-book-notebook.jpg)",
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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    backgroundImage: "../../assert/learny.jpg",
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
  const [email, setEmail] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [hashedPwd, setHashedPwd] = useState(null);
  const [addUser] = useMutation(ADD_USER);
  const classes = useStyles();

  useEffect(() => {
    register({ name: "email" }, { required: true });
    register({ name: "firstName" }, { required: true });
    register({ name: "lastName" }, { required: true });
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
    console.log("Submit event", e);
    cogoToast.success("Konto zalozone");
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
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

  function handleSignupClick() {
    addUser({ variables: { user: { email, firstName, lastName, hashedPwd } } })
      .then((data) => console.log("data", data))
      .catch(() => {
        cogoToast.error("Complete all fields");
      });
  }
};
