import { csrfFetch } from "./csrf";

// defintions or whatever they are called

const CREATE_GROUP = 'groups/new'
const GET_GROUPS = 'groups/all'
const ONE_GROUP = 'groups/one'
const EDIT_GROUP = 'groups/edit'
const DELETE_GROUP = 'groups/delete'






// AKTION CREATORS

const createGroupAction = (payload) => {
    return {
        type: CREATE_GROUP,
        payload
    }
}

const deleteGroupAction = (payload) => {
    return {
        type: DELETE_GROUP,
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

const EditGroup = group => {
    return {
        type: EDIT_GROUP,
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


export const deleteGroupThunk = (groupId) => async dispatch => {
    console.log('i am in the thunk')
    const response = await csrfFetch(`/api/groups/${groupId}`,
        {
            method: 'DELETE'
        })
    const data = await response.json()

    if (response.ok) {
        await dispatch(deleteGroupAction(groupId))
        return data
    } else { // any bad requests and errors
        return data
    }
}


export const editGroupThunk = (payload, groupId) => async(dispatch) => {
   
    // console.log(" i am the thunk body" , payload)

    // const object = {  
    //     name,
    //     about,
    //     type,
    //     city,
    //     state,
    //     private: isPrivate,  
    // }
    
    const response = await csrfFetch(`/api/groups/${groupId}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
    })
    
    const data = await response.json();

    
    dispatch(EditGroup(data));
    return response;
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
            
            newState = {...state };
            newState[action.group.id] = action.group;
            return newState;

        }

        case EDIT_GROUP: {
            newState = { ...state }
            newState[action.payload.id] = { ...newState[action.payload.id], ...action.payload }
            return newState
        }

        case DELETE_GROUP: {
            newState = { ...state }
            delete newState[action.payload]
            return newState
        }
       
      
        default:
            return state;





    }


}

export default groupReducer;