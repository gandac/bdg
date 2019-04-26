import React,{Component} from 'react';
import LocationSlide from './locationSlide';
import Slider,{slickNext,} from "react-slick";
import IconArrow from "../ui/svg/iconArrow";



class NewLocationsSlider extends Component {
   
    state = {
        index: 1
    }
     
    render(){
       const afterSlideChange = (cindex) => { 
        
            this.setState({index:cindex+1});
        }
    let sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: (index) => afterSlideChange(index),
      };

    if(this.props.locations){
        
        let locations =  this.props.locations.map( location => <LocationSlide key={location.node.id} location={location}/>)
        let SliderTitle = this.props.type == 'search' ? 
        (<div><h2><span>{this.props.locations.length} Found Places for "{this.props.searchWord}" </span></h2></div>) : 
         (<div><h2><span>{this.props.locations.length} New Places </span></h2><span>- Here are Bucharest newcomers. Nothing older than 30 days</span></div>);
   
        return (<div className="newLocationsCarouselWrapper">
                    <div className="newLocationsCarousel">
                        
                        {SliderTitle}
                        <Slider ref={slider => this.slider = slider} {...sliderSettings}>
                            {locations}
                        </Slider >
                    </div>
                    <div class="newLocationsCarouselControls">
                    <IconArrow className="prevArrow" color={this.props.colors.primary} onClick={() => this.slider.slickPrev()}/> 
                    {this.state.index} / {this.props.locations.length}
                    <IconArrow color={this.props.colors.primary} onClick={() => this.slider.slickNext()}/> 
                    </div>
                </div> 
                 );
       
    }else{
        return null;
    }

}
}
export default NewLocationsSlider;