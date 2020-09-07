import React from "react";
import { Button, CircularProgress, Container } from '@material-ui/core';
import { GET_SUBJECTS } from '../../queries';
import { useQuery } from '@apollo/react-hooks';
import { Select } from '../components/select';
import { useDispatch, useSelector } from 'react-redux';

export const SelectSubject = () => {
  const { loading, error, data } = useQuery(GET_SUBJECTS, getSubjectsVariables);
  const options = data?.subjects?.result ?? [];
  const dispatch = useDispatch();
  const onChange = event => dispatch({ type: 'set-subject-id', payload: event.target.value });
  const value = useSelector(state => state.subjectId)

  if (error || !options.length) return <>error</>
  return(
    <Container maxWidth='xs'>
      {loading
        ? <CircularProgress />
        : <Select  {...{ options, name: 'subject', helperText: 'Wybierz przedmiot', onChange, value }}/>
      }
      <Button color="primary" href='/adverts' disabled={!value}>Szukaj</Button>
    </Container>
  )
}



const getSubjectsVariables = {
  variables: {
    paginationInput: {
    page: 1,
    itemsPerPage: 1000
    },
  },
};
