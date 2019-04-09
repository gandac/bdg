import React, {Component} from 'react';
import colorsJson from '../static/color-configuration.json';
import {connect} from 'react-redux';

function withColor(InputComponent) {

    const mapStateToProps = (state) => {
        return {
            theCategoryColor: state.category.thecolor,
        }
    }
    return connect( mapStateToProps) (class extends Component {
    // return class extends Component { 
        state = {
            currentStyles : colorsJson.initial.layoutColors
        }
        componentDidMount(){
            this.setState({ currentStyles: this.props.theCategoryColor});
            // const colors = this.props.colors;
        }
        componentWillUpdate(nextProps) {
            const nextColor = nextProps.theCategoryColor
            if( this.props  &&  nextColor !== this.props.theCategoryColor ){
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
