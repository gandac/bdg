import React from 'react';
import ZoomSvg from '../ui/svg/zoomIcon';
const typeToSearch = React.forwardRef( (props,ref) => {
    const isCategory = props.currentPathname.includes('location_category'); 

  
    return (<div className="typeToSearch">
                <ZoomSvg color={props.color} />

                <input id="theSearchInput" to="/search" ref={ref} placeholder="Type to search" className="searchInput ml1 no-underline black" style={{color: props.color}} onKeyUp={(event) => props.onType(event)} onChange={(event) => props.onInputChange(event)} value={props.inputValue} />
                {isCategory 
                 && props.inputIsFocused
                 ? 
                 <span className="searchInCategory">
                     <input style={{color: props.color}} type="checkbox" id="inCategory" onChange={(event) => props.searchInCategoryChange(event)} checked={props.searchInCategory}/>
                     
                     <label style={{color: props.color}} htmlFor="inCategory" >search only in {props.currentCatTitle}?</label>
                </span>
                 :
                 null   
                }
            </div>);
});

export default typeToSearch;

