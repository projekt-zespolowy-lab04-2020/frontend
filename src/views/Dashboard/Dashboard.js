import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { getUsers } from 'actions/get-users';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Budget,
  TotalUsers,
  TasksProgress,
  TotalProfit,
  LatestSales,
  LatestOrders
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = props => {
  const classes = useStyles();
  const { getUsersAction } = props;

  const [usersCount, setUsersCount] = useState(null);

  const getUsers = async () => {
    const token = localStorage.getItem('jwtToken');

    if (token) {
      const response = await getUsersAction(token);

      // Need to be admin in order to get 200 from /users
      if (response.status === 200) {
        const users = await response.json();
        setUsersCount(users.length);
      } else {
        throw new Error('Error during getting all users!');
      }
    }
  }

  const getUserNumber = () => {
    getUsers().catch(err => console.log(err.message));
  };

  useEffect(getUserNumber, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Budget />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalUsers totalUsers={usersCount} />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TasksProgress />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalProfit />
        </Grid>
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <LatestSales />
        </Grid>
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <LatestOrders />
        </Grid>
      </Grid>
    </div>
  );
};

TotalUsers.propTypes = {
  getUsersAction: PropTypes.func
};

export default connect(null, {
  getUsersAction: getUsers 
})(withRouter(Dashboard));
