import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { getUsers } from 'actions/getUsers';
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
import { setUsersCount } from '../../redux/usersCountReducer';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = props => {
  const classes = useStyles();
  const { getUsersAction, setUsersCountAction, usersCount } = props;

  const getUsers = async () => {
    const token = localStorage.getItem('jwtToken');

    if (token) {
      const response = await getUsersAction(token);

      // Need to be admin in order to get 200 from /users
      if (response.status === 200) {
        const totalUsersCount = await response.json();
        setUsersCountAction(totalUsersCount.length);
      } else {
        throw new Error('Error during getting all users!');
      }
    }
  };

  const getUserNumber = () => {
    if (!usersCount) {
      getUsers().catch(err => console.log(err.message));
    }
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
  getUsersAction: PropTypes.func,
  setUsersCountAction: PropTypes.func
};

const mapStateToProps = state => {
  const { usersCount } = state;
  return { usersCount };
};

export default connect(mapStateToProps, {
  getUsersAction: getUsers,
  setUsersCountAction: setUsersCount
})(withRouter(Dashboard));
