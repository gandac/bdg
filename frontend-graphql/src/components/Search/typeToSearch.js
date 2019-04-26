import React from 'react';
import ZoomSvg from '../ui/svg/zoomIcon';
const typeToSearch = React.forwardRef( (props,ref) => {
    return (<div className="typeToSearch">
                <ZoomSvg color={props.color} />
                <input to="/search" ref={ref} placeholder="Type to search" className="searchInput ml1 no-underline black" style={{color: props.color}} onKeyUp={(event) => props.onType(event)} />
          
            </div>);
});

export default typeToSearch;

