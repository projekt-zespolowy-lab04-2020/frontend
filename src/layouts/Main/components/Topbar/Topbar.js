import React from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import { getCurrentUser } from '../../../../actions/get-user';
import { setCurrentUser } from '../../../../redux/authReducer';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

const Topbar = props => {
  const {
    history,
    className,
    onSidebarOpen,
    getCurrentUserAction,
    setCurrentUserAction,
    ...rest
  } = props;

  //TODO Find better solution to get out with staticContext Warning
  delete rest.staticContext;

  const classes = useStyles();

  const handleSignOut = event => {
    event.preventDefault();
    logout().catch(e => console.error(e.message));
  };

  const logout = async () => {
    // getCurrentUserAction(localStorage.getItem('jwtToken'))
    //   .then(obj => obj.json())
    //   .then(setCurrentUserAction(null))
    //   .catch(e => console.error('Error during logout ', e));
    //
    // localStorage.removeItem('jwtToken');
    // history.push('/sign-in');
    setCurrentUserAction({});
    localStorage.removeItem('jwtToken');
    history.push('/sign-in');
  };

  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar>
        <RouterLink to="/">
          <img alt="Logo" src="/images/logos/logo--white.svg" />
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <IconButton
            className={classes.signOutButton}
            color="inherit"
            onClick={handleSignOut}>
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  getCurrentUserAction: PropTypes.func.isRequired,
  history: PropTypes.object,
  onSidebarOpen: PropTypes.func,
  setCurrentUserAction: PropTypes.func.isRequired
};

export default connect(null, {
  setCurrentUserAction: setCurrentUser,
  getCurrentUserAction: getCurrentUser
})(withRouter(Topbar));
