import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { AccountProfile, AccountDetails, AccountManagement } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Account = () => {
  const classes = useStyles();
  const [profileCompleteness, setProfileCompleteness] = useState(0);

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={4} md={6} xl={4} xs={12}>
          <AccountProfile profileCompleteness={profileCompleteness} />
        </Grid>
        <Grid item lg={8} md={6} xl={8} xs={12}>
          <AccountDetails setProfileCompleteness={setProfileCompleteness} />
        </Grid>
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <AccountManagement />
        </Grid>
      </Grid>
    </div>
  );
};

export default Account;
