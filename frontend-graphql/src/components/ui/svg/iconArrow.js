import React from 'react';

const iconArrow = (props) => {
	const iconArrowClass = "iconArrow " + props.className;
    return ( <svg version="1.1" className={iconArrowClass} id="Layer_1" x="0px" y="0px" viewBox="0 0 42.35 7" onClick={props.onClick}>
	<path fill={props.color} d="M42.35,3.5c0-0.37-0.3-0.67-0.66-0.67H0v1.33h41.69C42.06,4.16,42.35,3.87,42.35,3.5z"/>
	<path  fill={props.color} d="M37.31,6.9c-0.44,0.27-1.01-0.05-1.01-0.57V0.67c0-0.52,0.57-0.84,1.01-0.57l4.72,2.83
		c0.43,0.26,0.43,0.89,0,1.15L37.31,6.9z"/>

</svg>
    )
}
export default iconArrow;