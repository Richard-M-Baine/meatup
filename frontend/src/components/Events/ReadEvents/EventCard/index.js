import React from "react";
import { NavLink } from "react-router-dom";

import "./EventCard.css"
import image1 from '../../EventImages/image1.jpg'
import image2 from '../../EventImages/image2.jpg'
import image3 from '../../EventImages/image3.jpg'





function EventCard({ event }) {

    const array = [image1, image2, image3]
    const end = array.length - 1
    const number = Math.random() * (end - 0)
    const round = Math.round(number)
    

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
        <img id='photo'src={array[round]} />
        </div>

        <div className="otherStufDiv">
            <h1>{event.name}</h1>
            <h3>{`next meeting ${day} ${date} at ${civilians}:${realMinutes} ${stupidCivilians}`}</h3>
            <h4>Hosted By {event.Group.name} from {event.Group.city} {event.Group.state}</h4>
            <h4>There currently {event.numAttending} {people} attending!</h4>

        </div>


    </div>
        

        </NavLink>
    )
}



export default EventCard