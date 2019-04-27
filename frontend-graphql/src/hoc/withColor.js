import React, {Component} from 'react';
import colorsJson from '../static/color-configuration.json';
import {connect} from 'react-redux';

function withColor(InputComponent) {

    const mapStateToProps = (state) => {
        return {
            theCategoryColor: state.category.thecolor,
            firstPost: state.locations.posts[0],
            currentPageType: state.locations.pageType,
        }
    }
   
    return connect( mapStateToProps) (class extends Component {
    // return class extends Component { 
        constructor(props){
            super(props);
            this.changeCurrentColor = this.changeCurrentColor.bind(this)
        }
        state = {
            currentStyles : colorsJson.initial.layoutColors
        }
        changeCurrentColor(color) {
            this.setState({
              ...this.state,
              currentStyles:colorsJson[color].layoutColors
            })
        }
        componentDidMount(){
            
            if( this.props.currentPageType.includes('category') ){
                if(this.props.theCategoryColor){
                    this.setState({ currentStyles: colorsJson[this.props.theCategoryColor].layoutColors});
                }
            }else if( this.props.currentPageType.includes('singleLocation') ){
                if(this.props.firstPost){
                    const currentColor = this.props.firstPost.node.location_categories.edges[0].node.thecolor;
                    this.setState({ currentStyles: colorsJson[currentColor].layoutColors});
                }
            }else{
                this.setState({ currentStyles: colorsJson.colorset1.layoutColors});
            }


        }
        componentWillUpdate(nextProps) {
            const nextColor = nextProps.theCategoryColor;
            const currentPageType = nextProps.currentPageType;

            if( currentPageType  &&  currentPageType.includes('homepage') ){
                if(nextProps.currentPageType != this.props.currentPageType){
                 this.setState({ currentStyles: colorsJson.colorset1.layoutColors});
                }
            }else if(currentPageType.includes('singleLocation') ){
                
                if(nextProps.firstPost){
                    const currentColor = nextProps.firstPost.node.location_categories.edges[0].node.thecolor;
                    if(nextProps.firstPost !== this.props.firstPost){
                    this.setState({ currentStyles: colorsJson[currentColor].layoutColors});
                    }
                }
            }
         
            if( this.props  &&    currentPageType && nextColor !== this.props.theCategoryColor ){
                if(currentPageType.includes('category')){
                    if(colorsJson[nextColor]){
                        this.setState({ currentStyles: colorsJson[nextColor].layoutColors});
                    }
               
                }else{
                    this.setState({ currentStyles: colorsJson.colorset1.layoutColors});
                }
             
            }
        //    console.log('face loggggg' , this.props);
       };
       render(){
           return <InputComponent currentStyles={this.state.currentStyles} {...this.props} changeCurrentColor={this.changeCurrentColor}/>
       }
    })
}

export default withColor;
