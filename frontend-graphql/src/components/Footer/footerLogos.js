import React from 'react';
import FbSvg from '../ui/svg/iconFb';
import InSvg from '../ui/svg/iconIn';

const footerLogos = (props) => {
    return ( <div className="footerLogos">
                <div className="iconFooter iconFb"><a href={props.settings.facebookUrl} target="_blank"><FbSvg  color={props.color} /></a></div>
                <div className="iconFooter iconIn"><a href={props.settings.instaUrl} target="_blank"><InSvg  color={props.color} /></a></div>
            </div>);
}
export default footerLogos;
