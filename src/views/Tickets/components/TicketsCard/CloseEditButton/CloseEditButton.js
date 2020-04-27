import React from 'react';
import { IconButton } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { connect } from 'react-redux';
import {
  setTicketIdToEdit,
  toggleEditMode,
  toggleOpen
} from '../../../../../redux/ticketCreatorReducer';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { patchTicket } from '../../../../../actions/tickets/patchTicket';
import { deleteTicketById } from '../../../../../redux/ticketsReducer';

const CloseEditButton = ({
  toggleOpenAction,
  toggleEditModeAction,
  id,
  setTicketIdToEditAction,
  patchTicketAction,
  deleteTicketByIdAction
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    toggleEditModeAction(true);
    toggleOpenAction(true);
    setTicketIdToEditAction(id);
  };

  const closeTicket = async () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const response = await patchTicketAction(
        { content: JSON.stringify('Close ticket'), closed: true },
        id,
        token
      );

      if (response.status === 200) {
        deleteTicketByIdAction({ tempId: id });
      } else {
        throw new Error('Error during closing ticket.');
      }
    }
  };

  const handleCloseTicket = () => {
    closeTicket().catch(e => console.error(e.message));
    handleClose();
  };

  return (
    <div>
      <IconButton
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleClick}
        children={<MoreVertIcon />}
      />
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleCloseTicket}>Close ticket</MenuItem>
      </Menu>
    </div>
  );
};

CloseEditButton.propTypes = {
  deleteTicketByIdAction: PropTypes.func,
  id: PropTypes.number,
  patchTicketAction: PropTypes.func,
  setTicketIdToEditAction: PropTypes.func,
  ticketCreatorObj: PropTypes.object,
  toggleEditModeAction: PropTypes.func,
  toggleOpenAction: PropTypes.func
};

export default connect(null, {
  toggleOpenAction: toggleOpen,
  toggleEditModeAction: toggleEditMode,
  setTicketIdToEditAction: setTicketIdToEdit,
  patchTicketAction: patchTicket,
  deleteTicketByIdAction: deleteTicketById
})(withRouter(CloseEditButton));
