import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

import './DeleteEvent.css'

import { getOneEventThunk } from '../../../store/events'
import { deleteEvent } from '../../../store/events';


const DeleteEvent = () => {
    const dispatch = useDispatch()

    const { eventId } = useParams()
    const history = useHistory();

    const thisEvent = useSelector((state) => state.events[eventId]);
    const user = useSelector(state => state.session.user);


    //  moment of truth

    const isOwner = user?.id === thisEvent?.Group.organizerId

    // get event stuff
    useEffect(() => {


        dispatch(getOneEventThunk(eventId)).then(() => setLoaded(true))
    }, [dispatch, eventId])

    const [loaded, setLoaded] = useState(false)



    const makeEventgoByeBye = e => {
        console.log('i am here and this is the eventid ', eventId)
        e.preventDefault()
        setLoaded(false)
        dispatch(deleteEvent(eventId)).then(() => history.push('/events/all'))


    }







    if (!thisEvent) {
        return null
    }
    // stuff with dates

    const start = new Date(thisEvent.startDate)
    const splitStart = start.toString().split(' ')
    // getting all the stuff 
    const day = splitStart[0]
    const date = `${splitStart[1]} ${splitStart[2]}`
    const militaryTime = start.getHours()
    const minutess = start.getMinutes()

    const civilians = Number(militaryTime) > 12 ? Number(militaryTime) - 12 : militaryTime
    const stupidCivilians = Number(militaryTime) > 12 ? 'PM' : 'AM'
    const realMinutes = (minutess > 10) ? minutess : '0'.concat(minutess)
    const people = (thisEvent.numAttending > 1 || thisEvent.numAttending === 0) ? 'persons' : 'person'


    const end = new Date(thisEvent.endDate)
    const splitEnd = end.toString().split(' ')
    const militarischZeit = end.getHours()
    const minuten = end.getMinutes()

    const endCivilians = Number(militarischZeit) > 12 ? Number(militarischZeit) - 12 : militarischZeit
    const idioten = Number(militarischZeit) > 12 ? 'PM' : 'AM'
    const endMinutes = (minuten > 10) ? minuten : '0'.concat(minuten)


    // end stuff with dates



    return loaded && (
        <div className='mainEDdetails'>
            <div className='topEDcontainer'>
                <div className='leftEDPhotos'>
                    <img id='EDphoto' src={thisEvent.previewImage?.length > 0 ? thisEvent.previewImage[0].url : ""} />
                </div>

                <div className='theothersectionofEDtop'>
                    <div className='introEDtopDiv'>
                        <h1 className='name'>{thisEvent.name}!</h1>
                        <div className='EDaddressParentDiv'>
                            <h3>We will meet at </h3>
                            <h4 className='location'>{thisEvent.Venue ? thisEvent.Venue.address : 'The organizer has not determined the location of the event yet'} {thisEvent.Venue ? thisEvent.Venue.city : ''} {thisEvent.Venue ? thisEvent.Venue.state : ''}</h4>
                        </div>
                        <h4>Proudly hosted by {thisEvent.Group.name}</h4>
                    </div>
                    <div className='descriptionDiv'>
                        <p>{thisEvent.description}</p>
                        <p>there are currently {thisEvent.numAttending} {people} attending and only {thisEvent.capacity - thisEvent.numAttending} spots left!</p>
                    </div>
                    <div className='startDiv'>
                        <h3>{`we will start at ${day} ${date} at ${civilians}:${realMinutes} ${stupidCivilians}`} {`and end at ${endCivilians}:${endMinutes} ${idioten}`}</h3>
                    </div>
                </div>
            </div>
            {isOwner &&
                <div className='EDflavorText'>
                    <p>Hi Mr / Mrs. {user.lastName} if you wish to cancel this event please click below.</p>
                    <p id='thesecondbottomED'>Please be warned that there is no way to undo this process</p>
                    <button className='submitEDButton' onClick={makeEventgoByeBye}>Cancel This Event</button>
                </div>}










        </div>
    )


}


export default DeleteEvent