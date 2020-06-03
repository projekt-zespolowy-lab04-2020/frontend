import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { TicketsToolbar, TicketsCard } from '../components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getTickets } from '../../../actions/tickets/getTickets';
import { getTicketByID } from '../../../actions/tickets/getTicketByID';
import { addTicket, clearTickets } from '../../../redux/ticketsReducer';
import Spinner from '../../../components/Spinner/Spinner';
import TicketsHeader from '../components/TicketsHeader';
import { ADMIN, GUIDE } from '../../../helpers/types';
import { getTrips } from '../../../actions/trips/getTrips';

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

const TripsList = ({ userObject, tripsObject, getTripsAction }) => {
  const classes = useStyles();
  const [searchResults, setSearchResults] = useState([]);
  const [hasTickets, setHasTicketsFlag] = useState(false);
  const [isGuide, setGuide] = useState(false);
  const isUserGuide = roles => roles.includes(GUIDE);

  useEffect(() => {
    setSearchResults(tripsObject.trips);
  }, [tripsObject]);

  // const getTripAsync = async (ID, token) => {
  //   const response = await getTicketByIDAction(ID, token);
  //   if (response.status === 200) {
  //     return await response.json();
  //   } else {
  //     throw new Error('Error retrieving single ticket.');
  //   }
  // };
  //
  // const getAllUserTrip = async (ticketsList, token) => {
  //   return Promise.all(
  //     ticketsList.map(obj => {
  //       const { id } = obj;
  //
  //       return getTripAsync(id, token);
  //     })
  //   );
  // };

  const getTripsList = async () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const response = await getTripsAction(token);
      const res = await response.json();
      console.log('elo');

      console.log(response);
      console.log(res);
      // if (response.status === 200) {
      //   getAllCurrentGuideTrips(res, token)
      //     .then(tickets =>
      //       tickets.filter(obj => {
      //         console.log(tickets);
      //         const { ticket } = obj;
      //         const { closed } = ticket;
      //         return !closed;
      //       })
      //     )
      //     .then(tickets => {
      //       if (!tickets.length) setHasTicketsFlag(true);
      //       clearTicketsAction();
      //       tickets.forEach(ticketObject => {
      //         const { ticket } = ticketObject;
      //         const { content } = ticket;
      //         const ticketTempObject = {
      //           ...ticketObject,
      //           ticket: {
      //             ...ticketObject.ticket,
      //             content: JSON.parse(content)
      //           }
      //         };
      //         addTicketAction(ticketTempObject);
      //       });
      //     })
      //     .catch(e => console.error(e.message));
      // } else {
      //   throw new Error('Error retrieving tickets.');
      // }
    }
  };

  useEffect(() => {
    // noinspection JSUnresolvedVariable
    console.log('esddsd');
    const { isAuthenticated } = userObject;
    if (isAuthenticated) {
      const roles = userObject.roles || [];
      setGuide(isUserGuide(roles));

      if (isUserGuide(roles)) {
        console.log(1);
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
  getTripsAction: getTrips
})(withRouter(TripsList));
