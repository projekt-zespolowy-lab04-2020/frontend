import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { green } from '../../../../../../../theme/palette';

const useStyles = makeStyles({
  avatar: {
    width: 60,
    height: 60,
    fontSize: 25,
    backgroundColor: green,
    fontWeight: 500,
    border: '1px solid #008160'
  }
});

const AvatarWrapper = props => {
  // eslint-disable-next-line
  const { firstName, lastName, dispatch, ...rest } = props;

  //TODO Find better solution to get out with staticContext Warning
  delete rest.staticContext;

  const classes = useStyles();

  return (
    <Avatar
      alt="Person"
      className={classes.avatar}
      component={RouterLink}
      {...rest}>
      {/*{firstName?.charAt(0).toUpperCase()}*/}
      {/*{lastName?.charAt(0).toUpperCase()}*/}
      AS
    </Avatar>
  );
};

AvatarWrapper.propTypes = {
  className: PropTypes.string
};

export default AvatarWrapper;
