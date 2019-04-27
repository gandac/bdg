import React from 'react';
import {Link} from 'react-router-dom';
import IconArrow from "../ui/svg/iconArrow";

const goToInsiders = (props) => {
    return (
        <div className="insidersSectionWrapper">
           
            <div className="insidersSectionTitle"> <Link to="/insiders"><h2 dangerouslySetInnerHTML={{__html: props.info.text2 }} /> </Link></div>
            <div className="insidersArrow">
                <Link to="/insiders">
                    <IconArrow color={props.color}/> 
                </Link>
            </div>
            <div className="insdersSectionContent" dangerouslySetInnerHTML={{__html: props.info.text3 }}/>
        </div>
    )
}
export default goToInsiders;