import React, { useState } from 'react';
import { Map, GoogleApiWrapper, Marker, Polyline } from 'google-maps-react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    height: 406, // 300 +  6 padding
    position: 'relative'
  }
});

const MapWrapper = ({ google }) => {
  const classes = useStyles();
  const [markers, setMarkers] = useState([
    {
      name: 'Start',
      position: {
        lat: 52.241025473355585,
        lng: 21.01210937500002
      }
    },
    {
      name: 'End',
      position: {
        lat: 50.07324792988664,
        lng: 19.955507812500002
      }
    }
  ]);

  const onMarkerDragEnd = (coord, index) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    console.log(lat, ', ', lng);
    setMarkers(() => {
      const tempMarkers = [...markers];
      tempMarkers[index] = { ...tempMarkers[index], position: { lat, lng } };
      return tempMarkers;
    });
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
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            draggable
            onDragend={(t, map, coord) => onMarkerDragEnd(coord, index)}
            name={marker.name}
            label={{
              text: marker.name,
              fontSize: '18px',
              fontWeight: '600',
              color: '#000'
            }}
          />
        ))}
        <Polyline
          path={[...markers.map(marker => marker.position)]}
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

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_MAP_KEY
})(MapWrapper);
