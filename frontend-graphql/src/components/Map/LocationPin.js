import React from 'react';
import CssModules from 'react-css-modules';
import {Link} from 'react-router-dom';
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel";
import classes from './map.css';
const pinColors = [
    "rgba(198,205,247)"
]
const clickOnSubcategory = (event , link) =>{
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    alert("goto" + link);
}
const LocationPin = (props) => {

    const google = window.google;
    const markerData = props.marker;
    const subcategory =  markerData.category.children.edges[0] ? markerData.category.children.edges[0].node : null;
    const mediumImgSize = markerData.featuredImage ? markerData.featuredImage.mediaDetails.sizes.filter( (element) => element.name == 'thumbnail') : null; 
   
    const getCustomSvg = (color) => { return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30.1 40.5" width="30" height="40"> <path class="cls-2" fill="${color}" d="M15,0C7.13,0,0,6.38,0,14.25S6.5,27,15,40.5C23.5,27,30,22.13,30,14.25S22.87,0,15,0Z"/> <path class="cls-4" fill="white" d="M8.64,10.41a2.44,2.44,0,0,1,1.23.31,2.37,2.37,0,0,1,.89.83,2.29,2.29,0,0,1-.15,2.62,2.31,2.31,0,0,1-1.16.7V15a2.85,2.85,0,0,1,.77.27,2,2,0,0,1,.76.71,2.42,2.42,0,0,1,.33,1.34A2.37,2.37,0,0,1,11,18.52a2.56,2.56,0,0,1-.94.91,2.66,2.66,0,0,1-1.31.33H4.91V10.41Zm1.17,3.74a1.8,1.8,0,0,0,0-2.57,1.81,1.81,0,0,0-1.3-.52H5.64v3.6H8.51A1.8,1.8,0,0,0,9.81,14.15Zm-.19,4.71a1.83,1.83,0,0,0,.7-.68,1.88,1.88,0,0,0,0-1.91,1.84,1.84,0,0,0-.71-.7,1.92,1.92,0,0,0-1-.25h-3v3.79h3A1.93,1.93,0,0,0,9.62,18.86Z"/><path class="cls-4" fill="white" d="M20.2,16.76a3.25,3.25,0,0,1-.4,1.65,2.75,2.75,0,0,1-1.14,1.1A3.65,3.65,0,0,1,17,19.9a3.6,3.6,0,0,1-1.71-.39,2.75,2.75,0,0,1-1.14-1.1,3.25,3.25,0,0,1-.4-1.65V10.41h.74v6.33a2.5,2.5,0,0,0,.66,1.83,2.46,2.46,0,0,0,1.85.68,2.46,2.46,0,0,0,1.85-.69,2.49,2.49,0,0,0,.67-1.82V10.41h.73Z"/><path class="cls-4" fill="white" d="M22.78,15.49v-.78H30.1v.78Z"/></svg>`};
    
    const markerContent = (<div className={"labelWrapper"} >
            <div className={"locationPinImageWrapper"}>
                {mediumImgSize ? (<img className={"locationPinImage"} src={mediumImgSize[0].sourceUrl}/>) : null }
            </div>
            <span className={"locationTitle"}>{markerData.title}</span>
            
            <span className={"locationSubtitle"}>{subcategory ? subcategory.name : null}</span>
        </div>
        );

    return (
        <MarkerWithLabel 
        {...props.marker}
        id = {props.marker.id}
        onMouseOver = {(event) => props.onMarkerHover(event,props.marker.id)}
        onMouseOut = {(event) => props.onMarkerOut(event)}
        labelAnchor={new google.maps.Point(0, 0)}
        icon = {{url: getCustomSvg(pinColors[0]) }}
        onClick     = {() => props.onMarkerClick(props.marker.link)}
        clickable = {true}
        zIndex = {0}
        labelClass = {"markerWithLabel"}
        
        >

        <div>{props.isActive ? markerContent : null}</div>
        
        </MarkerWithLabel>
    )
}
export default CssModules(LocationPin,classes);