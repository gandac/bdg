import * as actionTypes from '../../store/actionTypes';
import {ALL_EVENTS_QUERY} from './queries';
const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


const modifyStateEvents = (result) => {
    let events = result.data.event.edges;
    events = events.map(post => {
        const finalLink = `/events/${post.node.slug}`;
        const modifiedEvent = { ...post };
        
        const dateObj = new Date(post.node.datetime);
        let formatedDate = {
            dayOfWeek: daysOfWeek[dateObj.getDay()],
            month: monthNames[dateObj.getMonth()],
            dayOfMonth: dateObj.getDate()
        }
        modifiedEvent.node.link = finalLink;
        modifiedEvent.node.formatedDate = formatedDate;

        return modifiedEvent;
    });
    return {
        type: actionTypes.GET_ALL_EVENTS,
        items: events
    }
}

export const allEventsQuery = (client , searchQuery = '' ) =>{

    let theSearchQuery = searchQuery;
     
      return async dispatch => {
          try{
          const result = await client.query({
              query: ALL_EVENTS_QUERY,
              variables: { searchQuery: theSearchQuery},
          });
            dispatch(modifyStateEvents(result));
            return;
          }catch(err){
             console.log(err);
          }
      }
  }
  
  
  