import { csrfFetch } from "./csrf";

const GET_EVENTS = "events/all"
const GET_GROUP_EVENTS = 'events/group/events'


const CREATE_EVENT = "events/create"
const READ_EVENT = "events/details"
const DELETE_EVENT = "events/delete"

const getEventsAction = (payload) => {
    return {
        type: GET_EVENTS,
        payload
    }
}

const getGroupsEventsAction = (payload) => {
    return {
        type: GET_GROUPS_EVENTS,
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