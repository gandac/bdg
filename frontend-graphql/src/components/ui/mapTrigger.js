import React from 'react';
import PinSvg from '../ui/svg/pin';

const mapTrigger = (props) => {

    return <div className={"MapTriggerWrapper"}>
                <a className={"MapTriggerImage"} onClick={props.onClick}>
                    <PinSvg color={props.color}/>
                </a>
           </div>
}

export default mapTrigger;