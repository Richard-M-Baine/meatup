import React from "react";
import { NavLink } from "react-router-dom";

import "./EventCard.css"






function EventCard({ event }) {

   
    

    // getting all the stuff from the start date
    const start = new Date(event.startDate)
    const splitStart = start.toString().split(' ')
        // getting all the stuff 
    const day = splitStart[0]
    const date = `${splitStart[1]} ${splitStart[2]}`
    const militaryTime = start.getHours()
    const minutess = start.getMinutes()
    

    // for stupid civilians and for practicing ternaries
    const civilians = Number(militaryTime) > 12 ? Number(militaryTime) - 12 : militaryTime
    const stupidCivilians = Number(militaryTime) > 12 ? 'PM' : 'AM'
    const realMinutes = (minutess > 10) ? minutess : '0'.concat(minutess)
    const people = (event.numAttending > 1 || event.numAttending === 0) ? 'persons' : 'person'


    

    return (
        <NavLink to={`/events/${event.id}/about`}>
    <div className="outerDiv">
        <div className="photoPart">
        <img id='photo'src={event.previewImage} />
        </div>

        <div className="otherStufDivEA">
            <h2 className="otherStufDivEA">{event.name}</h2>
            <h4 className="otherStufDivEA">{`next meeting ${day} ${date} at ${civilians}:${realMinutes} ${stupidCivilians}`}</h4>
            <p className="otherStufDivEA">Hosted By {event.Group.name} from {event.Group.city} {event.Group.state}</p>
            <div className="otherStufDivEA">There currently {event.numAttending} {people} attending!</div>

        </div>


    </div>
        

        </NavLink>
    )
}



export default EventCard