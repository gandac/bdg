import React from 'react';
import NavigationItem from '../ui/navigationItem';


const topNav = (props) => {

    const items = props.items.map((item,index) => {
        return <NavigationItem 
                key={index} 
                type={item.type} 
                url={item.url}
                active={props.pathname == item.url}
                styles={props.styles}
                activeStyle = { props.activeStyle}
        
                >
                    {item.label}
                </NavigationItem >
    }); 

    return (
        <ul className="footerNav">
            {items}
        </ul>
    )
}
export default topNav;

