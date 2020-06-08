import React from 'react';
import { Map, GoogleApiWrapper, Marker, Polyline } from 'google-maps-react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    height: height => height + 6, // h +  6 padding
    position: 'relative'
  }
});

const MapWrapper = ({
  google,
  width,
  height,
  isEditable,
  points,
  onMarkerDragEnd
}) => {
  const classes = useStyles(height);

  const getMarkerName = (index, length) => {
    // The start and the last point should have
    // label Start and End on the map
    if (index === 0) return 'Start';
    if (index === length - 1) return 'End';
  };

  return (
    <div className={classes.root}>
      <Map
        google={google}
        zoom={6}
        style={{
          width: width,
          height: height,
          margin: '0 auto',
          padding: 5,
          border: '3px solid #00c179'
        }}
        initialCenter={{ lat: 50.07324792988664, lng: 19.955507812500002 }}>
        {points.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            draggable={isEditable}
            onDragend={(t, map, coord) => onMarkerDragEnd(coord, index)}
            name={getMarkerName(marker.order, points.length)}
            label={{
              text: getMarkerName(index, points.length),
              fontSize: '18px',
              fontWeight: '600',
              color: '#000'
            }}
          />
        ))}
        <Polyline
          path={[...points.map(marker => marker.position)]}
          geodesic={false}
          options={{
            strokeColor: '#38B44F',
            strokeOpacity: 1,
            strokeWeight: 5
          }}
        />
      </Map>
    </div>
  );
};

MapWrapper.propTypes = {
  google: PropTypes.object,
  height: PropTypes.number,
  isEditable: PropTypes.bool,
  onMarkerDragEnd: PropTypes.func,
  points: PropTypes.array,
  width: PropTypes.number
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_MAP_KEY
})(MapWrapper);
