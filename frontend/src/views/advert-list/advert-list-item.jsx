import React from 'react';
import { Grid, Card, CardContent, Typography, CardMedia, makeStyles } from '@material-ui/core';
import { Place } from './adverts';

const imgUrl = 'data:image/jpeg;base64,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'

export const AdvertListItem = (advert) => (
  <Grid item xs={4}>
    <Card>
      <CardMedia
        className={useStyles().media}
        image={imgUrl}
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography gutterBottom variant='h4' component='h2'>
          {advert.teacher.name}
        </Typography>
        <Typography gutterBottom variant='h5' color='textSecondary' component='h2'>
          {Place[advert.place]}
        </Typography>
        <Typography gutterBottom component='h5'>
          {advert.subject.name}
        </Typography>
        <Typography gutterBottom component='h5'>
          {bid(advert.price, advert.time)}
        </Typography>
      </CardContent>
    </Card>
  </Grid>
);

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const bid = (price, time) => `${price} zł za ${time} min`
