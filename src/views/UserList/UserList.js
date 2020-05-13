import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { UsersToolbar, UsersTable } from './components';
import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserList = () => {
  const classes = useStyles();

  const [users] = useState(mockData);
  const [searchResults, setSearchResults] = useState(mockData);

  const onSearchChange = event => {
    const inputValue = event.target.value.toLowerCase();
    const results = users.filter(user => {
      const fullName = user.firstName + ' ' + user.lastName;
      return fullName.toLowerCase().includes(inputValue);
    });
    setSearchResults(results);
  };

  return (
    <div className={classes.root}>
      <UsersToolbar onSearchChange={onSearchChange} />
      <div className={classes.content}>
        <UsersTable users={searchResults} />
      </div>
    </div>
  );
};

export default UserList;
