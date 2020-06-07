import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { SearchInput } from 'components';
import TicketCreator from '../../../../components/TicketCreator';
import TripsCreator from '../../../../components/TripsCreator/TripsCreator';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    width: '800px'
  },
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    marginRight: theme.spacing(1),
    marginLeft: 20
  }
}));

const TicketsToolbar = ({
  data,
  setSearchResults,
  className,
  isGuide,
  isTrip,
  setHasTicketsFlag,
  ...rest
}) => {
  const classes = useStyles({ isTrip, isGuide });

  const onSearchChange = event => {
    setHasTicketsFlag(true);
    const inputValue = event.target.value.toLowerCase();
    const results = data.filter(obj => {
      let toSearch;
      if (!isTrip) {
        toSearch = obj.ticket.content.subject;
      } else {
        toSearch = obj.name;
      }

      return toSearch.toLowerCase().includes(inputValue);
    });

    setSearchResults(results);
  };
  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.row}>
        {!isTrip && <TicketCreator />}
        {isGuide && <TripsCreator />}

        <SearchInput
          className={classes.searchInput}
          placeholder="Search product"
          onChange={onSearchChange}
        />
        <Button variant="contained" color="primary" onClick={null}>
          show joined trips
        </Button>
      </div>
    </div>
  );
};

TicketsToolbar.propTypes = {
  className: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  isGuide: PropTypes.bool,
  isTrip: PropTypes.bool,
  setHasTicketsFlag: PropTypes.func,
  setSearchResults: PropTypes.func
};

export default TicketsToolbar;
