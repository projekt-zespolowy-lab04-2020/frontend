import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

const LogoutDialog = ({ openDialog, setOpenDialog, setUpdateData }) => {
  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleCloseDisagree = () => {
    setUpdateData(false);
    setOpenDialog(false);
  };

  const handleCloseAgree = () => {
    setUpdateData(true);
    setOpenDialog(false);
  };

  return (
    <div>
      Typo
      <Dialog
        aria-describedby="alert-dialog-description"
        aria-labelledby="alert-dialog-title"
        onClose={handleClose}
        open={openDialog}>
        <DialogTitle id="alert-dialog-title">
          Confirmation of data change
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Changing the data logs out the user. After logging out and re-login
            your data will be changed.Click Agree if you are sure you want to
            change the data or Disagree if you changed your mind.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleCloseDisagree}>
            Disagree
          </Button>
          <Button
            autoFocus
            color="primary"
            id="agree"
            value
            onClick={handleCloseAgree}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

LogoutDialog.propTypes = {
  openDialog: PropTypes.bool,
  setOpenDialog: PropTypes.func,
  setUpdateData: PropTypes.func
};

export default LogoutDialog;
