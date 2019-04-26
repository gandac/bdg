import React from 'react';

const eventBox = (props) => {
    const event = props.event.node;

    return (<div className="eventBox">
         <div className="eventBoxDate">
            <div >{event.formatedDate.month} {event.formatedDate.dayOfMonth}</div>
            <div className="uppercase">{event.formatedDate.dayOfWeek}</div>
         </div>
         <div className="eventBoxDescription">
            <h3 className="eventBoxTitle">{event.title}</h3>
            <span className="eventBoxLocation">{event.location[0].title}</span>
        </div>
    </div>);
}
export default eventBox;