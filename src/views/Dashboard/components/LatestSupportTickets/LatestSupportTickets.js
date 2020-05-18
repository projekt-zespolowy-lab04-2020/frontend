import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel
} from '@material-ui/core';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ADMIN } from 'helpers/types';
import { getTickets } from 'actions/tickets/getTickets';
import { getTicketByID } from 'actions/tickets/getTicketByID';
import Spinner from 'components/Spinner/Spinner';
import moment from 'moment';


const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 800
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));


const LatestSupportTickets = props => {
  const { 
    className,
    userObject,
    getTicketsAction,
    getTicketByIDAction,
    ...rest
  } = props;

  const classes = useStyles();

  const [hasTickets, setHasTicketsFlag] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [sortByDateDesc, setSortByDateDesc] = useState(true);
  const [sortByOpenStatus, setSortByOpenStatus] = useState(true);

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
          .then(tickets => tickets.sort((t1, t2) => (
            moment(t2.ticket.createDate, 'DD-MM-YYYY') - moment(t1.ticket.createDate, 'DD-MM-YYYY')
          )))
          .then(tickets => {
            if (!tickets.length) setHasTicketsFlag(true);
            // store tickets list in local variable instead in redux store 
            // -> there is error while navigating to /support after fetching tickets in this component
            setSearchResults([...tickets]);
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

  const handleSortTicketsByDate = () => {
    const dateFormat = 'DD-MM-YYYY';
    if (sortByDateDesc) {
      setSearchResults([
        ...searchResults.sort((t1, t2) => (
          moment(t1.ticket.createDate, dateFormat) - moment(t2.ticket.createDate, dateFormat)
        ))
      ]);
    } else {
      setSearchResults([
        ...searchResults.sort((t1, t2) => (
          moment(t2.ticket.createDate, dateFormat) - moment(t1.ticket.createDate, dateFormat)
        ))
      ]);      
    }

    setSortByDateDesc(!sortByDateDesc);
  };

  const handleSortTicketsByStatus = () => {
    if (sortByOpenStatus) {
      setSearchResults([...searchResults.sort((t1, _) => t1.ticket.closed ? -1 : 1)]);
    } else {
      setSearchResults([...searchResults.sort((t1, _) => t1.ticket.closed ? 1 : -1)]);
    }
    setSortByOpenStatus(!sortByOpenStatus);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Latest Support Tickets" />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            {(!searchResults.length && !hasTickets) ?
              <Spinner /> :
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Author</TableCell>
                    <TableCell sortDirection="desc">
                      <Tooltip enterDelay={300} title="Sort">
                        <TableSortLabel
                          active
                          direction={sortByDateDesc ? 'desc' : 'asc'}
                          onClick={handleSortTicketsByDate}>
                            Date
                        </TableSortLabel>
                      </Tooltip>
                    </TableCell>
                    <TableCell sortDirection="desc">
                      <Tooltip enterDelay={300} title="Sort">
                        <TableSortLabel
                          active
                          direction={sortByOpenStatus ? 'desc' : 'asc'}
                          onClick={handleSortTicketsByStatus}>
                            Status
                        </TableSortLabel>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchResults.map((data, index) => {
                    const { ticket } = data;
                    return (
                      <TableRow hover key={index}>
                        <TableCell>{ticket.id}</TableCell>
                        <TableCell>
                          {ticket.author}
                        </TableCell>
                        <TableCell>
                          {ticket.createDate}
                        </TableCell>
                        <TableCell>
                          {ticket.closed ? 'Closed' : 'Open'}
                        </TableCell>
                      </TableRow>
                    );             
                  })}
                </TableBody>
            </Table>}
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        TODO: pagination here
      </CardActions>
    </Card>
  );
};

LatestSupportTickets.propTypes = {
  className: PropTypes.string,
  getTicketByIDAction: PropTypes.func,
  getTicketsAction: PropTypes.func,
  userObject: PropTypes.object
};

const mapStateToProps = state => {
  const { user } = state;

  return {
    userObject: user,
  };
};

export default connect(mapStateToProps, {
  getTicketsAction: getTickets,
  getTicketByIDAction: getTicketByID,
})(withRouter(LatestSupportTickets));
