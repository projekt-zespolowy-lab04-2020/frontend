import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { Password } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(4)
  }
}));

const Settings = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
        style={{
          display: 'flex',
          justifyContent: 'center'
        }}>
        <Grid item md={6} xs={12}>
          <Password />
        </Grid>
      </Grid>
    </div>
  );
};

export default Settings;
