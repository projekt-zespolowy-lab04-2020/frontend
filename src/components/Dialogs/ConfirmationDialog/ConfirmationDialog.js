import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

const ConfirmationDialog = ({
  openDialog,
  setOpenDialog,
  setUpdateData,
  title,
  content
}) => {
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

ConfirmationDialog.propTypes = {
  content: PropTypes.string,
  openDialog: PropTypes.bool,
  setOpenDialog: PropTypes.func,
  setUpdateData: PropTypes.func,
  title: PropTypes.string
};

export default ConfirmationDialog;
