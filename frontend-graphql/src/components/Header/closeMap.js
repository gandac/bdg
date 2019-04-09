import React from 'react';
import closeSvg from '../../static/images/close.svg';
const closeMap = (props) => {
    return (<a className="closeMapTrigger" onClick={(event)=>props.onClick(event)}>
        <strong>Close map</strong>
        <img src={closeSvg} />
    </a>);   
}
export default closeMap;