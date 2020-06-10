/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Typography,
  Divider,
  LinearProgress
} from '@material-ui/core';
import { green } from '../../../../theme/palette';
import AvatarWrapper from '../../../../layouts/Main/components/Sidebar/components/Profile/Avatar';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex',
    alignItems: 'center',
    height: 224
  },
  avatar: {
    marginLeft: 'auto',
    height: 100,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: green,
    fontWeight: 500,
    width: 100,
    flexShrink: 0,
    flexGrow: 0,
    fontSize: 45,
    border: '1px solid #008160'
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  }
}));

const AccountProfile = props => {
  const {
    profileCompleteness,
    userObject,
    dispatch,
    className,
    ...rest
  } = props;
  const classes = useStyles();

  //TODO Find better solution to get out with staticContext Warning
  delete rest.staticContext;

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <div className={classes.details}>
          <Typography gutterBottom variant="h2">
            {`${userObject.firstName} ${userObject.lastName}`}
          </Typography>
          <AvatarWrapper
            className={classes.avatar}
            firstName={userObject.firstName?.charAt(0).toUpperCase()}
            lastName={userObject.lastName?.charAt(0).toUpperCase()}
            to="/settings"
          />
        </div>
        <div className={classes.progress}>
          <Typography variant="body1">
            Profile Completeness: {profileCompleteness}%
          </Typography>
          <LinearProgress value={profileCompleteness} variant="determinate" />
        </div>
      </CardContent>
      <Divider />
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string,
  userObject: PropTypes.object
};

const mapStateToProps = state => {
  const { user } = state;

  return {
    userObject: user
  };
};

export default connect(mapStateToProps, null)(withRouter(AccountProfile));
