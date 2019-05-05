import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { withApollo } from 'react-apollo';
import { compose } from 'recompose';
import {connect} from 'react-redux';
import cssModules from 'react-css-modules';
import {executeCategoryQuery,startCategoryQuery} from '../LocationCategoryPage/categoryActions';
import classes from './header.css';
import withColor from '../../hoc/withColor';
import TopNav from '../ui/navigation';
import Logo from './logo';
import * as searchActions from '../Search/searchActions';
import * as mapActions from '../Map/mapActions';
import * as actions from './menusActions';
import * as locationActions from '../LocationsLoop/locationsActions';
//import LoginButton from './loginButton.js';
import CloseMap from './closeMap';

import TypeToSearch from '../Search/typeToSearch';


class Header extends Component {
  constructor(props){
    super(props);
    this.inputRef = React.createRef();
  }
  state = {
    inputSearch : false
  }
  componentDidMount() { 
    this.props.getMenuElements(this.props.client);
  }
  componentWillUpdate(nextProps) {
    if ( nextProps.location.pathname !== this.props.location.pathname ){
      this.clearTypeValue();
      this.setState({inputSearch : false});
    }
  }
    onSearchType = (event) => {
      
      if(event.target.value){
        this.setState({inputSearch: true});
        if(event.key == 'Enter'){
          
          this.props.setSearchValue(event.target.value);
          this.props.startCategoryQuery();
          if(this.props.isSearchInCategory){
            this.props.onCategoryQuery(this.props.client , this.props.currentCatSlug , this.props.currentCatSlug , event.target.value );
          }else{
            this.props.history.push({
              pathname: '/search',
              search: 's='+event.target.value
             });
          }
         
        }

        }else{
          this.setState({inputSearch: false});
        }
   }
   searchInCategoryChange = (event) => {
      this.props.searchInCategory(event.target.checked);
   }
   clearTypeValue = () => {
     if(this.inputRef.current){
      this.inputRef.current.value = '';
     }
   }

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
              onType={(event) => this.onSearchType(event)} 
            //  onChange={(input)=>this.inputRef = input} 
              value={this.props.searchValue}
              currentPathname = {this.props.location.pathname}
              inputIsFocused = {this.state.inputSearch}
              searchInCategory = {this.props.isSearchInCategory}
              currentCatTitle = {this.props.currentCatTitle}
              searchInCategoryChange={(event) => this.searchInCategoryChange(event)}
              ref={this.inputRef}
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
     currentCatTitle: state.category.name,
     isSearchInCategory : state.search.searchInAllCategories,
     searchValue: state.search.searchValue,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getMenuElements: (client) => dispatch(actions.getMenu(client)),
    toggleMapInactive : (event) => dispatch(mapActions.toogleMapInactive(event)),
    startCategoryQuery : () => dispatch(startCategoryQuery()),
    searchInCategory : (value) => dispatch(searchActions.setSearchInCategory(value)),
    setSearchValue: (value) => dispatch(searchActions.setSearchValue(value)),
    onCategoryQuery: (client , slug , parent,searchQuery) => dispatch(executeCategoryQuery(client , slug , parent , searchQuery)),
  }
}
export default compose(
  withRouter,
  withApollo,
  connect(mapStateToProps,mapDispatchToProps),
  withColor
)(cssModules(Header,classes));
