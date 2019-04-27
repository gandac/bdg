import React from 'react';

const locationPageMarkup = (props) => {
    return (
        <div className="locationCategoryPageWrapper" style={{color:props.currentStyles.primary}}>
            <div className="pageBottomWrapper" style={{ backgroundColor: props.currentStyles.secondary }} ></div>
            <div className="pageTopWrapper">
                {props.children ? props.children : null}
            </div>
        </div>
    )
}
export default locationPageMarkup;
