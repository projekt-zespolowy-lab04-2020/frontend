import React, { useEffect, useState } from 'react';
// noinspection SpellCheckingInspection
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setCurrentUser } from '../../../../redux/authReducer';
import { patch } from '../../../../actions/patch';

const useStyles = makeStyles(() => ({
  root: {}
}));

const AccountDetails = props => {
  const {
    className,
    // eslint-disable-next-line
    dispatch,
    setProfileCompleteness,
    setCurrentUserAction,
    patchEmailAction,
    userObject,
    ...rest
  } = props;
  const classes = useStyles();

  //TODO Find better solution to get out with staticContext Warning
  delete rest.staticContext;

  const [values, setValues] = useState({});

  useEffect(() => {
    setValues({
      firstName: userObject.firstName,
      lastName: userObject.lastName,
      email: userObject.email
    });
  }, [userObject]);

  useEffect(() => {
    const completed = Object.keys(values).filter(obj => isEmpty(obj)).length;
    const fullProgress = 100;
    const numberOfInfos = 3;
    const percent = (completed / numberOfInfos) * fullProgress;
    setProfileCompleteness(Math.round(percent));
  }, [values]);

  const isEmpty = field => values[field];

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSaveDetails = event => {
    event.preventDefault();
    patchEmailAction(values, localStorage.getItem('jwtToken'))
      .then(obj => console.log(obj))
      .then(obj => obj.json())
      .then(obj => console.log(obj));
    setCurrentUserAction(values);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form autoComplete="off" noValidate>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                margin="dense"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName || ''}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last name"
                margin="dense"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName || ''}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                margin="dense"
                name="email"
                onChange={handleChange}
                required
                value={values.email || ''}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            onClick={handleSaveDetails}
            variant="contained">
            Save details
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string,
  patchEmailAction: PropTypes.func,
  setCurrentUserAction: PropTypes.func,
  setProfileCompleteness: PropTypes.func,
  userObject: PropTypes.object
};

const mapStateToProps = state => {
  const { user } = state;

  return {
    userObject: user
  };
};

export default connect(mapStateToProps, {
  setCurrentUserAction: setCurrentUser,
  patchEmailAction: patch
})(withRouter(AccountDetails));
