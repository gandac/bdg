
import React,{Component} from 'react';
import { compose, withProps } from "recompose";
import { withRouter } from 'react-router-dom';
import {GoogleMap, withGoogleMap, InfoBox,InfoWindow, withScriptjs} from 'react-google-maps';

import LocationPin from './LocationPin.js';

/**
 * display whole map
 */
const styleType = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
];

class CustomGoogleMap extends Component {

  state = {
    activeMarker: {
      id: false,
      labelHovered: true
    }
  }

  onMarkerHover = (event , markerId) => {

  // undefined relatedTarget means the user hovered just the location pin and not the BubbleBox
  if ( !event.relatedTarget ){ 
    clearTimeout(eventTimeout);
    const theClassThis = this;
    let eventTimeout = setTimeout(function(){
        theClassThis.setState({activeMarker: {id: markerId }});
      },  100);
    }
    console.log("Pin Over");
    return;
  }
  
  
  onMarkerOut = (event) => {
    
    clearTimeout(eventTimeout);
    //   console.log(event);
    const theClassThis = this;
    let eventTimeout = setTimeout(function(){
      
      theClassThis.setState({activeMarker: {id: false , labelHovered: false}});
    },  200);
    console.log("Pin Out");
      return;
  }

  onMarkerClick = (url) => {
    // go to location post when click a pin
    this.props.history.push(url);
  }

  render(){ 
    return (
        <GoogleMap
            defaultZoom={14}  
            zoom={14}  
            options={{styles:styleType}}
            center={this.props.center}
            
        >
        <span>
            {this.props.markers.map((marker,index) =>  { 
            const isActive = marker.id === this.state.activeMarker.id;
              return (
                <LocationPin 
                key={index}
                marker = {marker}
                isActive = {isActive}

                onMouseOver = {(event) => this.onLabelMouseOver(event,marker.id)}
                onMouseOut = {this.onLabelMouseOut}
                onMarkerHover = {(event,ref) => this.onMarkerHover(event,ref)}
                onMarkerOut = { (event) => this.onMarkerOut(event) }
                onMarkerClick = {this.onMarkerClick}
                />      
              )}
            )}
        </span>      
        </GoogleMap>
       )}
}

export default  compose(
    withProps({
      googleMapURL:"https://maps.googleapis.com/maps/api/js?key=AIzaSyA4t4Y6MKt1YYJH0-hMRki5xDaj70g1n1E",
      loadingElement: <div style={{ height: `100vh` ,width:"100%"}} />,
      containerElement: <div style={{ height: `100vh`,width:"100%" }} />,
      mapElement: <div style={{ height: `100vh` ,width:"100%"}} />,
    }),
    withScriptjs,
    withRouter,
    withGoogleMap
)(CustomGoogleMap);
