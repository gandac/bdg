import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as actions from './locationActions';
import PageLayout from '../ui/pageLayout';
import Preloader from '../ui/svg/preloader';
import {compose} from 'recompose';
import { allPostsQuery } from '../LocationsLoop/locationsActions';
import { toogleMapActive } from '../Map/mapActions';
import withColor from '../../hoc/withColor';
import MapTrigger from '../ui/mapTrigger';

import Breadcrumbs from '../ui/breadcrumbs';


/**
 * Fetch and display a Post
 */
class Location extends Component {
 

  componentDidMount() {
    this.props.startLocationQuery();
    this.props.onLocationQuery(this.props.client , this.props.match.params.slug);
   
  };
  componentWillUpdate(nextProps){
    if(nextProps.currentLocation.location_categories){
      if(this.props.currentLocation.location_categories != nextProps.currentLocation.location_categories){
        const catColor = nextProps.currentLocation.location_categories.edges[0].node.thecolor;
        this.props.allPostsQuery(this.props.client , nextProps.currentLocation.slug , true  );
        this.props.changeCurrentColor(catColor);
      }
     }
  }
  render() {
    
    const currentStyles = {
      ...this.props.currentStyles
    }
    const { currentLocation } = this.props;
    let content = <PageLayout currentStyles ={currentStyles} />;
      if(this.props.loading){
        content = <PageLayout currentStyles ={currentStyles} > <Preloader color={currentStyles} type="page"/>  </PageLayout>
      }else{
        content = <PageLayout currentStyles ={currentStyles} >
        <div className="constraint clearOverflow">
                    <div className="leftSide">
                    <div className="pa2">
                        <h1>{currentLocation.title}</h1>
                      </div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: currentLocation.content,
                        }}
                      />
                    </div>
                    <div className="rightSide">
                       {this.props.currentLocation ?  <Breadcrumbs location={this.props.currentLocation} /> : null }
                      <MapTrigger onClick={() => this.props.toggleMapActive()} color={currentStyles.accent}/>
                    </div>
        </div>
        
        </PageLayout>
      }
    return content;
  }
}
const mapStateToProps = state => {
  return {
    currentLocation: state.location,
    loading: state.location.loading
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onLocationQuery: (client, slug) => dispatch(actions.executeLocationQuery(client , slug)),
    startLocationQuery : () => dispatch(actions.startLocationQuery()),
    allPostsQuery : (client , search , isSingle) => dispatch(allPostsQuery(client,search , isSingle)),
    toggleMapActive : () => dispatch(toogleMapActive()),

  }
}

export default compose(connect(mapStateToProps , mapDispatchToProps) , withApollo , withColor , withRouter)(Location);