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
        <h1>You are terrible</h1>
    )

}


export default DeleteEvent