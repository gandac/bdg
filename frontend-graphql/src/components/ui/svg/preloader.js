import React from 'react';

const preloader = (props) => {
    const theClass = ( props.type == "page" ) ? 
                     "preloaderWrapper" :
                    "prieloaderSimpleWrapper";
    return (<div className={theClass}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <rect x="20" y="20" width="60" height="60" fill="none" stroke={props.color.primary} strokeWidth="5"></rect>
            <rect x="20" y="20" width="60" height="60" fill="none" stroke={props.color.secondary} strokeWidth="3" stroke-lincap="square">
                <animate attributeName="stroke-dasharray" calcMode="linear" values="24 216;120 120;24 216" keyTimes="0;0.5;1" dur="1" begin="0s" repeatCount="indefinite"></animate>
                <animate attributeName="stroke-dashoffset" calcMode="linear" values="0;-120;-240" keyTimes="0;0.5;1" dur="1" begin="0s" repeatCount="indefinite"></animate>
            </rect>
        </svg>
    </div>)

}

export default preloader;