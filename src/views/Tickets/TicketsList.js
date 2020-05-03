import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { TicketsToolbar, TicketsCard } from './components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ADMIN } from '../../helpers/types';
import { getTickets } from '../../actions/tickets/getTickets';
import { getTicketByID } from '../../actions/tickets/getTicketByID';
import { addTicket, clearTickets } from '../../redux/ticketsReducer';
import Spinner from '../../components/Spinner/Spinner';

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

const TicketsList = ({
  userObject,
  ticketsObject,
  getTicketsAction,
  addTicketAction,
  getTicketByIDAction,
  clearTicketsAction
}) => {
  const classes = useStyles();

  const getTicketAsync = async (ID, token) => {
    const response = await getTicketByIDAction(ID, token);
    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error('Error retrieving single ticket.');
    }
  };

  const getAllUserTickets = async (ticketsList, token) => {
    return Promise.all(
      ticketsList.map(obj => {
        const { id } = obj;

        return getTicketAsync(id, token);
      })
    );
  };

  const getTicketsList = async isAdmin => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const response = await getTicketsAction(isAdmin, token);
      const res = await response.json();

      if (response.status === 200) {
        getAllUserTickets(res, token)
          .then(tickets =>
            tickets.filter(obj => {
              const { ticket } = obj;
              const { closed } = ticket;
              return !closed;
            })
          )
          .then(tickets => {
            clearTicketsAction();

            tickets.forEach(ticketObject => {
              const { ticket } = ticketObject;
              const { content } = ticket;
              const ticketTempObject = {
                ...ticketObject,
                ticket: {
                  ...ticketObject.ticket,
                  content: JSON.parse(content)
                }
              };
              addTicketAction(ticketTempObject);
            });
          })
          .catch(e => console.error(e.message));
      } else {
        throw new Error('Error retrieving tickets.');
      }
    }
  };

  const isAdmin = roles => roles.includes(ADMIN);

  useEffect(() => {
    // noinspection JSUnresolvedVariable
    const { isAuthenticated } = userObject;
    if (isAuthenticated) {
      const roles = userObject.roles || [];
      getTicketsList(isAdmin(roles)).catch(e => console.error(e.message));
    }
  }, [userObject]);

  return (
    <div className={classes.root}>
      <TicketsToolbar />
      {!ticketsObject.tickets.length && <Spinner />}
      <div className={classes.content}>
        <Grid className={classes.tickets} container spacing={3}>
          {ticketsObject.tickets.map((data, index) => {
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

TicketsList.propTypes = {
  addTicketAction: PropTypes.func,
  clearTicketsAction: PropTypes.func,
  getTicketByIDAction: PropTypes.func,
  getTicketsAction: PropTypes.func,
  ticketsObject: PropTypes.object,
  toggleLoadedFromDBAction: PropTypes.func,
  userObject: PropTypes.object
};

const mapStateToProps = state => {
  const { user, tickets } = state;

  return {
    userObject: user,
    ticketsObject: tickets
  };
};

export default connect(mapStateToProps, {
  getTicketsAction: getTickets,
  getTicketByIDAction: getTicketByID,
  addTicketAction: addTicket,
  clearTicketsAction: clearTickets
})(withRouter(TicketsList));
