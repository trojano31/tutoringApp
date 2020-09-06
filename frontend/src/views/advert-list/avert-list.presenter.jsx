import React from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import { AdvertListItem } from './advert-list-item';
import { Typography } from '@material-ui/core';
import { MainAppBar } from '../components/appbar';

export const AdvertListPresenter = ({ adverts }) => (
  <>
    <MainAppBar />
    <Typography gutterBottom variant='h5' component='h2' color='primary' >
      Znalezione ogłoszenia
    </Typography>
    <Grid container spacing={5}>
      {adverts.map(AdvertListItem)}
    </Grid>
  </>
);
