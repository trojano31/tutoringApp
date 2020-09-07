import React, { useState } from 'react';
import { AdvertListPresenter } from './avert-list.presenter';
import { GET_ADVERTS } from '../../queries';
import { useQuery } from '@apollo/react-hooks';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

export const AdvertList = () => {
  const value = useSelector(state => state.subjectId)
  const [filter, setFilter] = useState({})
  console.log(filter);
  const { loading, error, data } = useQuery(GET_ADVERTS, {
    variables: {
      advertFilter: {
      page: 1,
      itemsPerPage: 12,
      subjectId: value,
      ...filter,
      },
    },
  },);
  const adverts = data?.subjects?.result ?? [];
  console.log( loading, error, data);

  if (!value) return <Redirect to='/' />
  if (error) return <>error</>
  if (loading) return <CircularProgress />
  return <AdvertListPresenter {...{ adverts, setFilter, filter }} />
}

const getAdvertsVariables = {
  
};
