/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import { Link as RouterLink, withRouter } from 'react-router-dom';
import React, { forwardRef } from 'react';

import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { List, ListItem, Button, colors } from '@material-ui/core';
import { setCurrentUser } from '../../../../../../redux/authReducer';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {},
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.primary.main
    }
  }
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div ref={ref} style={{ flexGrow: 1 }}>
    <NavLink {...props} />
  </div>
));

const SidebarNav = props => {
  const { pages, className, setCurrentUserAction, ...rest } = props;

  //TODO Find better solution to get out with staticContext Warning
  delete rest.staticContext;
  const classes = useStyles();

  const handleSignOut = () => {
    logout().catch(e => console.error(e.message));
  };

  const logout = async () => {
    setCurrentUserAction({});
    localStorage.removeItem('jwtToken');
  };

  return (
    <List {...rest} className={clsx(classes.root, className)}>
      {pages.map(page => (
        <ListItem className={classes.item} disableGutters key={page.title}>
          <Button
            activeClassName={classes.active}
            className={classes.button}
            component={CustomRouterLink}
            to={page.href}
            onClick={page.onClick === 'logout' ? handleSignOut : undefined}>
            <div className={classes.icon}>{page.icon}</div>
            {page.title}
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired,
  setCurrentUserAction: PropTypes.func.isRequired
};

export default connect(null, {
  setCurrentUserAction: setCurrentUser
})(withRouter(SidebarNav));
