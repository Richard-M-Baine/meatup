import React, { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useParams, useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

import './DeleteEvent.css'

import { getOneEventThunk } from '../../../store/events'
import { getOneGroupThunk } from '../../../store/group'


const DeleteEvent = () => {
    const dispatch = useDispatch()
    
    const {eventId} = useParams()
    const history = useHistory();

    const thisEvent = useSelector((state) => state.events[eventId]);
    

    const [loaded, setLoaded] = useState(false)
   
   

    // get event stuff
    useEffect(() => {
        dispatch(getOneEventThunk(eventId)).then(() => setLoaded(true))
    },[dispatch, eventId])

    // useEffect(() => {
    //     dispatch(getOneGroupThunk(thisEvent.Group.id))
            
    // }, [dispatch, eventId])

    const sessionUser = useSelector(state => state.session.user);
   



    if (!thisEvent){
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

  const endCivilians = Number(militarischZeit) > 12 ? Number(militarischZeit) - 12: militarischZeit
  const idioten = Number(militarischZeit) > 12 ? 'PM' : 'AM'
  const endMinutes = (minuten > 10) ? minuten : '0'.concat(minuten)
    

    return loaded && (
        <div className='main-container'>
                <div className='top-container_'>
                    

                    <div className='introtopDiv'>
                        <h1 className='name'>{thisEvent.name}!</h1>
                        <h3 className='location'> we will meet at {thisEvent.Venue.address}, {thisEvent.Venue.city}, {thisEvent.Venue.state}</h3>
                        <h4>by {thisEvent.Group.name}</h4>
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
    )
    

}


export default DeleteEvent