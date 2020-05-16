/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
// noinspection ES6CheckImport
import { withRouter } from 'react-router-dom';
// noinspection SpellCheckingInspection
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import AvatarWrapper from './Avatar';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = props => {
  // eslint-disable-next-line
  const { userObject, className, dispatch, ...rest } = props;
  const classes = useStyles();

  //TODO Find better solution to get out with staticContext Warning
  delete rest.staticContext;

  useEffect(() => {}, [userObject]);
  // noinspection JSUnresolvedVariable
  const user = {
    name: `${userObject.firstName} ${userObject.lastName}`,
    bio: userObject.roles?.join(', ')
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <AvatarWrapper
        firstName={userObject.firstName}
        lastName={userObject.lastName}
        to="/settings"
      />
      <Typography className={classes.name} variant="h4">
        {user.name}
      </Typography>
      <Typography variant="body2">{user.bio}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
  userObject: PropTypes.object
};

const mapStateToProps = state => {
  const { user } = state;

  return {
    userObject: user
  };
};

export default connect(mapStateToProps, null)(withRouter(Profile));
