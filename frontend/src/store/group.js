import { csrfFetch } from "./csrf";

// defintions or whatever they are called

const CREATE_GROUP = 'groups/new'
const GET_GROUPS = 'groups/groups'
const UPDATE_GROUP = 'groups/update'



// AKTION CREATORS

const createGroupAction = (payload) => {
    return {
        type: CREATE_GROUP,
        payload
    }
}




// THUNKVILLE


// create group thunk 

export const createGroupThunk = (payload) => async dispatch => {
    const response = await csrfFetch('/api/groups',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })

    const data = await response.json()

    if (response.ok) {
        await dispatch(createGroupAction(data))
        return data
    } else { // any bad requests and errors
        return data
    }

}


// REDUCERVILLE

const initialState = {}

const groupReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case CREATE_GROUP: { 
            newState = { ...state }
            newState[action.payload.id] = action.payload
            return newState
        }





    }


}

export default groupReducer;