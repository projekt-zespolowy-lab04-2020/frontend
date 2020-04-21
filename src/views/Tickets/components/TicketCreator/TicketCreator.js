import React, { useState } from 'react';
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
import { setTickets } from '../../../../redux/ticketsReducer';

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

const TicketCreator = ({ setTicketsAction }) => {
  const classes = useStyles();
  const [ticket, setTicket] = useState({
    firstName: '',
    lastName: '',
    subject: '',
    numberOfPeople: 0,
    destination: '',
    dateAndTime: new Date().toLocaleString(),
    content: ''
  });

  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
    setTicket({
      ...ticket,
      dateAndTime: date.toLocaleString()
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTicket({
      firstName: '',
      lastName: '',
      subject: '',
      numberOfPeople: 0,
      dateAndTime: new Date().toLocaleString(),
      content: ''
    });
  };

  const handleSend = () => {
    setTicketsAction(ticket);
    handleClose();
  };

  const handleChanged = event => {
    setTicket({
      ...ticket,
      [event.target.name]: event.target.value
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
                value={ticket.subject}
                className={classes.textField}
                onChange={handleChanged}
              />
            </div>
            <div className={classes.row}>
              <TextField
                label="Destination"
                name="destination"
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
              <SliderWrapper ticket={ticket} setTicket={setTicket} />
            </div>
            <div className={classes.row}>
              <TextField
                className={classes.additionalQuestions}
                id="standard-multiline-static"
                label="Additional questions"
                multiline
                rows={4}
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
            <Button color="primary" onClick={handleSend} variant="contained">
              Create and send
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

TicketCreator.propTypes = {
  setTicketsAction: PropTypes.func
};

// const mapStateToProps = state => {
//   const { user, tickets } = state;
//
//   return {
//     userObject: user,
//     ticketsObject: tickets
//   };
// };

export default connect(null, { setTicketsAction: setTickets })(
  withRouter(TicketCreator)
);
