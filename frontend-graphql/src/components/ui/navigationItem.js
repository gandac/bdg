import React from 'react';
import { NavLink } from 'react-router-dom';


const isInternal = urltype => urltype.includes('internal');

//props: url: URL | children: title | style: colorcode | activeStyle : colorcode 

const navigationItem = (props) => {
  const {activeStyle , styles} = props ? props : null;
    if (isInternal(props.type)) {
        return (
          <li><NavLink
            to={props.url}
            activeStyle={activeStyle }
            style={styles}
        
          >
            {props.children}    
          </NavLink></li>
        );
      }
      return (
        <a
          href={props.url}
          style={styles}
        >
          {props.children}
        </a>
      );
}

export default navigationItem;