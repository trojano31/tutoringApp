import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";

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
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 1),
  },
}));

export const CreateAdvertFormv2 = () => {
  const [city, setCity] = React.useState("");
  const handleChange = (event) => {
    setCity(event.target.value);
  };
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Avatar src="https://i.ibb.co/cv7JyXJ/hat.png"></Avatar>
      <Typography component="h1" variant="h5">
        Dodaj lekcje
      </Typography>
      <form className={classes.form} noValidate>
        <Box mt={3}></Box>

        <FormControl fullWidth variant="outlined">
          <InputLabel>Przedmiot</InputLabel>
          <Select
            native
            onChange={handleChange}
            label="Przedmiot"
            inputProps={{
              name: "przedmiot",
              id: "outlined-age-native-simple",
            }}
          >
            <option aria-label="None" value="" />
            <option>Przedmiot1</option>
            <option>Przedmiot2</option>
            <option>Przedmiot3</option>
          </Select>
        </FormControl>

        <Box mt={3}></Box>

        <FormControl fullWidth variant="outlined">
          <InputLabel>Miejsce</InputLabel>
          <Select
            native
            onChange={handleChange}
            label="Miejsce"
            inputProps={{
              name: "place",
              id: "outlined-age-native-simple",
            }}
          >
            <option aria-label="None" value="" />
            <option>Miejsce1</option>
            <option>Miejsce2</option>
            <option>Miejsce3</option>
          </Select>
        </FormControl>
        <Box mt={3}></Box>

        <FormControl fullWidth variant="outlined">
          <InputLabel>Poziom</InputLabel>
          <Select
            native
            onChange={handleChange}
            label="Poziom"
            inputProps={{
              name: "level",
              id: "outlined-age-native-simple",
            }}
          >
            <option aria-label="None" value="" />
            <option>Poziom1</option>
            <option>Poziom2</option>
            <option>Poziom3</option>
          </Select>
        </FormControl>
        <Box mt={3}></Box>

        <TextField
          variant="outlined"
          margin="normal"
          required
          id="date"
          label="Od"
          type="date"
          defaultValue="2020-05-24"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          id="date"
          label="Do"
          type="date"
          defaultValue="2020-05-24"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
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
        />

        <Button
          type="submit"
          fullWidth
          variant="outlined"
          color="primary"
          className={classes.submit}
        >
          Dodaj lekcje
        </Button>
        <Box mt={2}></Box>

        <Button color="secondary" fullWidth variant="outlined">
          Wyczysc
        </Button>

        <Box mt={2}></Box>
      </form>
    </div>
  );
};
