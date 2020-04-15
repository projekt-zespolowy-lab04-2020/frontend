import { withStyles } from '@material-ui/styles';
import Slider from '@material-ui/core/Slider';
import React, { useState, useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

const PrettoSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
    width: '70%',
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

const SliderWrapper = ({ ticket, setTicket }) => {
  const [valueFromSlider, setValueFromSlider] = useState(10);
  const handler = useCallback(debounce(setTicket, 100), []);

  const getValueFromSlider = (event, value) => {
    setValueFromSlider(value);
    handler({
      ...ticket,
      numberOfPeople: value
    });
  };

  return (
    <>
      <form noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="Number of people"
          variant="outlined"
          value={valueFromSlider}
        />
      </form>
      <PrettoSlider
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        defaultValue={20}
        onChange={getValueFromSlider}
      />
    </>
  );
};

SliderWrapper.propTypes = {
  setTicket: PropTypes.func,
  ticket: PropTypes.object
};

export default SliderWrapper;
