import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import Fade from '@material-ui/core/Fade';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import EditUser from '../EditUser/EditUser';

const ManagementsButtons = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openEdit, setOpenEdit] = useState(false);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setOpenEdit(true);
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
      </Menu>
      <EditUser openEdit={openEdit} setOpenEdit={setOpenEdit} user={user} />
    </div>
  );
};

ManagementsButtons.propTypes = {
  user: PropTypes.object
};

export default connect(null, {})(withRouter(ManagementsButtons));
