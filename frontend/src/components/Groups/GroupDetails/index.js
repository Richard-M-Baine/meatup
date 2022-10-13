import React from 'react'
import { useEffect, useState } from 'react';
import * as sessionActions from '../../../store/session';

import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams, useRouteMatch, Link, NavLink } from 'react-router-dom';

//css
import './GroupDetails.css'

// thunk
import {getOneGroupThunk} from '../../../store/group'


export default function GroupDetails(){

    const dispatch = useDispatch();
    const { groupId } = useParams();
    
    const history = useHistory();
    const reduxstate = useSelector((state) => state.groups);
    const singleGroup = reduxstate[groupId];
    const thisUser = useSelector(state => state.session.user);

    useEffect(() => {
        
        dispatch(getOneGroupThunk(groupId))
    }, [dispatch]);


    return (
        <div>
        <h1>I am the group details thing</h1>
        
        <h2>{singleeGroup.name}</h2>
        </div>
    )
}