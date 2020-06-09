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
import isEmpty from '../../../../../helpers/isEmpty';
import { patchUser } from '../../../../../actions/users/patchUser';
import { BootstrapInput } from '../../../../../components/TicketCreator/Contact/Contact';

const useStyles = makeStyles(theme => ({
  root: {},
  textField: {
    marginTop: theme.spacing(2)
  },
  edited: {
    display: 'flex',
    justifyContent: 'center'
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 500,
    fontSize: '100px',
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
    marginLeft: 85,
    width: '69%',
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
    paddingBottom: 15,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  margin: {
    width: 100
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const EditUser = ({
  openEdit,
  setOpenEdit,
  user,
  patchAction,
  setAnchorEl
}) => {
  const classes = useStyles();
  const [showEditedText, setShowEditedText] = useState(false);
  const [selectOption, setSelectOption] = useState({
    newRole: 'None',
    deleteRole: 'None',
    deleteUser: 'No'
  });

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      disabled: '',
      firstName: '',
      lastName: '',
      email: '',
      roles: []
    },
    touched: {},
    errors: {}
  });

  useEffect(() => {
    setOpenEdit(openEdit);
    setSelectOption({
      ...selectOption,
      deleteUser: user.disabled ? 'Yes' : 'No'
    });

    setFormState({
      ...formState,
      values: {
        disabled: user.disabled,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        roles: user.roles
      }
    });
  }, [openEdit]);

  const handleClose = () => {
    setFormState({
      ...formState,
      values: {
        disabled: user.disabled,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        roles: user.roles
      },
      isValid: false
    });
    setOpenEdit(false);
    setShowEditedText(false);
    setAnchorEl(null);
  };

  //TODO Add debounce effect
  const handleChange = event => {
    event.persist();
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

  const handleSelectOptionChange = event => {
    setSelectOption({
      ...selectOption,
      [event.target.name]: event.target.value
    });
  };

  const hasError = field =>
    !!(formState.touched[field] && formState.errors[field]);

  useEffect(() => {
    const errors = {};
    const emailReg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (!emailReg.test(formState.values.email)) {
      errors.email = ['Email is invalid'];
    }

    if (
      !formState.values.firstName.length ||
      formState.values.firstName.length > 32
    ) {
      errors.firstName = ['First name is to short or to long'];
    }
    if (
      !formState.values.lastName.length ||
      formState.values.lastName.length > 32
    ) {
      errors.lastName = ['Last name is to short or to long'];
    }

    setFormState(formState => ({
      ...formState,
      isValid: isEmpty(errors),
      errors: errors || {}
    }));
  }, [formState.values]);

  const patch = async () => {
    const token = localStorage.getItem('jwtToken');
    const email = formState.values.email;
    const data = formState.values;

    // Add new role
    if (data.roles !== 'None' && !data.roles.includes(selectOption.newRole))
      data.roles.push(selectOption.newRole);

    //Delete roles
    if (data.roles !== 'None' && data.roles.includes(selectOption.newRole))
      data.roles = data.roles.filter(item => item !== selectOption.deleteRole);

    data.disabled = selectOption.deleteUser !== 'No';
    if (token) {
      const response = await patchAction(email, data, token);
      if (response.status === 204) {
        setShowEditedText(true);
        setTimeout(() => {
          handleClose();
          window.location.reload();
        }, 2000);
      }
    } else {
      throw new Error('Error during patching. There is no token available');
    }
  };

  const handleEditAndSend = () => {
    patch().catch(e => console.error(e.message));
  };

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
        <DialogTitle className={classes.title} id="alert-dialog-slide-title">
          Edit User
          <CloseIcon className={classes.closeIcon} onClick={handleClose} />
        </DialogTitle>
        <Grid container>
          <DialogContent>
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
            <div className={classes.row}>
              <FormControl className={classes.margin}>
                <InputLabel id="demo-customized-select-label">
                  Add New Role
                </InputLabel>
                <Select
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  value={selectOption.newRole}
                  name={'newRole'}
                  onChange={handleSelectOptionChange}
                  input={<BootstrapInput />}>
                  <MenuItem value={'None'}>None</MenuItem>
                  <MenuItem value={'User'}>User</MenuItem>
                  <MenuItem value={'Guide'}>Guide</MenuItem>
                  <MenuItem value={'Admin'}>Admin</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.margin}>
                <InputLabel id="demo-customized-select-label">
                  Delete role
                </InputLabel>
                <Select
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  value={selectOption.deleteRole}
                  name={'deleteRole'}
                  onChange={handleSelectOptionChange}
                  input={<BootstrapInput />}>
                  <MenuItem value={'None'}>None</MenuItem>
                  <MenuItem value={'Guide'}>Guide</MenuItem>
                  <MenuItem value={'Admin'}>Admin</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.margin}>
                <InputLabel id="demo-customized-select-label">
                  Delete user
                </InputLabel>
                <Select
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  value={selectOption.deleteUser}
                  name={'deleteUser'}
                  onChange={handleSelectOptionChange}
                  input={<BootstrapInput />}>
                  <MenuItem value={'No'}>No</MenuItem>
                  <MenuItem value={'Yes'}>Yes</MenuItem>
                </Select>
              </FormControl>
            </div>
          </DialogContent>
        </Grid>
        {showEditedText && (
          <div className={classes.edited}>
            <Typography color="primary" variant="h5">
              User edited successfully. Wait for data update.
            </Typography>
          </div>
        )}
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
  patchAction: PropTypes.func,
  setAnchorEl: PropTypes.func,
  setOpenEdit: PropTypes.func,
  user: PropTypes.object
};

export default connect(null, { patchAction: patchUser })(withRouter(EditUser));
