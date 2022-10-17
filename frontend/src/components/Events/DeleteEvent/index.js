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
   
    useEffect(() => {
        dispatch(getOneEventThunk(eventId));

    }, [dispatch]);

    const sessionUser = useSelector(state => state.session.user);
    

 
  
 
    

    return (
        <div className='main-container'>
                <div className='top-container_'>
                    

                    <div className='introtopDiv'>
                        <h1 className='name'>{thisEvent.name} detail Showcase!</h1>
                        <h3 className='location'> Proudly hosted at  {thisEvent.Venue.address}, {thisEvent.Venue.city}, {thisEvent.Venue.state}</h3>
                        <h4>by {thisEvent.Group.name}</h4>
                    </div>
                    <div className='descriptionDiv'>
                        <p>{thisEvent.description}</p>
                        <p>there are currently {thisEvent.numAttending} people attending and only {thisEvent.capacity - thisEvent.numAttending} spots left!</p>
                    </div>
                    <div className='startDiv'>
                        <p>We will start at {thisEvent.startDate}</p>
                    </div>
                </div>
        </div>   
    )
    

}


export default DeleteEvent