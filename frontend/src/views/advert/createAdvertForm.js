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
import { LEVELS, SUBJECTS, PLACES } from "./constants";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_ADVERT } from "../../mutations";
import cogoToast from "cogo-toast";

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
  const classes = useStyles();
  const { control, handleSubmit } = useForm();
  const [createAdvert] = useMutation(CREATE_ADVERT);

  return (
    <div className={classes.paper}>
      <Avatar src="https://i.ibb.co/cv7JyXJ/hat.png" />
      <Typography component="h1" variant="h5">
        Dodaj lekcje
      </Typography>
      <form
        className={classes.form}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box mt={3} />

        <FormControl fullWidth variant="outlined">
          <InputLabel>Przedmiot</InputLabel>
          <Controller
            control={control}
            name="subject"
            render={({ onChange, onBlur, value, name }) => (
              <Select
                native
                onBlur={onBlur}
                onChange={(e) => onChange(e.target.value)}
                value={value}
                name={name}
                label="Przedmiot"
                inputProps={{
                  name: "przedmiot",
                  id: "outlined-age-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                {SUBJECTS.map((item, i) => (
                  <option key={i} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </Select>
            )}
          />
        </FormControl>

        <Box mt={3} />

        <FormControl fullWidth variant="outlined">
          <InputLabel>Miejsce</InputLabel>
          <Controller
            control={control}
            name="place"
            render={({ onChange, onBlur, value, name }) => (
              <Select
                native
                onBlur={onBlur}
                onChange={(e) => onChange(e.target.value)}
                value={value}
                name={name}
                label="Miejsce"
                inputProps={{
                  name: "place",
                  id: "outlined-age-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                {PLACES.map((item, i) => (
                  <option key={i} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </Select>
            )}
          />
        </FormControl>
        <Box mt={3} />

        <FormControl fullWidth variant="outlined">
          <InputLabel>Poziom</InputLabel>
          <Controller
            control={control}
            name="level"
            render={({ onChange, onBlur, value, name }) => (
              <Select
                native
                onBlur={onBlur}
                onChange={(e) => onChange(e.target.value)}
                value={value}
                name={name}
                label="Poziom"
                inputProps={{
                  name: "level",
                  id: "outlined-age-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                {LEVELS.map((item, i) => (
                  <option key={i} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </Select>
            )}
          />
        </FormControl>
        <Box mt={3} />

        <Controller
          control={control}
          name="dateFrom"
          defaultValue="2020-05-24"
          render={({ onChange, onBlur, value, name }) => (
            <TextField
              onBlur={onBlur}
              onChange={(e) => onChange(e.target.value)}
              value={value}
              name={name}
              variant="outlined"
              margin="normal"
              required
              id="dateFrom"
              label="Od"
              type="date"
              defaultValue="2020-05-24"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
        />
        <Controller
          control={control}
          name="dateTo"
          valueName="selected"
          defaultValue="2020-05-24"
          render={({ onChange, onBlur, value, name }) => (
            <TextField
              onBlur={onBlur}
              onChange={(e) => onChange(e.target.value)}
              value={value}
              name={name}
              variant="outlined"
              margin="normal"
              required
              id="dateTo"
              label="Do"
              type="date"
              defaultValue="2020-05-24"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
        />

        <Controller
          control={control}
          name="price"
          render={({ onChange, onBlur, value, name }) => (
            <TextField
              onBlur={onBlur}
              onChange={(e) => onChange(e.target.value)}
              value={value}
              name={name}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Cena (za godzinę zegarową)"
              type="number"
              id="price"
            />
          )}
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

  function onSubmit(data) {
    const preparedData = {
      subject: data.subject,
      place: data.place,
      level: data.level,
      dateFrom: new Date(data.dateFrom).toISOString(),
      dateTo: new Date(data.dateTo).toISOString(),
      price: Number(data.price),
      teacherId: "1f6ec8cd-2aa7-423f-aa0c-3c3c48cb75e6", // ogaranc globalny state
    };
    createAdvert({ variables: { advert: { ...preparedData } } })
      .then((res) => console.log(res))
      .catch(() => cogoToast.error("Something went wrong"));
    console.log("data", preparedData);
  }
};
