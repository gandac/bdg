import React, {Component} from 'react';
import colorsJson from '../static/color-configuration.json';
import {connect} from 'react-redux';

function withColor(InputComponent) {

    const mapStateToProps = (state) => {
        return {
            theCategoryColor: state.category.thecolor,
            currentPageType: state.locations.pageType,
        }
    }
    return connect( mapStateToProps) (class extends Component {
    // return class extends Component { 
        state = {
            currentStyles : colorsJson.initial.layoutColors
        }
        componentDidMount(){
            
            if( this.props.currentPageType.includes('category') ){
                if(this.props.theCategoryColor){
                    this.setState({ currentStyles: colorsJson[this.props.theCategoryColor].layoutColors});
                }
            }else if( this.props.currentPageType.includes('homepage')){
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
            }
            console.log('nextProps currentProps',nextColor,this.props.theCategoryColor);
            if( this.props  &&    currentPageType.includes('category') && nextColor !== this.props.theCategoryColor ){
                console.log('here');
             if(colorsJson[nextColor]){
               this.setState({ currentStyles: colorsJson[nextColor].layoutColors});
             }
            }
        //    console.log('face loggggg' , this.props);
       };
       render(){
           return <InputComponent currentStyles={this.state.currentStyles} {...this.props} />
       }
    })
}

export default withColor;
