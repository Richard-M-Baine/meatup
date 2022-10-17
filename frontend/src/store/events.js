import { csrfFetch } from "./csrf";

const GET_EVENTS = "events/all"
const GET_GROUP_EVENTS = 'events/group/events'



const CREATE_EVENT = "events/create"
const READ_EVENT = "events/details"
const DELETE_EVENT = "events/delete"

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

export const getOneEventThunk = id => async dispatch => {
    
    const res = await csrfFetch(`/api/events/${id}`)
    if (res.ok){
        const singleEvent = await res.json()
        dispatch(getEventDetailsAction(singleEvent))

        return singleEvent
    }
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
            newState[action.payload.id] = { ...newState[action.payload.id], ...action.payload } // Gets the new data from the response and adds it to what exists
            return newState
        }
       
        case DELETE_EVENT: {
            newState = { ...state }
            delete newState[action.payload]
            return newState
        }
        default: {
            return state
        }
    }
}

export default eventsReducer
