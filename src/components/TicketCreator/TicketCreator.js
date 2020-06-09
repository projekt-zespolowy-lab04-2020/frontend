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
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addTicket, changeTicketInPlace } from '../../redux/ticketsReducer';
import { createTicket } from '../../actions/tickets/createTicket';
import Contact from './Contact';
import { toggleEditMode, toggleOpen } from '../../redux/ticketCreatorReducer';
import { patchTicket } from '../../actions/tickets/patchTicket';

const useStyles = makeStyles({
  root: {},
  textField: {
    width: '100%'
  },
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

const TicketCreator = ({
  userObject,
  addTicketAction,
  createTicketAction,
  ticketsObj,
  ticketCreatorObj,
  toggleOpenAction,
  toggleEditModeAction,
  patchTicketAction,
  changeTicketInPlaceAction
}) => {
  const classes = useStyles();
  const ticketValues = {
    firstName: userObject.firstName,
    lastName: userObject.lastName,
    contact: '',
    subject: '',
    dateAndTime: new Date().toLocaleString(),
    content: ''
  };

  const [formState, setFormState] = useState({
    isValid: false,
    contactValid: false,
    values: ticketValues,
    touched: {}
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(ticketCreatorObj.isOpen);
    const { ticketIdToEdit } = ticketCreatorObj;
    const editedTempTicket = ticketsObj.tickets.find(obj => {
      const { ticket } = obj;
      const { id } = ticket;
      return id === ticketIdToEdit ? obj : null;
    });

    const ticketValuesTemp = {
      firstName: userObject.firstName,
      lastName: userObject.lastName,
      contact: ticketCreatorObj.isEditMode
        ? editedTempTicket.ticket.content.contact
        : '',
      subject: ticketCreatorObj.isEditMode
        ? editedTempTicket.ticket.content.subject
        : '',
      dateAndTime: new Date().toLocaleString(),
      content: ticketCreatorObj.isEditMode
        ? editedTempTicket.ticket.content.content
        : ''
    };

    setFormState({
      ...formState,
      values: ticketValuesTemp
    });
  }, [ticketCreatorObj]);

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
    toggleOpenAction(true);
  };

  const handleClose = () => {
    toggleOpenAction(false);
    toggleEditModeAction(false);
    setFormState({
      ...formState,
      values: ticketValues,
      isValid: false,
      contactValid: false
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
      const { id } = res;

      if (response.status === 200) {
        // Set temp ticket with content only to render immediately
        // and when the user refresh the page it will replaces
        // temporary object with normal one
        const ticketTempObject = {
          ticket: {
            id,
            content: formState.values
          },
          comments: []
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

  const editAndSend = async () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const response = await patchTicketAction(
        { content: JSON.stringify(formState.values), closed: false },
        ticketCreatorObj.ticketIdToEdit,
        token
      );
      const { content } = await response.json();

      const editedTempTicket = ticketsObj.tickets.find(obj => {
        const { ticket } = obj;
        const { id } = ticket;
        return id === ticketCreatorObj.ticketIdToEdit ? obj : null;
      });

      const patchedTicket = {
        ...editedTempTicket,
        ticket: {
          ...editedTempTicket.ticket,
          content: JSON.parse(content)
        }
      };

      if (response.status === 200) {
        changeTicketInPlaceAction({
          tempId: ticketCreatorObj.ticketIdToEdit,
          patchedTicket
        });
      } else {
        throw new Error('Error during editing ticket.');
      }
    }
  };

  const handleEditAndSend = () => {
    editAndSend().catch(e => console.error(e.message));
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

      isValid: Object.keys(formState.touched).length === 2
    });
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        create new support ticket
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
            Ticket creator {ticketCreatorObj.isEditMode ? '(Edit Mode)' : ''}
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
              <Contact
                ticket={formState}
                setTicket={setFormState}
                open={open}
                isEditMode={ticketCreatorObj.isEditMode}
              />
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
              disabled={!formState.isValid || !formState.contactValid}
              color="primary"
              onClick={
                ticketCreatorObj.isEditMode ? handleEditAndSend : handleSend
              }
              variant="contained">
              {ticketCreatorObj.isEditMode ? 'Edit' : 'Create'} and send
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

TicketCreator.propTypes = {
  addTicketAction: PropTypes.func,
  changeTicketInPlaceAction: PropTypes.func,
  createTicketAction: PropTypes.func,
  patchTicketAction: PropTypes.func,
  ticketCreatorObj: PropTypes.object,
  ticketsObj: PropTypes.object,
  toggleEditModeAction: PropTypes.func,
  toggleOpenAction: PropTypes.func,
  userObject: PropTypes.object
};

const mapStateToProps = state => {
  const { user, ticketCreator, tickets } = state;

  return {
    userObject: user,
    ticketsObj: tickets,
    ticketCreatorObj: ticketCreator
  };
};

export default connect(mapStateToProps, {
  addTicketAction: addTicket,
  createTicketAction: createTicket,
  toggleOpenAction: toggleOpen,
  toggleEditModeAction: toggleEditMode,
  patchTicketAction: patchTicket,
  changeTicketInPlaceAction: changeTicketInPlace
})(withRouter(TicketCreator));
