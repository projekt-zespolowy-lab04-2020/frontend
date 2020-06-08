import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    padding: '10px 8px',
    margin: '10px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    textTransform: 'none',
    width: '100%'
  }
});
const TicketsHeader = ({ header, paragraph }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography gutterBottom variant="h2" color="textPrimary">
        {header}
      </Typography>

      <Typography gutterBottom variant="h6" color="textSecondary">
        {paragraph}
      </Typography>

      <hr
        color={'primary'}
        style={{
          width: '5%',
          padding: 1,
          margin: 5
        }}
      />
    </div>
  );
};

TicketsHeader.propTypes = {
  header: PropTypes.string,
  paragraph: PropTypes.string
};

export default TicketsHeader;
