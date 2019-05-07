import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import {compose} from 'recompose';
import {withRouter} from 'react-router-dom';
import withColor from '../../hoc/withColor';
import {connect} from 'react-redux';
import * as actions from './pageActions';
import PageLayout from '../ui/pageLayout';
import Preloader from '../ui/svg/preloader';


class Page extends Component {

  componentDidMount() {
    this.props.startPageQuery();
    this.props.executePageQuery(this.props.client,this.props.match.params.slug);
  }
  componentWillUpdate(nextProps) {
    if ( nextProps.match.params.slug !== this.props.match.params.slug  ){
       this.props.startPageQuery();
    }
 }
 componentDidUpdate(prevProps){
  if (  prevProps.match.params.slug !== this.props.match.params.slug){
    this.props.executePageQuery(this.props.client , this.props.match.params.slug);
  }
 }

  render() {
    const { page } = this.props;
    const currentStyles = {
      ...this.props.currentStyles
    }
    let content = <PageLayout currentStyles ={currentStyles} />;
      if(this.props.loading){
        content = <PageLayout currentStyles ={currentStyles} > <Preloader color={currentStyles} type="page"/>  </PageLayout>
      }else{
      
        content = <PageLayout currentStyles ={currentStyles} >
                  <div className="constraint clearOverflow textPage">
                    <div className="leftSide">
                    <div className="pa2">
                        <h1>{page.title}</h1>
                      </div>
                      <div
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{
                          __html: page.content,
                        }}
                      />
                    </div>
                    <div className="rightSide">
                     
                  </div>
                  </div>
               </PageLayout>
    }
    return content;
}
}
const mapStateToProps = state => {
  return {
    page: state.page.page,
    loading: state.page.loading
  }
}
const mapDispatchToProps = dispatch => {
  return {
    startPageQuery : () => dispatch(actions.startPageQuery()),
    executePageQuery : (client,uri)=> dispatch(actions.executePageQuery(client,uri)),
  }
}
export default compose( connect(mapStateToProps,mapDispatchToProps) , withApollo , withRouter,  withColor)(Page);
