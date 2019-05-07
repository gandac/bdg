import React from 'react';
import {Link} from 'react-router-dom';
import IconArrow from "../ui/svg/iconArrow";

const goToInsiders = (props) => {
    const headline = props.info ? props.info.text2 : '';
    const content = props.info ? props.info.text3 : '';
    return (
        <div className="insidersSectionWrapper">
           
            <div className="insidersSectionTitle"> <Link to="/insiders"><h2 dangerouslySetInnerHTML={{__html: headline }} /> </Link></div>
            <div className="insidersArrow">
                <Link to="/insiders">
                    <IconArrow color={props.color}/> 
                </Link>
            </div>
            <div className="insdersSectionContent" dangerouslySetInnerHTML={{__html: content }}/>
        </div>
    )
}
export default goToInsiders;