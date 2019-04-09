import React from 'react';
import ZoomSvg from '../ui/svg/zoomIcon';
const typeToSearch = (props) => {
    return (<div className="typeToSearch">
                <ZoomSvg color={props.color} />
                <input to="/search" placeholder="Type to search" className="searchInput ml1 no-underline black" style={{color: props.color}} onKeyUp={(event) => props.onType(event)} onChange={(event) => props.onSearchInputChange(event)} value={props.value}/>
          
            </div>);
}

export default typeToSearch;

