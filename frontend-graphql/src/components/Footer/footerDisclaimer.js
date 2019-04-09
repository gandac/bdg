import React from 'react';


const footerDisclaimer = (props) => {
    let footerDisclaimerContent = null;
    if(props.settings){
        footerDisclaimerContent = ( <div className="footerDisclaimer">
                <p>{props.settings.footerDescription}</p>
                <p>{props.settings.copyrightDescription}</p>
            </div>)
    }
    return footerDisclaimerContent;
}
export default footerDisclaimer;
