import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { UsersToolbar, UsersTable } from './components';
import mockData from './data';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setUsersCount } from '../../redux/usersCountReducer';
import { withRouter } from 'react-router-dom';
import { getUsers } from '../../actions/getUsers';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserList = ({ getUsersAction }) => {
  const classes = useStyles();
  const userSchema = {
    id: '',
    disabled: '',
    firstName: '',
    lastName: '',
    email: '',
    roles: [],
    createdAt: 1555016400000
  };
  const [users, setUsers] = useState([]);
  const [searchResults, setSearchResults] = useState(users);

  const onSearchChange = event => {
    const inputValue = event.target.value.toLowerCase();
    const results = users.filter(user => {
      const fullName = user.firstName + ' ' + user.lastName;
      return fullName.toLowerCase().includes(inputValue);
    });
    setSearchResults(results);
  };

  const getAllUsers = async () => {
    const token = localStorage.getItem('jwtToken');

    if (token) {
      const response = await getUsersAction(token);

      if (response.status === 200) {
        const downloadedUsers = await response.json();
        console.log(downloadedUsers);
        setUsers(downloadedUsers);
        setSearchResults(downloadedUsers);
      } else {
        throw new Error(
          'Error downloading all users! You may not be an administrator'
        );
      }
    }
  };

  useEffect(() => {
    getAllUsers().catch(err => console.log(err.message));
  }, []);

  return (
    <div className={classes.root}>
      <UsersToolbar onSearchChange={onSearchChange} />
      <div className={classes.content}>
        <UsersTable users={searchResults} />
      </div>
    </div>
  );
};

UserList.propTypes = {
  getUsersAction: PropTypes.func,
  setUsersCountAction: PropTypes.func
};

const mapStateToProps = state => {
  const { usersCount } = state;
  return { usersCount };
};

export default connect(mapStateToProps, {
  getUsersAction: getUsers
})(withRouter(UserList));
