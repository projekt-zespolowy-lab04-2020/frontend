import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { ProductsToolbar, ProductCard } from './components';
import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  tickets: {
    width: '800px'
  }
}));

const TicketsList = () => {
  const classes = useStyles();

  const [tickets] = useState(mockData);

  return (
    <div className={classes.root}>
      <ProductsToolbar />
      <div className={classes.content}>
        <Grid className={classes.tickets} container spacing={3}>
          {tickets.map(product => (
            <Grid item key={product.id} lg={12} md={12} xs={12}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default TicketsList;
