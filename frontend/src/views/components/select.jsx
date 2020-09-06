import React from 'react';
import { InputLabel, MenuItem, TextField } from '@material-ui/core';

export const Select = ({ options, ...rest }) => 
<TextField
  id="standard-select-currency"
  select
  helperText="Please select your currency"
  {...rest}
>
{options.map(option => (
  <MenuItem key={option.id} value={option.id}>
    {option.name}
  </MenuItem>
))}
</TextField>
// <InputLabel id="demo-simple-select-label">Age</InputLabel>
// <Select
//   labelId="demo-simple-select-label"
//   id="demo-simple-select"
//   value={name}
//   onChange={handleChange}
// >
//   <MenuItem value={10}>Ten</MenuItem>
//   <MenuItem value={20}>Twenty</MenuItem>
//   <MenuItem value={30}>Thirty</MenuItem>
// </Select>