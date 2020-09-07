import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Input } from '../components/input';
import { Grid, Button } from '@material-ui/core';
import { Select } from '../components/select';

export const AdvertListFilterForm = ({ setFilter, filter }) => {
  const methods = useForm();
  const onChange = (event) => setFilter((prev) => ({ ...prev, place: event.target.value }));
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(({ priceFrom, priceTo, ...rest }) =>
          setFilter((prev) => ({
            priceTo: priceTo ? parseInt(priceTo) : 0,
            priceFrom: priceFrom ? parseInt(priceFrom) : 0,
            ...rest,
            ...prev,
          }))
        )}
      >
        <Grid spacing={3} container>
          <Select {...{ name: 'place', onChange, options, value: filter.place }} />
          <Input {...{ name: 'priceFrom', label: 'Cena od', type: 'number', size: { xs: 6 } }} />
          <Input {...{ name: 'priceTo', label: 'Cena do', type: 'number', size: { xs: 6 } }} />
        </Grid>
        <Button color='primary' style={{ marginTop: 20 }} type='submit'>
          Szukaj
        </Button>
      </form>
    </FormProvider>
  );
};

const options = [
  { id: 'ONLINE', name: 'On line' },
  { id: 'AT_TEACHER', name: 'U nauczyciela' },
  { id: 'AT_STUDENT', name: 'U ucznia' },
];
