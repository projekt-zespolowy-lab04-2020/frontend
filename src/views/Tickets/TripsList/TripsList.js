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
  addTripAction
}) => {
  const classes = useStyles();
  const [searchResults, setSearchResults] = useState([]);
  const [hasTickets, setHasTicketsFlag] = useState(false);
  const [isGuide, setGuide] = useState(false);
  const isUserGuide = roles => roles.includes(GUIDE);

  useEffect(() => {
    setSearchResults(tripsObject.trips);
  }, [tripsObject]);

  const getTripsList = async () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const response = await getTripsAction(token);
      const res = await response.json();

      res.forEach(response => {
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
    }
  };

  useEffect(() => {
    // noinspection JSUnresolvedVariable
    const { isAuthenticated } = userObject;
    if (isAuthenticated) {
      const roles = userObject.roles || [];
      setGuide(isUserGuide(roles));

      if (isUserGuide(roles)) {
        getTripsList().catch(e => console.error(e.message));
      } else {
        // get user
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
  addTripAction: addTrip
})(withRouter(TripsList));
