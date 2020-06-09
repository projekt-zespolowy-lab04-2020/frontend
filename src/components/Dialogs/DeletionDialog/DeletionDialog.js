import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

const DeletionDialog = ({
  openDialog,
  setOpenDialog,
  setDeleteAccount,
  userEmail,
  title,
  content
}) => {
  const [emailConfirmation, setEmailConfirmation] = useState('');

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleCloseAbort = () => {
    setDeleteAccount(false);
    setOpenDialog(false);
  };

  const handleCloseDelete = () => {
    setDeleteAccount(true);
    setOpenDialog(false);
  };

  const handleChange = event => {
    setEmailConfirmation(event.target.value);
  }

  return (
    <div>
      <Dialog
        aria-describedby="alert-dialog-description"
        aria-labelledby="alert-dialog-title"
        onClose={handleClose}
        open={openDialog}>
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
          <TextField
                  fullWidth
                  label="Email Address"
                  margin="dense"
                  name="email"
                  onChange={handleChange}
                  required
                  value={emailConfirmation || ''}
                  variant="outlined"
                />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleCloseAbort}>
            Abort
          </Button>
          <Button
            autoFocus
            color="warning"
            id="agree"
            value
            disabled={emailConfirmation !== userEmail}
            onClick={handleCloseDelete}
            >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

DeletionDialog.propTypes = {
  content: PropTypes.string,
  openDialog: PropTypes.bool,
  setOpenDialog: PropTypes.func,
  setUpdateData: PropTypes.func,
  title: PropTypes.string
};

export default DeletionDialog;
