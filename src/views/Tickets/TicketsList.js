import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { TicketsToolbar, TicketsCard } from './components';
import PropTypes, { func } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ADMIN } from '../../helpers/types';
import { getTickets } from '../../actions/tickets/getTickets';
import { getTicketByID } from '../../actions/tickets/getTicketByID';

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
  getTicketByIDAction
}) => {
  const classes = useStyles();
  const [tickets, setTickets] = useState([]);

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
      console.log(res);
      if (response.status === 200) {
        getAllUserTickets(res, token)
          // TODO when content arrives we should setTicket
          .then(tickets => console.log(tickets))
          .catch(e => console.error(e.message));
      } else {
        throw new Error('Error retrieving tickets.');
      }
    }
  };

  useEffect(() => {
    setTickets(ticketsObject);
  }, [ticketsObject]);

  const isAdmin = roles => roles.includes(ADMIN);

  useEffect(() => {
    // noinspection JSUnresolvedVariable
    const roles = userObject.roles || [];
    setAdmin(isAdmin(roles));
    getTicketsList(isAdmin(roles)).catch(e => console.error(e.message));
  }, [userObject]);

  return (
    <div className={classes.root}>
      <TicketsToolbar />
      {
        <div className={classes.content}>
          <Grid className={classes.tickets} container spacing={3}>
            {tickets.map((data, index) => (
              <Grid item key={index} lg={12} md={12} xs={12}>
                <TicketsCard data={data} />
              </Grid>
            ))}
          </Grid>
        </div>
      }
    </div>
  );
};

TicketsList.propTypes = {
  getTicketByIDAction: PropTypes.func,
  getTicketsAction: PropTypes.func,
  ticketsObject: PropTypes.arrayOf(PropTypes.object),
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
  getTicketByIDAction: getTicketByID
})(withRouter(TicketsList));
