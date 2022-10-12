import React, { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'

import GroupCard from './GroupCard/index'
import './groups.css'

import { getGroupsThunk} from '../../../store/group'





// problems here
function AllGroups(){
    const dispatch = useDispatch()
    const groups = useSelector(state => state.groups)

    const groupsList = Object.values(groups)

    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        dispatch(getGroupsThunk())
        .then(() => setLoaded(true))
    },[dispatch])
    console.log(loaded)

    return (
        <div>
            <GroupCard />
        </div>
    )
    
}

export default AllGroups;