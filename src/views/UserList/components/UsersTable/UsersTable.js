import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import CustomAvatar from '../../../../layouts/Main/components/Sidebar/components/Profile/Avatar/';
import {
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from '@material-ui/core';
import { green } from '../../../../theme/palette';
import ManagementsButtons from './ManagementButtons/ManagementsButtons';
import StatusBullet from '../../../../components/StatusBullet';
import Spinner from 'components/Spinner/Spinner';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2),
    backgroundColor: green,
    fontWeight: 500,
    border: '1px solid #008160'
  },
  actions: {
    justifyContent: 'flex-end'
  },
  management: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
  }
}));

const UsersTable = props => {
  const { className, users, ...rest } = props;
  const classes = useStyles();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    const { users } = props;

    let selectedUsers;

    if (event.target.checked) {
      selectedUsers = users.map(user => user.id);
    } else {
      selectedUsers = [];
    }

    setSelectedUsers(selectedUsers);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedUsers.indexOf(id);
    let newSelectedUsers = [];

    if (selectedIndex === -1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers, id);
    } else if (selectedIndex === 0) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUsers = newSelectedUsers.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1)
      );
    }

    setSelectedUsers(newSelectedUsers);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            {users.length === 0 ? (
              <Spinner />
            ) : (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedUsers.length === users.length}
                          color="primary"
                          indeterminate={
                            selectedUsers.length > 0 &&
                            selectedUsers.length < users.length
                          }
                          onChange={handleSelectAll}
                        />
                      </TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Roles</TableCell>
                      <TableCell>ID</TableCell>
                      <TableCell>Registration date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell className={classes.management}>
                        Management
                  </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map(user => (
                        <TableRow
                          className={classes.tableRow}
                          hover
                          key={user.id}
                          selected={selectedUsers.indexOf(user.id) !== -1}>
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectedUsers.indexOf(user.id) !== -1}
                              color="primary"
                              onChange={event => handleSelectOne(event, user.id)}
                              value="true"
                            />
                          </TableCell>
                          <TableCell>
                            <div className={classes.nameContainer}>
                              <CustomAvatar
                                to="#"
                                firstName={user.firstName}
                                lastName={user.lastName}
                                className={classes.avatar}
                              />
                              <Typography variant="body1">{`${user.firstName} ${user.lastName}`}</Typography>
                            </div>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            {!user.roles.length
                              ? '----------'
                              : user.roles.join(', ')}
                          </TableCell>
                          <TableCell>{user.id}</TableCell>
                          <TableCell>{user.createDate}</TableCell>
                          <TableCell>
                            <div className={classes.statusContainer}>
                              <StatusBullet
                                className={classes.status}
                                color={user.disabled ? 'danger' : 'success'}
                                size="sm"
                              />
                              {user.disabled ? 'Disabled' : 'Active'}
                            </div>
                          </TableCell>
                          <TableCell className={classes.management}>
                            <ManagementsButtons user={user} />
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              )}
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={users.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

UsersTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default UsersTable;
