import React from 'react';
import { useForm, FormProvider } from 'react-hook-form'
import { Input } from '../components/input';
import { Grid } from '@material-ui/core';

export const AdvertListFilterForm = ({ filters }) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(data => console.log(data))}>
        <Grid spacing={3} container>
          <Input {...{ name: 'place' }}/>
          <Input {...{ name: 'priceFrom', label: 'Cena od', type: 'number', size: { xs: 6 } }}/>
          <Input {...{ name: 'priceTo', label: 'Cena do', type: 'number', size: { xs: 6 } }}/>
        </Grid>
      </form>
    </FormProvider>
  )
}