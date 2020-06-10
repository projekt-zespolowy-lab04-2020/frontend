import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { getUsers } from 'actions/getUsers';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  TotalCreatedTrips,
  TotalUsers,
  LatestSupportTickets
} from './components';
import { setUsersCount } from '../../redux/usersCountReducer';
import { getUserTrips } from '../../actions/users/getUserTrips';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = props => {
  const classes = useStyles();
  const {
    getUsersAction,
    setUsersCountAction,
    usersCount,
    getUserTripsAction
  } = props;
  const [createdTrips, setCreatedTrips] = useState(0);
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

  const getUserTripsList = async () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const response = await getUserTripsAction(token);
      const res = await response.json();

      if (response.status === 200) {
        setCreatedTrips(res.length);
      } else {
        throw new Error('Error during getting user trips.');
      }
    }
  };

  useEffect(() => {
    getUserNumber();
    getUserTripsList().catch(e => console.error(e.message));
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={6} sm={6} xl={6} xs={12}>
          <TotalCreatedTrips createdTrips={createdTrips} />
        </Grid>
        <Grid item lg={6} sm={6} xl={6} xs={12}>
          <TotalUsers totalUsers={usersCount} />
        </Grid>
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <LatestSupportTickets />
        </Grid>
      </Grid>
    </div>
  );
};

Dashboard.propTypes = {
  getUserTripsAction: PropTypes.func,
  getUsersAction: PropTypes.func,
  setUsersCountAction: PropTypes.func,
  usersCount: PropTypes.number
};

const mapStateToProps = state => {
  const { usersCount } = state;
  return { usersCount };
};

export default connect(mapStateToProps, {
  getUsersAction: getUsers,
  setUsersCountAction: setUsersCount,
  getUserTripsAction: getUserTrips
})(withRouter(Dashboard));
