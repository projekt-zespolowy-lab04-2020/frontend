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
import isEmpty from 'helpers/isEmpty';


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
  const { className, ...rest } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema) || {};

    if (formState.values.password !== formState.values.confirm) {
      errors.confirm = ['Confirm password must match'];
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

  return (
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
            color="primary"
            variant="outlined"
          >
            Update
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

Password.propTypes = {
  className: PropTypes.string
};

export default Password;
