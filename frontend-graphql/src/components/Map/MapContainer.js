import React,{ Component } from 'react';
import {withRouter,Link} from 'react-router-dom';
import {connect} from 'react-redux';
import classes from './map.css';
import {compose} from 'recompose';
import CssModules from 'react-css-modules';
import withColor from '../../hoc/withColor';
import * as mapActions from './mapActions';
import CustomGoogleMap from './CustomGoogleMap';


//BEGIN CONTAINER
class MapContainer extends Component {
      componentDidMount(){
        if(window.location.hash == '#mapView'){
          this.props.onToggleMapActive();
        }
      }
      render(){
        const currentStyles = {
          ...this.props.currentStyles
        }
        const mapActiveClass = this.props.isMapActive ? 'active' : '';
        const isCategoryPage = this.props.location.pathname.includes('location_category');
        let markersPosts = this.props.markersPosts;
          let markers = markersPosts ? 
              markersPosts.map(post=>{
              const returnMarker = {
                id: post.node.id,
                title: post.node.title,
                link: post.node.link,
                featuredImage: post.node.featuredImage,
                category : post.node.location_categories.edges[0].node,
                position:{
                  lat: parseFloat(post.node.lat),
                  lng: parseFloat(post.node.lng)
                }
              }
              return returnMarker;
            }) : 
            null;

        return(
          <div className={'theMapWrapper ' + mapActiveClass}>
              <CustomGoogleMap
                google = {this.props.google}
                
                
                onMapLoad = {this.props.onMapLoad}
                markers = { markers ? markers : null} 
              />
              {isCategoryPage ? <div className="mapShowAllWrapper constraint"><Link className="but mapShowAll" to="/" style={{color:currentStyles.primary}}><strong>— Show all</strong></Link></div> : null}
          </div>
        )
      }

}
const mapStateToProps = state => {
    return {
        markersPosts: state.locations.posts,
        isMapActive: state.map.active
    }
}
const mapDispatchToProps = dispatch =>{
  return { 
    onToggleMapActive : () => dispatch(mapActions.toogleMapActive())
  }
}
export default  compose(connect(mapStateToProps,mapDispatchToProps),withRouter,withColor)(CssModules(MapContainer,classes));
