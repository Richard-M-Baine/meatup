import { csrfFetch } from "./csrf";

const GET_EVENTS = "events/all"
const GET_GROUP_EVENTS = 'events/group/events'

const CREATE_EVENT = "events/create"
const READ_EVENT = "events/details"
const DELETE_EVENT = "events/delete"

const EVENT_IMG = 'events/image'

// action creators fewer spaces

const getEventsAction = (payload) => {
    return {
        type: GET_EVENTS,
        payload
    }
}



const createEventAction = (payload) => {
    return {
        type: CREATE_EVENT,
        payload
    }
}

const getEventDetailsAction = (payload) => {
    return {
        type: READ_EVENT,
        payload
    }
}

const deleteEventAction = (payload) => {
    return {
        type: DELETE_EVENT,
        payload
    }
}


const createEventImg = (eventImage) => {
    return {
        type: EVENT_IMG,
        payload: eventImage
    }
}

// lost in the sauce of thunkville
//read
export const getEventsThunk = () => async dispatch => {
    const response = await csrfFetch('/api/events')
    const data = await response.json()

    await dispatch(getEventsAction(data))
    return data
}

// create

export const createEventThunk = (groupId, payload) => async dispatch => {
    const response = await csrfFetch(`/api/groups/${groupId}/events`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
    )
    const data = await response.json()

    if (response.ok) {
        await dispatch(createEventAction(data))
        return data
    } else { 
        return data
    }

}

// details 

export const getOneEventThunk = (id) => async dispatch => {
  
    
    const res = await csrfFetch(`/api/events/${id}`)
    if (res.ok){
        const singleEvent = await res.json()
        dispatch(getEventDetailsAction(singleEvent))

        return singleEvent
    }
}


// destroy the event

export const deleteEvent = (eventId) => async dispatch => {
    console.log(eventId, 'i am in the thunk ', typeof(eventId))
    const response = await csrfFetch(`/api/events/${eventId}`, {
        
        method: 'DELETE'
    })
    const data = await response.json();
    console.log(data)

    if(response.ok){
    dispatch(deleteEventAction());
    return data
    } else {
    return response;
    }
}

export const createEventImageThunk = (preImage, preview, eventId) => async(dispatch) => {
   
    const response = await csrfFetch(`/api/events/${eventId}/images`, {
        method:'POST',
        body: JSON.stringify({
            id: eventId,
            url: preImage,
            preview
        })
    });
    const data = await response.json();
    dispatch(createEventImg(data))
    return response
} 







const initialState = {}

const eventsReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case GET_EVENTS: {
            action.payload.Events.forEach(event => {
                newState[event.id] = event
            })
            return newState
        }
        case GET_GROUP_EVENTS: {
            action.payload.Events.forEach(event => {
                newState[event.id] = event
            })
            return newState
        }
        case CREATE_EVENT:{
            newState = { ...state }
            newState[action.payload.id] = action.payload
            return newState
        }
        case READ_EVENT: {
            newState = { ...state }
            newState[action.payload.id] = { ...newState[action.payload.id], ...action.payload } 
            return newState
        }
       
        case DELETE_EVENT: {
            newState = { ...state }
            delete newState[action.payload]
            return newState
        }

        case EVENT_IMG: {
            newState = { ...state}
            newState.eventImg = action.payload;
            return newState

        }

        default: {
            return state
        }
    }
}

export default eventsReducer
