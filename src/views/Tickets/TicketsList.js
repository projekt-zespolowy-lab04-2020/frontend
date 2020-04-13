import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { TicketsToolbar, TicketsCard } from './components';
import mockData from './data';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ADMIN } from '../../helpers/types';

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

const TicketsList = ({ userObject }) => {
  const [admin, setAdmin] = useState(false);
  const classes = useStyles();
  const [tickets] = useState(mockData);

  const isAdmin = roles => roles.includes(ADMIN);

  useEffect(() => {
    // noinspection JSUnresolvedVariable
    const roles = userObject.roles || [];
    setAdmin(isAdmin(roles));
  }, [userObject]);

  return (
    // <>
    <div className={classes.root}>
      <TicketsToolbar />
      {admin && (
        <div className={classes.content}>
          <Grid className={classes.tickets} container spacing={3}>
            {tickets.map(product => (
              <Grid item key={product.id} lg={12} md={12} xs={12}>
                <TicketsCard product={product} />
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </div>
    // </>
  );
};

TicketsList.propTypes = {
  userObject: PropTypes.object
};

const mapStateToProps = state => {
  const { user } = state;

  return {
    userObject: user
  };
};

export default connect(mapStateToProps, null)(withRouter(TicketsList));
