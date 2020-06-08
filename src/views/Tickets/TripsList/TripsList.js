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
import { getTripCommentsByID } from '../../../actions/trips/getTripCommentsByID';

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
  getUserTripsAction,
  getTripCommentsByIDAction
}) => {
  const classes = useStyles();
  const [searchResults, setSearchResults] = useState([]);
  const [hasTickets, setHasTicketsFlag] = useState(false);
  const [isGuide, setGuide] = useState(false);
  const isUserGuide = roles => roles.includes(GUIDE);

  useEffect(() => {
    setSearchResults(tripsObject.trips);
  }, [tripsObject]);

  const getTripCommentsAsync = async (ID, token) => {
    const response = await getTripCommentsByIDAction(ID, token);
    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error('Error retrieving trip comments.');
    }
  };

  const getAllTripComments = async (data, token) => {
    return Promise.all(
      data.map(obj => {
        const { id } = obj;

        return getTripCommentsAsync(id, token);
      })
    );
  };

  const normalizeAndAddTrip = (data, comments) => {
    data.forEach((response, index) => {
      addTripAction({
        ...response,
        comments: !comments.length ? [] : comments[index],
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
    if (!data.length) setHasTicketsFlag(true);
  };

  const getCurrentGuideTripsList = async () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const response = await getTripsAction(token);
      const res = await response.json();
      if (response.status === 200) {
        getAllTripComments(res, token)
          .then(commentsList => {
            normalizeAndAddTrip(res, commentsList);
          })
          .catch(e => console.error(e.message));
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
        getAllTripComments(res, token)
          .then(commentsList => {
            normalizeAndAddTrip(res, commentsList);
          })
          .catch(e => console.error(e.message));
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
        data={tripsObject.trips}
        setSearchResults={setSearchResults}
        setHasTicketsFlag={setHasTicketsFlag}
        isGuide={isGuide}
      />
      {!searchResults.length && !hasTickets && <Spinner />}
      <div className={classes.content}>
        <Grid className={classes.tickets} container spacing={3}>
          {(tripsObject.showJoinedTrips
            ? searchResults.filter(obj => obj.joined)
            : searchResults
          ).map((data, index) => {
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
  getTripCommentsByIDAction: PropTypes.func,
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
  addTripAction: addTrip,
  getTripCommentsByIDAction: getTripCommentsByID
})(withRouter(TripsList));
