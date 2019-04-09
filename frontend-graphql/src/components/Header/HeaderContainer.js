import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { withApollo } from 'react-apollo';
import { compose } from 'recompose';
import {connect} from 'react-redux';
import cssModules from 'react-css-modules';
import {executeCategoryQuery,startCategoryQuery} from '../LocationCategoryPage/categoryActions';
import classes from './header.css';
import withColor from '../../hoc/withColor';
import * as searchActions from '../Search/searchActions';
import TopNav from '../ui/navigation';
import Logo from './logo';
import * as mapActions from '../Map/mapActions';
import * as actions from './menusActions';
//import LoginButton from './loginButton.js';
import CloseMap from './closeMap';
import TypeToSearch from '../Search/typeToSearch';


class Header extends Component {
  
  componentDidMount() {
    this.props.getMenuElements(this.props.client);
    
  }
    onSearchType = (event ) => {

      if(event.key == 'Enter'){
        this.props.startCategoryQuery();
        this.props.onCategoryQuery(this.props.client , this.props.currentCatSlug , this.props.currentCatSlug , event.target.value );
      }
     // this.props.onCategoryQuery(this.props.client , this.props.match.params.parent ,this.props.match.params.slug , event );
   }
  //  onSearchInputChange = (event) => {
  //   this.setState({...this.state , searchValue: event.target.value });
  //  }
  render() {
    
    const curstyles = {
      color: this.props.currentStyles ? this.props.currentStyles.primary : null,
      textDecoration : 'none'
    };
    const activeStyles = {
      color: this.props.currentStyles ? this.props.currentStyles.secondary : null
    }

    return (
      <div className={"headerWrapper bottomborder"}>
        <div className="constraint flex pa1 justify-between nowrap ">
          <div className="topNavWrapper headerLeft">
            <TopNav items={this.props.menus} type="horizontal" styles={curstyles} activeStyle={activeStyles}/>
          </div>
          <div className="headerRight">
            <Logo color={curstyles.color}/>
            {this.props.mapActive ? <CloseMap onClick={this.props.toggleMapInactive}/> : null}
            <div className="searchWrapper flex flex-fixed">
              <TypeToSearch color={curstyles.color} 
              onType={(event) => this.onSearchType(event)} value={this.props.searchValue} 
              onSearchInputChange={(event)=> this.props.onSearchInputChange(event.target.value)}
              />
              
            </div>
          </div>

          </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
     menus: state.menus.headerMenu,
     mapActive : state.map.active,
     currentCatSlug: state.category.slug,
     searchValue: state.search.searchValue,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getMenuElements: (client) => dispatch(actions.getMenu(client)),
    toggleMapInactive : (event) => dispatch(mapActions.toogleMapInactive(event)),
    startCategoryQuery : () => dispatch(startCategoryQuery()),
    onSearchInputChange: (value) => dispatch(searchActions.setSearchValue(value)),
    onCategoryQuery: (client , slug , parent,searchQuery) => dispatch(executeCategoryQuery(client , slug , parent , searchQuery)),
  }
}
export default compose(
  withRouter,
  withApollo,
  connect(mapStateToProps,mapDispatchToProps),
  withColor
)(cssModules(Header,classes));
