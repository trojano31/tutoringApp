import React from "react";
import { useForm, FormProvider } from 'react-hook-form'
import { Button, CircularProgress } from '@material-ui/core';
import { GET_SUBJECTS } from '../../queries';
import { useQuery } from '@apollo/react-hooks';
import { Select } from '../components/select';

export const SelectSubject = () => {
  const { loading, error, data } = useQuery(GET_SUBJECTS, {
    variables: {
      paginationInput: {
      page: 1,
      itemsPerPage: 1000
      },
    },
  });
  console.log(loading, error, data);
  const methods = useForm();
  if (error) return <>error</>
  return(
    <FormProvider {...methods} >
      <form onSubmit={methods.handleSubmit(data => console.log(data))}>
        {loading
          ? <CircularProgress />
          : <Select  {...{ options: data.subjects, name: 'subject', lable: 'Wybierz przedmiot' }}/>
        }
        <Button>Szukaj</Button>
      </form>
    </FormProvider>
  )
}