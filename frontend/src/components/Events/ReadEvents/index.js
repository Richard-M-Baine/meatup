import React, { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'

import './ReadEvents.css'


import { getEventsThunk } from '../../../store/events'


function AllEvents() {
    const dispatch = useDispatch()
    const events = useSelector(state => state.events)

    const eventList = Object.values(events)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        dispatch(getEventsThunk()).then(() => setLoaded(true))
    },[dispatch])

    return (
        <h1>You are terrible</h1>
    )
}


export default AllEvents