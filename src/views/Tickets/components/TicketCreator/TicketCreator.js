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
import SliderWrapper from './SliderWrapper';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addTicket } from '../../../../redux/ticketsReducer';
import { createTicket } from '../../../../actions/tickets/createTicket';

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

const TicketCreator = ({ userObject, addTicketAction, createTicketAction }) => {
  const classes = useStyles();
  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      firstName: '',
      lastName: '',
      subject: '',
      numberOfPeople: 10,
      destination: '',
      dateAndTime: new Date().toLocaleString(),
      content: ''
    },
    touched: {}
  });

  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
    setFormState({
      ...formState,
      values: { ...formState.values, dateAndTime: date.toLocaleString() }
    });
  };

  useEffect(() => {
    setFormState({
      ...formState,
      values: {
        ...formState.values,
        firstName: userObject.firstName,
        lastName: userObject.lastName
      }
    });
  }, [userObject]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormState({
      ...formState,
      values: {
        firstName: userObject.firstName,
        lastName: userObject.lastName,
        subject: '',
        numberOfPeople: 10,
        destination: '',
        dateAndTime: new Date().toLocaleString(),
        content: ''
      },
      isValid: false
    });
  };

  const createTicket = async () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const response = await createTicketAction(
        { content: JSON.stringify(formState.values) },
        token
      );
      const res = await response.json();
      console.log(res);
      if (response.status === 200) {
        // Set temp ticket wit content only to render immediately
        // and when the user refresh the page it will replaces
        // temporary object with normal one
        const ticketTempObject = {
          ticket: {
            content: formState.values
          }
        };
        addTicketAction(ticketTempObject);
      } else {
        throw new Error('Error during creating ticket.');
      }
    }
  };

  const handleSend = () => {
    createTicket().catch(e => console.error(e.message));
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
      isValid: Object.keys(formState.touched).length === 3
    });
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        create new ticket
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
            Ticket creator
            <CloseIcon className={classes.closeIcon} onClick={handleClose} />
          </DialogTitle>
        </div>
        <Grid container>
          <DialogContent>
            <div className={classes.row}>
              <TextField
                label="Subject"
                name="subject"
                value={formState.values.subject}
                className={classes.textField}
                onChange={handleChanged}
              />
            </div>
            <div className={classes.row}>
              <TextField
                label="Destination"
                name="destination"
                value={formState.values.destination}
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
              <TextField
                className={classes.additionalQuestions}
                id="standard-multiline-static"
                label="Additional questions"
                multiline
                rows={4}
                value={formState.values.content}
                name="content"
                onChange={handleChanged}
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
              Create and send
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

TicketCreator.propTypes = {
  addTicketAction: PropTypes.func,
  createTicketAction: PropTypes.func,
  userObject: PropTypes.object
};

const mapStateToProps = state => {
  const { user } = state;

  return {
    userObject: user
  };
};

export default connect(mapStateToProps, {
  addTicketAction: addTicket,
  createTicketAction: createTicket
})(withRouter(TicketCreator));
