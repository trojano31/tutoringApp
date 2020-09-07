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
  const methods = useForm();
  const options = data?.subjects?.result ?? [];
  if (error || !options.length) return <>error</>
  return(
    <>
      {loading
        ? <CircularProgress />
        : <Select  {...{ options, name: 'subject', helperText: 'Wybierz przedmiot' }}/>
      }
      <Button>Szukaj</Button>
    </>
  )
}