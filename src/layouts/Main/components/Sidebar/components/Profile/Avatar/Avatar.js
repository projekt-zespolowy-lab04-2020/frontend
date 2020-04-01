import React from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { green } from '../../../../../../../theme/palette';

const useStyles = makeStyles({
  avatar: {
    width: 60,
    height: 60,
    backgroundColor: green,
    fontWeight: 500,
    letterSpacing: 3
  }
});

const AvatarWrapper = props => {
  // eslint-disable-next-line
  const { firstName, lastName, userObject, dispatch, ...rest } = props;

  //TODO Find better solution to get out with staticContext Warning
  delete rest.staticContext;

  const classes = useStyles();

  return (
    <Avatar
      alt="Person"
      className={classes.avatar}
      component={RouterLink}
      {...rest}>
      {firstName?.charAt(0).toUpperCase()}
      {lastName?.charAt(0).toUpperCase()}
    </Avatar>
  );
};

AvatarWrapper.propTypes = {
  className: PropTypes.string,
  userObject: PropTypes.object
};

const mapStateToProps = state => {
  const { user } = state;

  return {
    userObject: user
  };
};

export default connect(mapStateToProps, null)(withRouter(AvatarWrapper));
