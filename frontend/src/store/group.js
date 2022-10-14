import { csrfFetch } from "./csrf";

// defintions or whatever they are called

const CREATE_GROUP = 'groups/new'
const GET_GROUPS = 'groups/all'
const ONE_GROUP = 'groups/one'




// AKTION CREATORS

const createGroupAction = (payload) => {
    return {
        type: CREATE_GROUP,
        payload
    }
}


const getGroupsAction = payload => {
   
    return {
        type: GET_GROUPS,
        payload
    }
}

const OneGroup = group => {
    return {
        type: ONE_GROUP,
        group
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


// read / get all the groups

export const fetchGroups = () => async dispatch => {
    const res = await csrfFetch('/api/groups');
    
   
    if (res.ok) {
        const groups = await res.json();
        
       
        dispatch(getGroupsAction(groups));
        
        return groups;
    }
}

// get group by id

export const getOneGroupThunk = id => async dispatch => {
    
    const res = await csrfFetch(`/api/groups/${id}`);
    if (res.ok) {
        
        
        const singleGroup = await res.json()
        
        dispatch(OneGroup(singleGroup))
        return singleGroup
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
        case GET_GROUPS: {  
            action.payload.Groups.forEach(group => {
                newState[group.id] = group
            })
            return newState 
        }
        case ONE_GROUP: {
            newState = { ...state };
            newState[action.group.id] = action.group;
            return newState;

        }
       
      
        default:
            return state;





    }


}

export default groupReducer;