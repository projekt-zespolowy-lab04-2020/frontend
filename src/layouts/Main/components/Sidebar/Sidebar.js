import React from 'react';
// noinspection SpellCheckingInspection
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';

import { Profile, SidebarNav } from './components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ADMIN } from 'helpers/types';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = ({ open, variant, onClose, className, userObject }) => {
  const classes = useStyles();
  const userRoles = userObject.roles || [];
  const isAdmin = roles => roles.includes(ADMIN);

  const pages = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <DashboardIcon />,
      active: isAdmin(userRoles)
    },
    {
      title: 'Users',
      href: '/users',
      icon: <PeopleIcon />,
      active: isAdmin(userRoles)
    },
    {
      title: 'Support',
      href: '/support',
      icon: <ShoppingBasketIcon />,
      active: true
    },
    {
      title: 'Account',
      href: '/account',
      icon: <AccountBoxIcon />,
      active: true
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: <SettingsIcon />,
      active: true
    }
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}>
      <div className={clsx(classes.root, className)}>
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav className={classes.nav} pages={pages} />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  userObject: PropTypes.object,
  variant: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  const { user } = state;

  return { userObject: user };
};

export default connect(mapStateToProps, null)(withRouter(Sidebar));
