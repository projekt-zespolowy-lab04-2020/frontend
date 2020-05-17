import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';

import { TicketsToolbar, TicketsCard } from '../components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getTickets } from '../../../actions/tickets/getTickets';
import { getTicketByID } from '../../../actions/tickets/getTicketByID';
import { addTicket, clearTickets } from '../../../redux/ticketsReducer';
import Spinner from '../../../components/Spinner/Spinner';

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

const TripsList = ({ userObject }) => {
  const classes = useStyles();
  const [searchResults, setSearchResults] = useState([]);
  const [hasTickets, setHasTicketsFlag] = useState(false);

  return (
    <div className={classes.root}>
      <Typography gutterBottom variant="h2">
        Contact Tourtool
      </Typography>

      <Typography gutterBottom variant="p">
        We're here to help you and answer any questions you might have. We look
        forward to hearing fromy you
      </Typography>
      <TicketsToolbar isTrip setSearchResults={setSearchResults} />
      {!searchResults.length && !hasTickets && <Spinner />}
      <div className={classes.content}>
        <Grid className={classes.tickets} container spacing={3}>
          {searchResults.map((data, index) => {
            return (
              <Grid item key={index} lg={12} md={12} xs={12}>
                <TicketsCard data={data} isTrip={false} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};

TripsList.propTypes = {
  userObject: PropTypes.object
};

const mapStateToProps = state => {
  const { user } = state;

  return {
    userObject: user
  };
};

export default connect(mapStateToProps, {
  getTicketsAction: getTickets,
  getTicketByIDAction: getTicketByID,
  addTicketAction: addTicket,
  clearTicketsAction: clearTickets
})(withRouter(TripsList));
