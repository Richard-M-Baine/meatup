import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';

import './CreateEventForm.css'

import {createEventThunk} from '../../../store/events'
import * as EventActions from '../../../store/events'


// test case
const group = {
    id: 1
}


function CreateEventForm() {
    const dispatch = useDispatch()
    const history = useHistory()

    const groupId = group.id

    const [name, setName] = useState('')
    const [type, setType] = useState('In Person')
    const [capacity, setCapacity] = useState(1)
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const [validationErrors, setvalidationErrors] = useState([])
    const [isSubmitted, setIsSubmitted] = useState(false)




    return (
        <form>
            <h2>Let's create an event!</h2>

            <div className='createEventDiv'>
                <h3>What is the name for your event?</h3>
                <input
                required
                value={name}
                onChange={e => setName(e.target.value)}
                maxLength='50'
                id='nameInput'
                placeholder='max 50 characters'
                />
                <span className="inputSpan">{name.length} characters</span>
                
            </div>

            <div className='createEventDiv'>
                <h3>Please enter a description</h3>
                <p>Our advice is to keep the message simple and positive.</p>
                <textarea
                required
                rows='10'
                cols='75'
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder='please enter at least 50 characters'>
                </textarea>
                <span className='inputSpan'>{description.length} characters</span>
            </div>

            <div className="createEventDiv">
                <h3>Will this event be in person or online?</h3>
                <select name='type' value={type} onChange={e => setType(e.target.value)} >
                    <option value='In person'>In Person</option>
                    <option value='Online'>Online</option>
                </select>
            </div>

            <div className="createEventDiv">
                <h3>How many people are allowed to attend this event?</h3>
                <input
                    required
                    name="event-capacity"
                    type="number"
                    value={capacity}
                    onChange={e => setCapacity(e.target.value)}
                    min="1"
                    max="100" />
            </div>


        </form>
    )
}



export default CreateEventForm