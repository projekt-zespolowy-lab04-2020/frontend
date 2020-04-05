import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  TextField
} from '@material-ui/core';
import validate from 'validate.js';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import isEmpty from 'helpers/isEmpty';
import { patch } from 'actions/patch';
import { setCurrentUser } from 'redux/authReducer';
import LogoutDialog from 'components/Dialogs/LogoutDialog';

const useStyles = makeStyles(() => ({
  root: {}
}));

const schema = {
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 6,
      maximum: 128
    }
  },
  confirm: {
    presence: { allowEmpty: false, message: 'must match' }
  },
}

const Password = props => {
  const { 
    className,
    userObject,
    patchAction,
    history,
    setCurrentUserAction,
    ...rest
  } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [updateData, setUpdateData] = useState(false);

  useEffect(() => {
    const errors = validate(formState.values, schema) || {};

    if (formState.values.password !== formState.values.confirm) {
      errors.confirm = ['Both fields must match'];
    }

    setFormState(formState => ({
      ...formState,
      isValid: isEmpty(errors),
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();

    setFormState({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    });
  };

  const hasError = field => formState.touched[field] && !!formState.errors[field];

  const handleUpdatePassword = event => {
    event.preventDefault();
    setOpenDialog(!openDialog);
    updatePassword();
  }

  const updatePassword = () => {
    if (updateData) {
      patch().catch(e => console.error(e.message));
    }
  }

  useEffect(() => {
    updatePassword();
  }, [updateData]);

  const logout = async () => {
    setCurrentUserAction({});
    localStorage.removeItem('jwtToken');
    history.push('/sign-in');
  };

  const patch = async () => {
    const body = { ...formState.values };
    delete body.confirm;
    const token = localStorage.getItem('jwtToken');
    const email = userObject.email;

    if (token) {
      const response = await patchAction(email, body, token);

      if (response.status === 200) {
        logout();
      } else {
        throw new Error('Error during patching. There is no token available');
      }
    }
  };

  return (
    <>
      {openDialog && (
        <LogoutDialog
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          setUpdateData={setUpdateData}
        />
      )}
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >
        <form>
          <CardHeader
            subheader="Update password"
            title="Password"
          />
          <Divider />
          <CardContent>
            <TextField
              error={hasError('password')}
              helperText={
                hasError('password') ? formState.errors.password[0] : null
              }
              fullWidth
              label="Password"
              name="password"
              onChange={handleChange}
              type="password"
              value={formState.password}
              variant="outlined"
            />
            <TextField
              error={hasError('confirm')}
              helperText={
                hasError('confirm') ? formState.errors.confirm[0] : null
              }
              fullWidth
              label="Confirm password"
              name="confirm"
              onChange={handleChange}
              style={{ marginTop: '1rem' }}
              type="password"
              value={formState.confirm}
              variant="outlined"
            />
          </CardContent>
          <Divider />
          <CardActions>
            <Button
              disabled={!formState.isValid}
              onClick={handleUpdatePassword}
              color="primary"
              variant="outlined"
            >
              Update
            </Button>
          </CardActions>
        </form>
      </Card>
    </>
  );
};

Password.propTypes = {
  className: PropTypes.string,
  patchAction: PropTypes.func,
  userObject: PropTypes.object,
  history: PropTypes.object,
  setCurrentUserAction: PropTypes.func,
};

const mapStateToProps = state => {
  const { user } = state;

  return {
    userObject: user
  };
};

export default connect(mapStateToProps, {
  patchAction: patch,
  setCurrentUserAction: setCurrentUser
})(withRouter(Password));
