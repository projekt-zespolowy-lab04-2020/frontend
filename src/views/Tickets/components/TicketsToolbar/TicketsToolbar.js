import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { SearchInput } from 'components';
import TicketCreator from '../../../../components/TicketCreator';

const useStyles = makeStyles(theme => ({
  root: {
    width: '800px'
  },
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const TicketsToolbar = ({
  tickets,
  setSearchResults,
  className,
  isTrip,
  ...rest
}) => {
  const classes = useStyles();

  const onSearchChange = event => {
    const inputValue = event.target.value.toLowerCase();
    const results = tickets.filter(obj => {
      const {
        ticket: {
          content: { subject }
        }
      } = obj;
      return subject.toLowerCase().includes(inputValue);
    });

    setSearchResults(results);
  };
  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.row}>
        <TicketCreator isTrip={isTrip} />
        <SearchInput
          className={classes.searchInput}
          placeholder="Search product"
          onChange={onSearchChange}
        />
      </div>
    </div>
  );
};

TicketsToolbar.propTypes = {
  className: PropTypes.string,
  isTrip: PropTypes.bool,
  setSearchResults: PropTypes.func,
  tickets: PropTypes.arrayOf(PropTypes.object)
};

export default TicketsToolbar;
