import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import { BootstrapInput } from '../../../../Tickets/components/TicketCreator/Contact/Contact';
import validate from 'validate.js';
import isEmpty from '../../../../../helpers/isEmpty';

const useStyles = makeStyles(theme => ({
  root: {},
  textField: {
    // width: '100%',
    marginTop: theme.spacing(2)
  },
  dialog: {},
  title: {
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 500,
    width: 600
  },
  closeIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
    margin: 5,
    padding: 3,
    '&:hover': {
      backgroundColor: '#EAECEE',
      borderRadius: 50
    }
  },
  row: {
    display: 'flex',
    width: '50%',
    justifyContent: 'space-around',
    alignItems: 'baseline',
    marginBottom: 30
  },
  buttons: {
    margin: '20px 20px'
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const EditUser = ({ openEdit, setOpenEdit, user }) => {
  const classes = useStyles();
  const [role, setRole] = useState('User');

  const userSchema = {
    id: '',
    disabled: '',
    firstName: '',
    lastName: '',
    email: '',
    roles: [],
    createdAt: 1555016400000
  };

  const [formState, setFormState] = useState({
    isValid: false,
    values: userSchema,
    touched: {},
    errors: {}
  });

  useEffect(() => {
    setOpenEdit(openEdit);
    setFormState({
      ...formState,
      values: {
        id: user.id,
        disabled: user.disabled,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        roles: user.roles,
        createdAt: 1555016400000
      }
    });
  }, [openEdit]);

  const handleClose = () => {
    setFormState({
      ...formState,
      values: {
        id: user.id,
        disabled: user.disabled,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        roles: user.roles,
        createdAt: 1555016400000
      },
      isValid: false
    });
    setOpenEdit(false);
  };

  const handleEditAndSend = () => {
    handleClose();
  };

  const handleChange = event => {
    event.persist();

    console.log(formState);
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleRoleChange = event => {
    setRole(event.target.value);
  };

  const hasError = field =>
    !!(formState.touched[field] && formState.errors[field]);

  useEffect(() => {
    const errors = {};
    const emailReg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (emailReg.test(formState.values.email)) {
      errors.email = ['Email is invalid'];
    }

    if (formState.values.firstName.length > 32) {
      errors.firstName = ['First name is to long'];
    }
    if (formState.values.lastName.length > 32) {
      errors.lastName = ['Last name is to long'];
    }

    setFormState(formState => ({
      ...formState,
      isValid: isEmpty(errors),
      errors: errors || {}
    }));
  }, [formState.values]);

  return (
    <div>
      <Dialog
        className={classes.root}
        open={openEdit}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description">
        <div className={classes.row}>
          <DialogTitle className={classes.title} id="alert-dialog-slide-title">
            Edit User
            <CloseIcon className={classes.closeIcon} onClick={handleClose} />
          </DialogTitle>
        </div>
        <Grid container>
          <DialogContent>
            {/*<div className={classes.row}>*/}
            <form className={classes.form} onSubmit={() => {}}>
              <TextField
                className={classes.textField}
                error={hasError('firstName')}
                fullWidth
                helperText={
                  hasError('firstName') ? formState.errors.firstName[0] : null
                }
                label="First name"
                name="firstName"
                onChange={handleChange}
                type="text"
                value={formState.values.firstName || ''}
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                error={hasError('lastName')}
                fullWidth
                helperText={
                  hasError('lastName') ? formState.errors.lastName[0] : null
                }
                label="Last name"
                name="lastName"
                onChange={handleChange}
                type="text"
                value={formState.values.lastName || ''}
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                error={hasError('email')}
                fullWidth
                helperText={
                  hasError('email') ? formState.errors.email[0] : null
                }
                label="Email address"
                name="email"
                onChange={handleChange}
                type="text"
                value={formState.values.email || ''}
                variant="outlined"
              />
            </form>
            {/*</div>*/}
            <div className={classes.row}>
              <Typography color="textPrimary" component="p">
                Add new role
              </Typography>
              <FormControl className={classes.margin}>
                <InputLabel id="demo-customized-select-label">Role</InputLabel>
                <Select
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  value={role}
                  onChange={handleRoleChange}
                  input={<BootstrapInput />}>
                  <MenuItem value={'User'}>User</MenuItem>
                  <MenuItem value={'Guide'}>Guide</MenuItem>
                  <MenuItem value={'Admin'}>Admin</MenuItem>
                </Select>
              </FormControl>
            </div>
          </DialogContent>
        </Grid>
        <div className={classes.buttons}>
          <DialogActions>
            <Button color="primary" onClick={handleClose}>
              Close
            </Button>
            <Button
              disabled={!formState.isValid}
              color="primary"
              onClick={handleEditAndSend}
              variant="contained">
              Edit
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

EditUser.propTypes = {
  openEdit: PropTypes.bool,
  setOpenEdit: PropTypes.func,
  user: PropTypes.object
};

export default connect(null, {})(withRouter(EditUser));
