import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { Link, NavLink, useParams } from 'react-router-dom';

import './CreateEventForm.css'

import {getOneGroupThunk} from '../../../store/group'
import {createEventThunk} from '../../../store/events'
import {createEventImageThunk} from '../../../store/events'


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
    const [preImage, setPreImage] = useState('')
    const [preview, setPreview] = useState(false)

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
    if (!preview)

    setvalidationErrors(errors)

}, [name, description, startDate, endDate, price])

const submit = async e => {
e.preventDefault()
setIsSubmitted(true)



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

const eventImageCreate = await dispatch(createEventImageThunk(preImage, preview, data.id))


history.push(`/events/all`)
}



    return (
        <div className='ceOuterDiv'>
        <h2 id='ceHeader'>Let's create an event!</h2>
        <form className='createEventForm'onSubmit={submit}>
            

            {isSubmitted && validationErrors.length > 0 &&
                <ul>
                    {validationErrors.map(error => <li key={error}>{error}</li>)}
                </ul>}

            <div className='createEventDiv'>
                <h3>What is the name for your event?</h3>
                <input
                className='ceinputEvent'
                required
                value={name}
                onChange={e => setName(e.target.value)}
                maxLength='50'
                id='nameInput'
                placeholder='max 50 characters'
                />
                <span className="ceinputSpan">{50 - name.length} characters remaining</span>
                
            </div>

            <div className='createEventDiv'>
                <h3>Please enter a description</h3>
                <textarea
                className='cedescription'
                required
                rows='10'
                cols='75'
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder='please enter at least 50 characters.  Our experience shows that the best description is simple and positive.'>
                </textarea>
                <span className='ceinputSpan'>{description.length} characters</span>
            </div>

            <div className="createEventDiv">
                <h3>Will this event be in person or online?</h3>
                <select className='ceselectEvent' name='type' value={type} onChange={e => setType(e.target.value)} >
                
                    <option value='In person'>In Person</option>
                    <option value='Online'>Online</option>
                </select>
            </div>

            <div className="createEventDiv">
                <h3>How many people are allowed to attend this event? </h3>
                <p> You can have up to 100 people attend.</p>
                <input
                   className='ceselectEvent'
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
                <h3 >How much will it cost to attend the event?</h3>
                <input 
                className='ceselectEvent'
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
                
                    <h3>When will your event start?</h3>
                        <input
                        className='ceselectEvent'
                        required
                        name="event-start-date"
                        type="datetime-local"
                        max={"9999-12-31T00:00"}
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)} 
                        />
                
            </div>
            <div className='createEventDiv'>
                
                    <h3>When will your event end?</h3>
                    <input
                        className='ceselectEvent'
                        required
                        name="event-end-date"
                        type="datetime-local"
                        value={endDate}
                        max={"9999-12-31T00:00"}
                        onChange={e => setEndDate(e.target.value)} />
                
            </div>
            <div className='createEventDiv'>
                <h3 id='h3cebottom'>Enter the url of an image for your group here</h3>
                            <input
                            type='text' 
                            className='ceinputEvent'
                            value={preImage}
                            onChange={(e)=> setPreImage(e.target.value)}
                            />
                            <label>
                            Select if this is a preview image or not:
                            <input type='checkbox' onChange={() => setPreview(!preview)}/> 
                            </label>

            </div>

            <div className='cebuttondiv'>
                <button className='cebutton' disabled={validationErrors.length > 0}type="submit">Create your group</button>
            </div>  


        </form>
        </div>
    )
}



export default CreateEventForm