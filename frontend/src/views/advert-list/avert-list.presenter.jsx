import React from 'react';
import Grid from '@material-ui/core/Grid/Grid';

export const AdvertListPresenter = ({ adverts }) =>
<Grid container>
  {adverts.map(advert => <>{advert.price}</>)}
</Grid>
