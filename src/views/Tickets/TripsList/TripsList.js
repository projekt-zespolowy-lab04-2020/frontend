import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { TicketsToolbar, TicketsCard } from '../components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Spinner from '../../../components/Spinner/Spinner';
import TicketsHeader from '../components/TicketsHeader';
import { GUIDE } from '../../../helpers/types';
import { getTrips } from '../../../actions/trips/getTrips';
import { addTrip } from '../../../redux/tripReducer';
import { getUserTrips } from '../../../actions/users/getUserTrips';

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

const TripsList = ({
  userObject,
  tripsObject,
  getTripsAction,
  addTripAction,
  getUserTripsAction
}) => {
  const classes = useStyles();
  const [searchResults, setSearchResults] = useState([]);
  const [hasTickets, setHasTicketsFlag] = useState(false);
  const [isGuide, setGuide] = useState(false);
  const isUserGuide = roles => roles.includes(GUIDE);

  useEffect(() => {
    setSearchResults(tripsObject.trips);
  }, [tripsObject]);

  const normalizeAndAddTrip = data => {
    data.forEach(response => {
      addTripAction({
        ...response,
        dateAndTime: response.dateTrip,
        name: response.route.name,
        route: {
          points: response.route.points.map(point => {
            return {
              order: point.order,
              position: JSON.parse(point['coordinates'])
            };
          })
        }
      });
    });
  };

  const getCurrentGuideTripsList = async () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const response = await getTripsAction(token);
      const res = await response.json();
      if (response.status === 200) {
        normalizeAndAddTrip(res);
      } else {
        throw new Error('Error during getting current guide trips.');
      }
    }
  };

  const getUserTripsList = async () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const response = await getUserTripsAction(token);
      const res = await response.json();
      if (response.status === 200) {
        normalizeAndAddTrip(res);
      } else {
        throw new Error('Error during getting user trips.');
      }
    }
  };

  useEffect(() => {
    // noinspection JSUnresolvedVariable
    const { isAuthenticated } = userObject;
    if (isAuthenticated) {
      const roles = userObject.roles || [];
      setGuide(isUserGuide(roles));

      if (isUserGuide(roles)) {
        getCurrentGuideTripsList().catch(e => console.error(e.message));
      } else {
        getUserTripsList().catch(e => console.error(e.message));
      }
    }
  }, [userObject]);

  return (
    <div className={classes.root}>
      <TicketsHeader
        header={'Book a trip here'}
        paragraph={
          'Simply click the button, fill in the appropriate fields and your' +
          ' request will be forwarded to the nearest guide in the area'
        }
      />
      <TicketsToolbar
        isTrip
        setSearchResults={setSearchResults}
        isGuide={isGuide}
      />
      {!searchResults.length && !hasTickets && <Spinner />}
      <div className={classes.content}>
        <Grid className={classes.tickets} container spacing={3}>
          {searchResults.map((data, index) => {
            return (
              <Grid item key={index} lg={12} md={12} xs={12}>
                <TicketsCard data={data} isTrip />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};

TripsList.propTypes = {
  addTripAction: PropTypes.func,
  getTripsAction: PropTypes.func,
  getUserTripsAction: PropTypes.func,
  tripsObject: PropTypes.object,
  userObject: PropTypes.object
};

const mapStateToProps = state => {
  const { user, trips } = state;

  return {
    userObject: user,
    tripsObject: trips
  };
};

export default connect(mapStateToProps, {
  getTripsAction: getTrips,
  getUserTripsAction: getUserTrips,
  addTripAction: addTrip
})(withRouter(TripsList));
