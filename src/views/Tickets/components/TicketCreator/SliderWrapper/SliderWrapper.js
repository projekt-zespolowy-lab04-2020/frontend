import { makeStyles, withStyles } from '@material-ui/styles';
import Slider from '@material-ui/core/Slider';
import React, { useState, useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import Grid from '@material-ui/core/Grid';

const PrettoSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
    width: '88%',
    margin: '0 20px'
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit'
    }
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)'
  },
  track: {
    height: 8,
    borderRadius: 4
  },
  rail: {
    height: 8,
    borderRadius: 4
  }
})(Slider);

const useStyles = makeStyles({
  root: {
    marginLeft: 30,
    marginBottom: 30
  }
});

const SliderWrapper = ({ ticket, setTicket }) => {
  const [valueFromSlider, setValueFromSlider] = useState(10);
  const handler = useCallback(debounce(setTicket, 100), []);
  const classes = useStyles();

  const getValueFromSlider = (event, value) => {
    setValueFromSlider(value);
    handler({
      ...ticket,
      numberOfPeople: value
    });
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid
          item
          xs={12}
          lg={3}
          container
          className={'MuiGrid-justify-xs-center'}>
          <form noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="Number of people"
              variant="outlined"
              value={valueFromSlider}
            />
          </form>
        </Grid>
        <Grid item xs={12} lg={9}>
          <PrettoSlider
            valueLabelDisplay="auto"
            aria-label="pretto slider"
            defaultValue={20}
            onChange={getValueFromSlider}
          />
        </Grid>
      </Grid>
    </div>
  );
};

SliderWrapper.propTypes = {
  setTicket: PropTypes.func,
  ticket: PropTypes.object
};

export default SliderWrapper;
