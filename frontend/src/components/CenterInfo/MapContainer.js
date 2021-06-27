import React from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import CircularProgress from '@material-ui/core/CircularProgress';

const MapContainer = ({ lat, lng, handleMarker, role, showForm }) => {
  const mapStyles = {
    height: "22.4rem",
    width: "100%"
  }
  
  const recipientMapStyles = {   
    height: "22.4rem",
    width: "100%"
  }

  const showFormStyles = {
    height: "8.8rem",
    width: "100%"
  }

  const defaultCenter = {
    lat: 41.3851, lng: 2.1734
  }
  
  if (showForm) {
    var mapStyle = showFormStyles
  }
  else {
    var mapStyle = mapStyles
    if (role === 1) {
      mapStyle = recipientMapStyles
    }
  }

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY
  })

  const renderMap = () => {
    return <GoogleMap
      mapContainerStyle={mapStyle}
      zoom={18}
      center={{lat: +lat, lng: +lng}}
    >
      <Marker position={{lat: +lat, lng: +lng}} onClick={handleMarker}>
        <InfoWindow position={{lat: +lat+0.00018, lng: +lng-0.0000015}}>
          { lat !== 0.0 && lng !== 0 ? (
            <p>Click on the pin <br/> to enter the number of sanitary pads</p>
          ) : (
            <p>Center is in preparation!</p>
          )}
        </InfoWindow>
      </Marker>
    </GoogleMap>
  }

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }

  return isLoaded ? renderMap() : <CircularProgress />
}

export default MapContainer;
