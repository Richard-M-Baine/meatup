import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { Link, NavLink, useParams } from 'react-router-dom';

import './CreateEventForm.css'

import {getOneGroupThunk} from '../../../store/group'
import {createEventThunk} from '../../../store/events'
import * as EventActions from '../../../store/events'


// selectors



function CreateEventForm() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { groupId } = useParams();


    useEffect(() => {
        dispatch(getOneGroupThunk(groupId))
            .then(() => setIsLoaded(true))
    }, [dispatch, groupId])
    

    const [name, setName] = useState('')
    const [type, setType] = useState('In Person')
    const [capacity, setCapacity] = useState(1)
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [isLoaded, setIsLoaded] = useState(false)

    const [validationErrors, setvalidationErrors] = useState([])
    const [isSubmitted, setIsSubmitted] = useState(false)



//const data = await dispatch(createEventThunk(groupId, payload))
// error useEffect sort of like with the test 89 through 92 ok?

useEffect(() => {
    const errors = []

    if (name.length < 5) errors.push('Name must have at least 5 characters')
    if (description.length < 50) errors.push('Description must be at least 50 characters')
    if (price < 0) errors.push('Price can not be a negative value')
    if (new Date(startDate) <= new Date()) errors.push('Start date must be in the future')
    if (new Date(endDate) < new Date(startDate)) errors.push('End date must be after the start date')

    setvalidationErrors(errors)

}, [name, description, startDate, endDate, price])

const submit = async e => {
e.preventDefault()
setIsSubmitted(true)

if (validationErrors.length > 0) return

const payload = {
    
    name,
    type,
    capacity,
    price,
    description,
    startDate,
    endDate
}

const data = await dispatch(createEventThunk(groupId, payload))


history.push(`/events/${data.id}/about`)
}



    return (
        <form onSubmit={submit}>
            <h2>Let's create an event!</h2>

            {isSubmitted && validationErrors.length > 0 &&
                <ul>
                    {validationErrors.map(error => <li key={error}>{error}</li>)}
                </ul>}

            <div className='createEventDiv'>
                <h3>What is the name for your event?</h3>
                <input
                className='inputEvent'
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
                <h3>How many people are allowed to attend this event? </h3>
                <h5> You can have up to 100 people attend.</h5>
                <input
                    className='inputEvent'
                    required
                    name="event-capacity"
                    type="number"
                    value={capacity}
                    onChange={e => setCapacity(e.target.value)}
                    min="1"
                    max="100" 
                    />
            </div>

            <div className='createEventDiv'>
                <h3>How much will it cost to attend the event?</h3>
                <input 
                className='inputEvent'
                required
                name="event-price"
                value={price}
                onChange={e => setPrice(e.target.value)}
                min='0'
                maxLength='5'
                type='currency' 
                />
            </div>

            <div className='createEventDiv'>
                <div className='startDiv'>
                    <h3>When will your event start?</h3>
                        <input
                        required
                        name="event-start-date"
                        type="datetime-local"
                        max={"9999-12-31T00:00"}
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)} 
                        />
                </div>

                <div className='endDiv'>
                    <h4>When will your event end?</h4>
                    <input
                        required
                        name="event-end-date"
                        type="datetime-local"
                        value={endDate}
                        max={"9999-12-31T00:00"}
                        onChange={e => setEndDate(e.target.value)} />
                </div>

            </div>

            <div className='button'>
                <button className='button'  type="submit">Create your group</button>
            </div>  


        </form>
    )
}



export default CreateEventForm