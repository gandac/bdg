import React,{Component} from 'react';
import EventBox from './eventBox';
import Slider,{slickNext,} from "react-slick";
import IconArrow from "../ui/svg/iconArrow";
import './events.css';
import { renderComponent } from 'recompose';


class eventsCarousel extends Component {
   
    state = {
        index: 3
      }
     
      
    render(){
       const afterEventsChange = (cindex) => { 
            console.log('oldneu',cindex);
            this.setState({index:cindex+3});
        }
    let sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        afterChange: (index) => afterEventsChange(index),
      };

    if(this.props.events){
        
        let events =  this.props.events.map( event => <EventBox key={event.node.id} event={event}/>)
        return ( <div className="eventsCarousel">
                    <h2><span>Events {this.state.index}/{this.props.events.length}</span><IconArrow color={this.props.color} onClick={() => this.slider.slickNext()}/> </h2>
                    
                    <Slider ref={slider => this.slider = slider} {...sliderSettings}>
                        {events}
                    </Slider >
                </div>
                 );
       
    }else{
        return null;
    }

}
}
export default eventsCarousel;