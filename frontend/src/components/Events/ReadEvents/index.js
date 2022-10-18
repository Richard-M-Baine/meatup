import React, { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'

import './ReadEvents.css'
import EventCard from './EventCard'


import { getEventsThunk } from '../../../store/events'


function AllEvents() {
    const dispatch = useDispatch()
    const events = useSelector(state => state.events)

    const eventList = Object.values(events)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        dispatch(getEventsThunk()).then(() => setLoaded(true))
    },[dispatch])

    return loaded && (
    <div className='main'>
      <div className='eventPart'>
        <div className='eventTextDiv'>
            <h1>Events</h1>
        </div>


        <div className='events'>
          {eventList.map(event => (
                <EventCard event={event} key={event.id}/>
          ))}
        </div>
      </div>


    </div>
      )
    
}


export default AllEvents