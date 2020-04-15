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
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker
} from '@material-ui/pickers';
import SliderWrapper from './SliderWrapper';

const useStyles = makeStyles({
  root: {},
  textField: {
    width: '100%',
    marginBottom: 20
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
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 50
  },
  additionalQuestions: {
    marginLeft: 46,
    width: 490
  },
  destination: {
    marginLeft: 46,
    width: 490
  }
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TicketCreator = () => {
  const classes = useStyles();
  const [ticket, setTicket] = useState({
    firstName: '',
    lastName: '',
    subject: '',
    numberOfPeople: 0,
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
  };

  const handleSend = () => {
    console.log(ticket);
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
        <DialogTitle className={classes.title} id="alert-dialog-slide-title">
          Ticket creator
          <CloseIcon className={classes.closeIcon} onClick={handleClose} />
        </DialogTitle>
        <DialogContent>
          <TextField
            id="standard-basic"
            label="Subject"
            name="subject"
            className={classes.textField}
            onChange={handleChanged}
          />
          <div className={classes.row}>
            <TextField
              id="standard-basic"
              label="Destination"
              name="destination"
              className={classes.destination}
              onChange={handleChanged}
            />
          </div>
          <div className={classes.row}>
            <QueryBuilderIcon />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                {' '}
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
            </MuiPickersUtilsProvider>
          </div>
          <div className={classes.row}>
            <PeopleAltIcon className={classes.icons} />
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
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            Close
          </Button>
          <Button color="primary" onClick={handleSend} variant="contained">
            Create and send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TicketCreator;
