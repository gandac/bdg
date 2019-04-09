import React from 'react';
import LocationBox from '../ui/locationBox';
import cssModules from 'react-css-modules';
import Preloader from '../ui/svg/preloader';
import classes from './category.css';

//...props
const locationGrid = (props)  => {
    let locations = (<Preloader color={props.colorStyles}/>);
    if(props.posts){
        locations = props.posts.map((post, index) => (
            <LocationBox post={post} index={index} key={index} ></LocationBox>
          ));  
    }
       return (<div className={"locationsGrid"}>
           {locations}
       </div>
    )
}
export default cssModules(locationGrid,classes);