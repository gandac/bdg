import React,{ Component } from 'react';
import {connect} from 'react-redux';
import classes from './map.css';
import CustomGoogleMap from './CustomGoogleMap';


//BEGIN CONTAINER
class MapContainer extends Component {

      render(){
        let markersPosts = this.props.markersPosts;
          let markers = markersPosts.map(post=>{
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
          });

        return(
          <div className={classes.TheMapWrapper} style={{height:"100vh",width:"100%"}}>
              <CustomGoogleMap
                google = {this.props.google}
                center = {{ lat: 44.4160439, lng: 26.0964823 }}
                onMapLoad = {this.props.onMapLoad}
                markers = { markers ? markers : null} 
            />
          </div>
        )
      }

}
const mapStateToProps = state => {
    return {
        markersPosts: state.category.posts,
    }
}
export default  connect(mapStateToProps)(MapContainer);
