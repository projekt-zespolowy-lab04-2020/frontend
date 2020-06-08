import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { SearchInput } from 'components';
import TicketCreator from '../../../../components/TicketCreator';
import TripsCreator from '../../../../components/TripsCreator/TripsCreator';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getJoinedTrips } from '../../../../actions/users/getJoinedTrips';
import {
  setJoinedTrips,
  setShowJoinedTrips
} from '../../../../redux/tripReducer';

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
    marginLeft: 14,
    marginRight: 14
  }
}));

const TicketsToolbar = ({
  data,
  setSearchResults,
  className,
  isGuide,
  isTrip,
  tripsObject,
  setHasTicketsFlag,
  getJoinedTripsAction,
  setJoinedTripsAction,
  setShowJoinedTripsAction,
  ...rest
}) => {
  const classes = useStyles({ isTrip, isGuide });
  //TODO Find better solution to get out with staticContext Warning
  delete rest.staticContext;

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

  const handleShowJoinedTrips = async () => {
    if (!tripsObject.showJoinedTrips) {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        const response = await getJoinedTripsAction(token);
        const res = await response.json();
        if (response.status === 200) {
          setJoinedTripsAction(res);
          setShowJoinedTripsAction(true);
        } else {
          throw new Error('Error retrieving tickets.');
        }
      }
    } else {
      setShowJoinedTripsAction(false);
    }
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
        {isTrip && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleShowJoinedTrips}>
            {tripsObject.showJoinedTrips
              ? 'show all trips'
              : 'show joined trips'}
          </Button>
        )}
      </div>
    </div>
  );
};

TicketsToolbar.propTypes = {
  className: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  getJoinedTripsAction: PropTypes.func,
  isGuide: PropTypes.bool,
  isTrip: PropTypes.bool,
  setHasTicketsFlag: PropTypes.func,
  setJoinedTripsAction: PropTypes.func,
  setSearchResults: PropTypes.func,
  setShowJoinedTripsAction: PropTypes.func,
  tripsObject: PropTypes.object
};

const mapStateToProps = state => {
  const { trips } = state;

  return {
    tripsObject: trips
  };
};
export default connect(mapStateToProps, {
  getJoinedTripsAction: getJoinedTrips,
  setJoinedTripsAction: setJoinedTrips,
  setShowJoinedTripsAction: setShowJoinedTrips
})(withRouter(TicketsToolbar));
