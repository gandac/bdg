import React from 'react';
import {Link} from 'react-router-dom';
import LogoSvg from '../ui/svg/logo';

const Logo = (props) => {

   return ( 
    <div className="headerLogoWrapper">
        <Link to='/'>
            <LogoSvg color={props.color}/>
        </Link> 
     </div>
    );
}

export default Logo;