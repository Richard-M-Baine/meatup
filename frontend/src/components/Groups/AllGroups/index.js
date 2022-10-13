import React, { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'

import GroupCard from './GroupCard/index'
import './groups.css'

import { fetchGroups } from '../../../store/group'





// problems here
function AllGroups(){
    const dispatch = useDispatch()
    const groups = useSelector(state => state.groups)

    
        const groupsList = Object.values(groups)
    
    
    

    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        dispatch(fetchGroups())
        .then(() => setLoaded(true))
    },[dispatch])
    

    return loaded && (
        <div>
            {groupsList.map(group => (
                <GroupCard group={group} key={group.id}/>
            ))}
                
           
        </div>
    )
    
}

export default AllGroups;