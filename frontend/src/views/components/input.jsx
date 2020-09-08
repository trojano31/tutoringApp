import React from 'react';
import { useFormContext } from 'react-hook-form';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { upperFirst } from 'lodash';

export const Input = ({ size, label, type, name }) => {
  const { register, errors } = useFormContext();
  const inputProps = {
    fullWidth: true,
    label: label ?? upperFirst(name),
    error: !!errors[name],
    helperText: errors[name]?.message,
    inputRef: register,
    name,
    type, 
  }
  return (
    <Grid item {...(size ?? { xs: 12 })}>
      <TextField {...inputProps} />
    </Grid>
  );
};