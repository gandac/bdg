import React from 'react';
import { NavLink } from 'react-router-dom';


const isInternal = urltype => urltype.includes('internal');
const isExternal = urltype => urltype.includes('http');
//props: url: URL | children: title | style: colorcode | activeStyle : colorcode 

const navigationItem = (props) => {
  const {activeStyle , styles} = props ? props : null;
    if (isInternal(props.type) || !isExternal(props.type)) {
        return (
          <li><NavLink
            to={props.url}
            activeStyle={activeStyle }
            style={styles}
            strict
            exact

          >
            {props.children}    
          </NavLink></li>
        );
      }
      return (
        <li><a
          href={props.url}
          style={styles}
        >
          {props.children}
        </a></li>
      );
}

export default navigationItem;