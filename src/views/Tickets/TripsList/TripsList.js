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
  const [isGuide, setGuide] = useState(false);
  const isUserGuide = roles => roles.includes(GUIDE);

  useEffect(() => {
    // noinspection JSUnresolvedVariable
    const { isAuthenticated } = userObject;
    if (isAuthenticated) {
      const roles = userObject.roles || [];
      setGuide(isUserGuide(roles));
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

export default connect(mapStateToProps, {})(withRouter(TripsList));
