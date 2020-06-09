import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardActions,
  Button
} from '@material-ui/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setCurrentUser } from '../../../../redux/authReducer';
import { patchUser } from '../../../../actions/users/patchUser';
import { clearTickets } from '../../../../redux/ticketsReducer';
import DeletionDialog from 'components/Dialogs/DeletionDialog';

const useStyles = makeStyles(theme => ({
  button: {
    background: theme.palette.warning.light
  }
}));

const AccountManagement = props => {
    const {
      className,
      clearTicketsAction,
      history,
      setCurrentUserAction,
      patchAction,
      userObject,
      ...rest
    } = props;
  
    const classes = useStyles();
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteAccount, setDeleteAccount] = useState(false);
  
    const logout = async () => {
      setCurrentUserAction({});
      clearTicketsAction();
      localStorage.removeItem('jwtToken');
      history.push('/sign-in');
    };
  
    const pathUserData = () => {
      if (deleteAccount) {
        patch().catch(e => console.error(e.message));
      }
    };
  
    useEffect(() => {
      pathUserData();
    }, [deleteAccount]);
  
    const patch = async () => {
      const token = localStorage.getItem('jwtToken');
      const email = userObject.email;
      const body = { disabled: true };
  
      if (token) {
        const response = await patchAction(email, body, token);
  
        if (response.status === 204) {
          logout();
        }
      } else {
        throw new Error('Error during patching. There is no token available');
      }
    };
  
    const handleDeleteAccount = event => {
      event.preventDefault();
      setOpenDialog(!openDialog);
      pathUserData();
    };
  
    return (
      <>
        {openDialog && (
          <DeletionDialog
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
            setDeleteAccount={setDeleteAccount}
            userEmail={userObject.email}
            title={'Confirmation of deletion'}
            content={
              `There is no way to revert this action.
                Make sure you understand all consequences of account deletion.
                If you changed your mind please click Abort button.
                Otherwise, enter your e-mail to confirm deletion of your account.`
            }
          />
        )}
        <Card {...rest} className={clsx(classes.root, className)}>
          <form autoComplete="off" noValidate>
            <CardHeader
              subheader={"In this section you are able to delete your account. Proceed with caution!"}
              title="Manage your account"
            />
            <CardActions>
              <Button
                className={classes.button}
                color="warning"
                onClick={handleDeleteAccount}
                variant="contained">
                Delete account
              </Button>
            </CardActions>
          </form>
        </Card>
      </>
    );
  };

AccountManagement.propTypes = {
  className: PropTypes.string,
  userObject: PropTypes.object,
  clearTicketsAction: PropTypes.func,
  history: PropTypes.object,
  patchAction: PropTypes.func,
};

const mapStateToProps = state => {
  const { user } = state;

  return {
    userObject: user
  };
};

export default connect(mapStateToProps, {
  clearTicketsAction: clearTickets,
  setCurrentUserAction: setCurrentUser,
  patchAction: patchUser
})(withRouter(AccountManagement));
