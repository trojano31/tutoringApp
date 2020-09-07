import React from 'react';
import { InputLabel, MenuItem, TextField } from '@material-ui/core';
import { useFormContext } from 'react-hook-form';

export const Select = ({ options, ...rest }) => {
  return (
    <TextField
      select
      {...rest}
    >
    {options.map(option => (
      <MenuItem key={option.id} value={option.id}>
        {option.name}
      </MenuItem>
    ))}
    </TextField>
  )
}