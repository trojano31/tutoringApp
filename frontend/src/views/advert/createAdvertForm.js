import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { LEVELS, SUBJECTS, CITIES } from "./constants";

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

export const CreateAdvertForm = () => {
  const [city, setCity] = React.useState("");
  const handleChange = (event) => {
    setCity(event.target.value);
  };
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Avatar src="https://i.ibb.co/cv7JyXJ/hat.png" />
      <Typography component="h1" variant="h5">
        Dodaj lekcje
      </Typography>
      <form className={classes.form} noValidate>
        <Box mt={3} />

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
            {SUBJECTS.map((item, i) => (
              <option key={i} value={item.value}>
                {item.name}
              </option>
            ))}
          </Select>
        </FormControl>

        <Box mt={3} />

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
            {CITIES.map((item, i) => (
              <option key={i} value={item.value}>
                {item.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <Box mt={3} />

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
            {LEVELS.map((item, i) => (
              <option key={i} value={item.value}>
                {item.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <Box mt={3} />

        <TextField
          variant="outlined"
          margin="normal"
          required
          id="dateFrom"
          label="Od"
          type="dateFrom"
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
          id="dateTo"
          label="Do"
          type="dateTo"
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
          name="price"
          label="Cena (za godzinę zegarową)"
          type="number"
          id="price"
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
        <Box mt={2} />

        <Button color="secondary" fullWidth variant="outlined">
          Wyczysc
        </Button>

        <Box mt={2} />
      </form>
    </div>
  );
};
