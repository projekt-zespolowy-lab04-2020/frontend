import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar } from '@material-ui/core';
import { checkUserRole } from 'helpers/checkUserRole';
import { USER, ADMIN } from 'helpers/types';

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: 'none'
  }
}));

const Topbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const determineHomepage = () => {
    const role = checkUserRole();

    switch (role) {
      case ADMIN:
        return '/dashboard';
      case USER:
        return '/account';
      default:
        return '/';
    }
  };

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="primary"
      position="fixed">
      <Toolbar>
        <RouterLink to={determineHomepage}>
          <img alt="Logo" src="/images/logos/logo--white.svg" />
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string
};

export default Topbar;
