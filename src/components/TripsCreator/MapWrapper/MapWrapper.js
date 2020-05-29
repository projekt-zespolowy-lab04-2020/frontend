import React from 'react';
import { Map, GoogleApiWrapper, Marker, Polyline } from 'google-maps-react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    height: 406, // 300 +  6 padding
    position: 'relative'
  }
});

const MapWrapper = ({ google, formState, setFormState }) => {
  const classes = useStyles();

  const onMarkerDragEnd = (coord, index) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();

    const tempMarkers = [...formState.values.route.points];
    tempMarkers[index] = {
      ...tempMarkers[index],
      order: index,
      position: { lat, lng }
    };

    setFormState({
      ...formState,
      values: {
        ...formState.values,
        route: {
          ...formState.values.route,
          points: tempMarkers
        }
      }
    });
  };
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
          width: 400,
          height: 400,
          margin: '0 auto',
          border: '3px solid #00c179'
        }}
        initialCenter={{ lat: 50.07324792988664, lng: 19.955507812500002 }}>
        {formState.values.route.points.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            draggable
            onDragend={(t, map, coord) => onMarkerDragEnd(coord, index)}
            name={getMarkerName(
              marker.order,
              formState.values.route.points.length
            )}
            label={{
              text: getMarkerName(index, formState.values.route.points.length),
              fontSize: '18px',
              fontWeight: '600',
              color: '#000'
            }}
          />
        ))}
        <Polyline
          path={[
            ...formState.values.route.points.map(marker => marker.position)
          ]}
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
  formState: PropTypes.object,
  google: PropTypes.object,
  setFormState: PropTypes.func
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_MAP_KEY
})(MapWrapper);
