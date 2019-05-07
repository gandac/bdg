import React, {Component} from 'react';
import {compose, onlyUpdateForPropTypes} from 'recompose';
import queryString from 'query-string';
import {connect} from 'react-redux';
import * as catActions from '../components/LocationCategoryPage/categoryActions';
import * as locationsActions from '../components/LocationsLoop/locationsActions';
import { withApollo } from 'react-apollo';

function withPagination(InputComponent) {

    const mapStateToProps = (state) => {
        return {
            locations: state.locations.posts,
            paginationInfo: state.locations.pageInfo,
            currentPageType: state.locations.pageType
        }
    }
    const mapDispatchToProps = (dispatch) => {
        return { 
            paginateOnCategory: (client , slug , parent, search , pagination) => dispatch(catActions.executeCategoryQuery(client , slug , parent , search , pagination)),
            startCategoryQuery : () => dispatch(catActions.startCategoryQuery()),
        }
    }
   
    return compose(connect( mapStateToProps,mapDispatchToProps),withApollo) (class extends Component {
        constructor(props){
            super(props);
            this.paginate = this.paginate.bind(this)
        }
        state = {
            paginationInfo : {
                next : false,
                prev  : false, 
                any : false,
            },
             lastDirection : 'none',
             paginationLimit: 1,
        }
        componentWillMount(){
           
            this.setState({
                next: this.props.paginationInfo.hasNextPage,
                any: this.props.paginationInfo.hasNextPage,
                prev:false
            });
        }
        componentWillUpdate(nextProps , nextState){
           
            if(nextProps.paginationInfo !== this.props.paginationInfo ){
                if( nextProps.paginationInfo){
                    console.log('does update' , nextState.lastDirection , nextProps.paginationInfo)
                    if(nextState.lastDirection == 'none' ){
                        this.setState({
                            paginationInfo : {
                                next: nextProps.paginationInfo.hasNextPage,
                                any: nextProps.paginationInfo.hasNextPage,
                                prev:false
                            }
                        });
                    }else if(nextState.lastDirection == 'next'){
                        this.setState({ paginationInfo : {
                            prev:true ,
                            any: true,
                            next: nextProps.paginationInfo.hasNextPage 
                           }});
                    }else if(nextState.lastDirection == 'prev'){
                        this.setState({ paginationInfo : {
                            next:true , 
                            prev: nextProps.paginationInfo.hasPreviousPage,
                            any: true
                            }});
                    }
                    
                }
            }
        }
        paginate(direction) {
           
            if(direction > 0 ){
                this.nextPageType();
            }else if ( direction < 0 ){
                this.prevPageType();
            }
            
        }
        nextPageType(){
            let paginationNext = {
                first: this.state.paginationLimit ,
                after: this.props.paginationInfo.endCursor
            }
            
            if( this.props.currentPageType.includes('category') ){
                this.props.startCategoryQuery();
                this.props.paginateOnCategory(this.props.client , this.props.match.params.parent ,this.props.match.params.slug , ''  , paginationNext);
                this.setState({     lastDirection: 'next'  });
            }else if( this.props.currentPageType.includes('searchPage') ){
                const params = queryString.parse(this.props.location.search);
                const search = params.s;
            }else{
                   
            }
        }
        prevPageType(){
            this.setState({ lastDirection : 'prev' });
            let paginationPrev = {
                last: this.state.paginationLimit ,
                before: this.props.paginationInfo.startCursor
            }
            
            if( this.props.currentPageType.includes('category') ){
                this.props.startCategoryQuery();
                this.props.paginateOnCategory(this.props.client , this.props.match.params.parent ,this.props.match.params.slug , ''  , paginationPrev);
            }else if( this.props.currentPageType.includes('searchPage') ){
                const params = queryString.parse(this.props.location.search);
                const search = params.s;
            }else{
                   
            }
        }
        
       render(){
           
           return <InputComponent {...this.props} paginate={this.paginate} paginationInfo={this.state.paginationInfo}/>
       }
    })
}

export default withPagination;


export const Pagination = (props) => {
    const paginationNext = props.displayInfo.next ? <a className="paginationButton paginationNext" onClick={() =>  props.nextPage()} >Next page</a>:null;
    const paginationPrev = props.displayInfo.prev ? <a className=" paginationPrev" onClick={() =>  props.prevPage()} >Prev page</a>:null;
    return (
        <div className="paginationButtons">
            {paginationNext ? paginationNext : null}
            {paginationPrev ? paginationPrev : null} 
        </div>
    )
}
