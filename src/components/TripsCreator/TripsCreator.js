import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker
} from '@material-ui/pickers';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SliderWrapper from '../TicketCreator/SliderWrapper';
import { createTrip } from '../../actions/trips/createTrip';
import MapWrapper from './MapWrapper/MapWrapper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {},
  textField: {
    width: '100%'
  },
  dialog: {},
  title: {
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 500,
    width: 500
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
  icons: {
    marginRight: 23
  },
  row: {
    marginBottom: 30
  },
  additionalQuestions: {
    marginLeft: 30,
    width: 490
  },
  destination: {
    marginLeft: 30,
    width: 490
  },
  buttons: {
    margin: '20px 20px'
  }
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TripsCreator = ({ userObject, createNewTripAction }) => {
  const classes = useStyles();
  const tripValues = {
    guide: {
      firstName: '',
      lastName: '',
      email: '',
      roles: ''
    },
    description: '',
    numberOfPeople: 10,
    destination: '',
    dateAndTime: new Date().toLocaleString(),
    cost: ''
  };

  const [formState, setFormState] = useState({
    isValid: false,
    contactValid: false,
    values: tripValues,
    touched: {}
  });

  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openMapDialog, setOpenMapDialog] = useState(false);

  const handleDateChange = date => {
    setSelectedDate(date);
    setFormState({
      ...formState,
      values: { ...formState.values, dateAndTime: date.toLocaleString() }
    });
  };

  useEffect(() => {
    // console.log(userObject);
    setFormState({
      ...formState,
      values: {
        ...formState.values,
        guide: {
          firstName: userObject.firstName,
          lastName: userObject.lastName,
          email: userObject.email,
          roles: userObject.roles
        }
      }
    });
  }, [userObject]);

  const handleClose = () => {
    setOpen(!open);
  };

  const createTrips = async () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      // console.log(formState.values);
      const newTrip = {
        ...formState.values
      };
      const response = await createNewTripAction(newTrip, token);
      console.log(response);
      const res = await response.json();
      console.log(res);

      if (response.status === 200) {
        console.log('success');
      } else {
        throw new Error('Error during creating ticket.');
      }
    }
  };

  const handleSend = () => {
    createTrips().catch(e => console.error(e.message));
    // handleClose();
  };

  // const editAndSend = async () => {
  //   const token = localStorage.getItem('jwtToken');
  //   if (token) {
  //     // if (response.status === 200) {
  //     //
  //     // } else {
  //     //   throw new Error('Error during editing ticket.');
  //     // }
  //   }
  // };

  // const handleEditAndSend = () => {
  //   editAndSend().catch(e => console.error(e.message));
  //   handleClose();
  // };

  const handleChanged = event => {
    console.log(Object.keys(formState.touched).length);
    setFormState({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      },
      //TODO Validate cost
      isValid: Object.keys(formState.touched).length === 3
    });
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClose}>
        create new trip
      </Button>
      <Dialog
        className={classes.root}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description">
        <div className={classes.row}>
          <DialogTitle className={classes.title} id="alert-dialog-slide-title">
            Trip creator
            <CloseIcon className={classes.closeIcon} onClick={handleClose} />
          </DialogTitle>
        </div>
        <Grid container>
          <DialogContent>
            <div className={classes.row}>
              <TextField
                label="Description"
                name="description"
                value={formState.values.subject}
                className={classes.textField}
                onChange={handleChanged}
              />
            </div>
            <div className={classes.row}>
              <TextField
                label="Estimated cost"
                name="cost"
                value={formState.values.cost}
                className={classes.destination}
                onChange={handleChanged}
              />
            </div>
            <div className={classes.row}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    lg={6}
                    container
                    className={'MuiGrid-justify-xs-center'}>
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      label="Date picker dialog"
                      format="MM/dd/yyyy"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date'
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    lg={6}
                    container
                    className={'MuiGrid-justify-xs-center'}>
                    <KeyboardTimePicker
                      margin="normal"
                      id="time-picker"
                      label="Time picker"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change time'
                      }}
                    />
                  </Grid>
                </Grid>
              </MuiPickersUtilsProvider>
            </div>
            <div className={classes.row}>
              <SliderWrapper ticket={formState} setTicket={setFormState} />
            </div>
            <div className={classes.row}>
              <Typography
                variant="h6"
                color="textSecondary"
                component="p"
                style={{ textAlign: 'center' }}>
                Select start point and end point of created trip
              </Typography>
              <MapWrapper
                openMapDialog={openMapDialog}
                setOpenMapDialog={setOpenMapDialog}
              />
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
              onClick={handleSend}
              variant="contained">
              Create
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

TripsCreator.propTypes = {
  createNewTripAction: PropTypes.func,
  userObject: PropTypes.object
};

const mapStateToProps = state => {
  const { user } = state;

  return {
    userObject: user
  };
};

export default connect(mapStateToProps, {
  createNewTripAction: createTrip
})(withRouter(TripsCreator));
