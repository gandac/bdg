import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import {connect} from 'react-redux';
import * as actions from './LocationsActions';


/**
 * Fetch and display a Post
 */
class Location extends Component {
 

  componentDidMount() {
    this.props.onLocationQuery(this.props.client , this.props.match.params.slug);
  };

  render() {
    const { location } = this.props;
    return (
      <div>
        <div className="pa2">
          <h1>{location.title}</h1>
        </div>
        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: location.content,
          }}
        />
        <div></div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    location: state.location
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onLocationQuery: (client, slug) => dispatch(actions.executeLocationQuery(client , slug))
  }
}

export default connect(mapStateToProps , mapDispatchToProps)(withApollo(Location));
