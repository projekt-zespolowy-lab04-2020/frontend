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
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SliderWrapper from '../TicketCreator/SliderWrapper';
import { createTrip } from '../../actions/trips/createTrip';
import MapWrapper from './MapWrapper/MapWrapper';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import { addTrip } from '../../redux/tripReducer';

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

const TripsCreator = ({ userObject, createNewTripAction, addTripAction }) => {
  const classes = useStyles();
  const tripValues = {
    description: '',
    peopleLimit: 10,
    dateAndTime: new Date(),
    cost: '',
    name: '',
    route: {
      points: [
        {
          order: 0,
          position: {
            lat: 50.07324792988664,
            lng: 19.955507812500002
          }
        },
        {
          order: 1,
          position: {
            lat: 52.241025473355585,
            lng: 21.01210937500002
          }
        }
      ]
    }
  };

  const [formState, setFormState] = useState({
    isValid: false,
    isDateSelected: false,
    values: tripValues,
    touched: {}
  });

  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment().format());
  const [openMapDialog, setOpenMapDialog] = useState(false);

  const handleDateChange = date => {
    setSelectedDate(moment(date).format());
    setFormState({
      ...formState,
      values: { ...formState.values, dateAndTime: date },
      isDateSelected: true,
      isValid: Object.keys(formState.touched).length === 3 && true
    });
  };

  useEffect(() => {
    setFormState({
      ...formState
    });
  }, [userObject]);

  const handleClose = () => {
    setOpen(!open);
    setFormState({
      isValid: false,
      isDateSelected: false,
      values: tripValues,
      touched: {}
    });
  };

  const createTrips = async () => {
    const token = localStorage.getItem('jwtToken');
    const newStringifiedPoints = formState.values.route.points.map(point => {
      return {
        order: point.order,
        coordinates: JSON.stringify(point['position'])
      };
    });

    if (token) {
      const newTrip = {
        cost: parseInt(formState.values.cost),
        description: formState.values.description,
        peopleLimit: formState.values.peopleLimit,
        dateTrip: formState.values.dateAndTime,
        active: true,
        route: {
          name: formState.values.name,
          points: newStringifiedPoints
        }
      };

      const response = await createNewTripAction(newTrip, token);
      const res = await response.json();

      if (response.status === 200) {
        addTripAction(newTrip);
      } else {
        throw new Error('Error during creating ticket.');
      }
    }
  };

  const handleSend = () => {
    createTrips().catch(e => console.error(e.message));
    handleClose();
  };

  const handleChanged = event => {
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
      isValid:
        Object.keys(formState.touched).length === 3 && formState.isDateSelected
    });
  };

  const onMarkerDragEnd = (coord, index) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();

    const tempMarkers = [...formState.values.route.points];
    tempMarkers[index] = {
      ...tempMarkers[index],
      order: index,
      position: { lat, lng }
    };

    setFormState({
      ...formState,
      values: {
        ...formState.values,
        route: {
          ...formState.values.route,
          points: tempMarkers
        }
      }
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
                label="Name"
                name="name"
                value={formState.values.name}
                className={classes.textField}
                onChange={handleChanged}
              />
            </div>
            <div className={classes.row}>
              <TextField
                label="Description"
                name="description"
                value={formState.values.description}
                className={classes.textField}
                onChange={handleChanged}
              />
            </div>
            <div className={classes.row}>
              <TextField
                label="Estimated cost in PLN"
                name="cost"
                type="number"
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
                variant="h5"
                color="textSecondary"
                component="p"
                style={{ textAlign: 'center' }}>
                Select start point and end point of created trip
              </Typography>
              <Typography
                variant="h6"
                color="textSecondary"
                component="p"
                style={{ textAlign: 'center', padding: 5 }}>
                Drag to the desired place
              </Typography>
              <MapWrapper
                isEditable
                openMapDialog={openMapDialog}
                setOpenMapDialog={setOpenMapDialog}
                formState={formState}
                setFormState={setFormState}
                width={400}
                height={400}
                points={formState.values.route.points}
                onMarkerDragEnd={onMarkerDragEnd}
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
  addTripAction: PropTypes.func,
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
  createNewTripAction: createTrip,
  addTripAction: addTrip
})(withRouter(TripsCreator));
