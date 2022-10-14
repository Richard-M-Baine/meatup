// group details react template

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
    console.log(groupId)

    const [isLoaded, setIsLoaded] = useState(false)
    
    const history = useHistory();
    const reduxstate = useSelector((state) => state.groups);

    const group = useSelector(state => state.groups[Number(groupId)])
    const singleGroup = reduxstate[groupId];
    const thisUser = useSelector(state => state.session.user);


    useEffect(() => {
        dispatch(getOneGroupThunk(groupId))
            .then(() => setIsLoaded(true))
    }, [dispatch])


    return isLoaded && (
        
       <div className='main-container'>
                <div className='top-container_'>
                    <div className='left-top-container'>
                        {singleGroup.GroupImages && singleGroup.GroupImages[0] && <img className='big-image' src={singleGroup.GroupImages[0].url}></img>}
                        {(!singleGroup.GroupImages || !singleGroup.GroupImages[0]) && <div className='place-holder-group-img' ></div>}
                    </div>

                    <div className='right-top-container'>
                        <div className='name'>{singleGroup.name}</div>
                        <div className='location'>🌍 {singleGroup.city}, {singleGroup.state}</div>
                        <div className='members-public'>👥 {singleGroup.numMembers} {singleGroup.numMembers === 1 ? "member" : "members"} · {singleGroup.private ? "Private" : "Public"} group </div>
                        <div className='organizer'>👤 Organized by {singleGroup.organizer.firstName}</div>
                        <div className='bottom-left-container'>
                        <div class='about'>
                            What we're about
                            <br />
                            {singleGroup.about}
                        </div>
                    </div>
                    </div>
                </div>
        </div>
    )
}