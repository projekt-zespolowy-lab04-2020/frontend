import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import TicketsCard from '../../TicketsCard';

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
    }
  }
}))(InputBase);

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

const Contact = ({ ticket, setTicket }) => {
  const classes = useStyles();
  const [option, setOption] = useState('Email');
  const [formState, setFormState] = useState({
    isValid: false,
    option: '',
    value: '',
    errorMessage: ''
  });

  const validate = (value, option) => {
    return option === 'Email' ? isEmailValid(value) : isPhoneValid(value);
  };

  const handleChange = event => {
    setOption(event.target.value);
    const tempIsValid = validate(formState.value, event.target.value);
    console.log(tempIsValid);

    setFormState({
      ...formState,
      errorMessage: `${event.target.value} is ${
        tempIsValid ? '' : 'not'
      } valid`,
      isValid: tempIsValid
    });

    setTicket({
      ...ticket,
      contact: `${event.target.value}: ${formState.value}`
    });
  };

  const isPhoneValid = value => {
    const phoneReg = /^[+]*[(]?[0-9]{1,3}[)]?[-\s./0-9]*$/g;
    return (
      value.match(phoneReg) !== null && value.length >= 11 && value.length < 20
    );
  };

  const isEmailValid = value => {
    const emailReg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return value.match(emailReg) !== null;
  };

  const handleChangeInput = event => {
    const val = event.target.value;
    const tempIsValid = validate(val, option);

    setFormState({
      ...formState,
      isValid: tempIsValid,
      value: val,
      errorMessage: `${option} is ${tempIsValid ? '' : 'not'} valid`
    });

    setTicket({
      ...ticket,
      contact: `${option}: ${formState.value}`
    });
  };

  return (
    <div
      style={{
        marginLeft: 23
      }}>
      <Typography color="textPrimary" component="p">
        Contact
      </Typography>
      <FormControl className={classes.margin} error={!formState.isValid}>
        <InputLabel htmlFor="demo-customized-textbox">
          {formState.errorMessage}
        </InputLabel>
        <BootstrapInput
          id="demo-customized-textbox"
          onChange={handleChangeInput}
        />
      </FormControl>
      <FormControl className={classes.margin}>
        <InputLabel id="demo-customized-select-label">Option</InputLabel>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={option}
          onChange={handleChange}
          input={<BootstrapInput />}>
          <MenuItem value={'Email'}>Email</MenuItem>
          <MenuItem value={'Phone'}>Phone</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

TicketsCard.propTypes = {
  setTicket: PropTypes.func,
  ticket: PropTypes.object
};

export default Contact;
