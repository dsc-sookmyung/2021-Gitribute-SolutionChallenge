import React from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

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


  return (
     <LoadScript
       googleMapsApiKey='AIzaSyCIYlorAfLUWWY5gyB47xPjZ1lclWZwHWQ'>
        <GoogleMap
          mapContainerStyle={mapStyle}
          zoom={20}
          center={{lat: lat, lng: lng}}
        >
          <Marker position={{lat: lat, lng: lng}} onClick={handleMarker}>
            <InfoWindow position={{lat: lat+0.000045, lng: lng}}>
              <p>Click on the pin <br /> to enter the number of sanitary pads</p>
            </InfoWindow>
          </Marker>
        </GoogleMap>
     </LoadScript>
  )
}

export default MapContainer;
