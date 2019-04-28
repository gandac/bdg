import React,{Component} from 'react';
import GallerySlide from './gallerySlide';
import Slider from "react-slick";
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
         (<div><h2><span>{this.props.locations.length} New Places </span></h2><div className="locationTitleDescription" dangerouslySetInnerHTML={{ __html: this.props.description ? this.props.description : null }}></div></div>);
   
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
    }else if(this.props.images){ 
        let images = this.props.images.map(image => {
                               const postBoxSizeUrl = image.mediaDetails.sizes ? image.mediaDetails.sizes.filter( (element) => element.name == 'postbox') : null; 
                                return (<img src={postBoxSizeUrl} />); });
        return (<div className="newLocationsCarouselWrapper">
                    <div className="newLocationsCarousel">
                        <Slider ref={slider => this.slider = slider} {...sliderSettings}>
                            {images}
                        </Slider >
                    </div>
                    <div class="newLocationsCarouselControls">
                    <IconArrow className="prevArrow" color={this.props.colors.primary} onClick={() => this.slider.slickPrev()}/> 
                    {this.state.index} / {this.props.locations.length}
                    <IconArrow color={this.props.colors.primary} onClick={() => this.slider.slickNext()}/> 
                    </div>
                </div> 
                )
    }else{
        return null;
    }

}
}
export default NewLocationsSlider;