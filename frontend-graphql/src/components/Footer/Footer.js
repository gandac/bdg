import React, {Component} from 'react';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import cssModules from 'react-css-modules';

import withColor from '../../hoc/withColor';
import classes from './Footer.css';
import FooterLogos from './footerLogos';
import FooterDisclaimer from './footerDisclaimer';
import FooterSubscribeEmail from './footerSubscribeEmail';
import FooterNav from '../ui/navigation';

class Footer extends Component{

  render(){
    const primaryColor =  this.props.currentStyles ? this.props.currentStyles.primary : null;
    let footer = null;
    if(this.props.footerSettings){
      footer = (<div className="padding topborder Footer" style={{color:primaryColor}}>
                  <div className="constraint">
                  <div className="leftSide">
                    <FooterLogos settings={this.props.footerSettings} color={primaryColor}/>
                    <FooterDisclaimer settings={this.props.footerSettings} />
                    <FooterSubscribeEmail />
                  </div>
                  <div className="rightSide">
                    <div className="bottomNav"><FooterNav items={this.props.footerMenuItems} styles={{color:primaryColor}} /></div>

                  </div>

                  </div>
              </div>)
    }
    return footer
  }
}

const mapStateToProps = (state) => {
  return {
    footerSettings : state.menus.settings,
    footerMenuItems : state.menus.footerMenu
  }
}


export default compose(cssModules(classes),
                      withColor ,
                      connect(mapStateToProps),
                      )(Footer);

// export default connect(mapStatetoProps)(Footer);
