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
import { patchUser } from '../../../../actions/users/patchUser';
import ConfirmationDialog from '../../../../components/Dialogs/ConfirmationDialog';
import { clearTickets } from '../../../../redux/ticketsReducer';

const useStyles = makeStyles(() => ({
  root: {}
}));

const AccountDetails = props => {
  const {
    className,
    clearTicketsAction,
    // eslint-disable-next-line
    dispatch,
    history,
    setProfileCompleteness,
    setCurrentUserAction,
    patchAction,
    userObject,
    ...rest
  } = props;

  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [updateData, setUpdateData] = useState(false);

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
    const isEmpty = field => values[field];
    const completed = Object.keys(values).filter(obj => isEmpty(obj)).length;
    const fullProgress = 100;
    const numberOfInfos = 3;
    const percent = (completed / numberOfInfos) * fullProgress;
    setProfileCompleteness(Math.round(percent));
  }, [values, setProfileCompleteness]);

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const logout = async () => {
    setCurrentUserAction({});
    clearTicketsAction();
    localStorage.removeItem('jwtToken');
    history.push('/sign-in');
  };

  const pathUserData = () => {
    if (updateData) {
      patch().catch(e => console.error(e.message));
    }
  };

  useEffect(() => {
    pathUserData();
    // We dont want the dependency on pathUserData
  }, [updateData]);

  const patch = async () => {
    const token = localStorage.getItem('jwtToken');
    const email = userObject.email;

    if (token) {
      const response = await patchAction(email, values, token);

      if (response.status === 200) {
        // We must log out because patching changes the token
        logout();
      }
    } else {
      throw new Error('Error during patching. There is no token available');
    }
  };

  const handleSaveDetails = event => {
    event.preventDefault();
    setOpenDialog(!openDialog);
    pathUserData();
  };

  return (
    <>
      {openDialog && (
        <ConfirmationDialog
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          setUpdateData={setUpdateData}
          title={'Confirmation of data change'}
          content={
            '            Changing the data logs out the user. After logging out and re-login\n' +
            '            your data will be changed.Click Agree if you are sure you want to\n' +
            '            change the data or Disagree if you changed your mind.'
          }
        />
      )}
      <Card {...rest} className={clsx(classes.root, className)}>
        <form autoComplete="off" noValidate>
          <CardHeader
            subheader="The information can be edited"
            title="Profile"
          />
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
    </>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string,
  clearTicketsAction: PropTypes.func,
  history: PropTypes.object,
  patchAction: PropTypes.func,
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
  clearTicketsAction: clearTickets,
  setCurrentUserAction: setCurrentUser,
  patchAction: patchUser
})(withRouter(AccountDetails));
