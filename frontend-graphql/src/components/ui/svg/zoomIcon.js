import React from 'react';

const zoomIcon = (props) => {
    //props color
    return ( <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.4449 31.7633">
    <title>search in category</title>
    <path stroke={props.color} fill="transparent" d="M20.7699,10.7208A10.04745,10.04745,0,1,1,10.7231.675,10.04658,10.04658,0,0,1,20.7699,10.7208Z"/>
    <line stroke={props.color} fill="transparent"  x1="10.7231" y1="20.7699" x2="10.7231" y2="31.7633"/>
    </svg>
    );
}
export default zoomIcon;