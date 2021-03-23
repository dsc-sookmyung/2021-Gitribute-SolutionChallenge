import React from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import CircularProgress from '@material-ui/core/CircularProgress';

const MapContainer = ({ lat, lng, handleMarker, role, showForm }) => {
  const mapStyles = {
    height: "22.4rem",
    width: "100%"
  }
  
  const recipientMapStyles = {   
    height: "24.4rem",
    width: "100%"
  }

  const showFormStyles = {
    height: "8.8rem",
    width: "100%"
  }

  const reShowFormStyles = {
    height: "20rem",
    width: "100%"
  }

  const defaultCenter = {
    lat: 41.3851, lng: 2.1734
  }
  
  if (showForm) {
    var mapStyle = showFormStyles
    if (role === 1) {
      mapStyle = reShowFormStyles
    }
  }
  else {
    var mapStyle = mapStyles
    if (role === 1) {
      mapStyle = recipientMapStyles
    }
  }

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyCIYlorAfLUWWY5gyB47xPjZ1lclWZwHWQ'
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
