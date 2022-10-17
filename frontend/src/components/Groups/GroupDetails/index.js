// group details react template

import React from 'react'
import { useEffect, useState } from 'react';
import * as sessionActions from '../../../store/session';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams} from 'react-router-dom';

//css
import './GroupDetails.css'

// thunk
import {getOneGroupThunk} from '../../../store/group'


export default function GroupDetails(){

    const dispatch = useDispatch();
    const { groupId } = useParams();
   const reduxstate = useSelector((state) => state.groups);
    const singleGroup = reduxstate[groupId];
   
    

    const thisUser = useSelector(state => state.session.user);

    const [isLoaded, setIsLoaded] = useState(false)
    
    const history = useHistory();
    

    
    const isOwner = thisUser?.id === singleGroup?.organizerId
  


    useEffect(() => {
        dispatch(getOneGroupThunk(groupId))
            .then(() => setIsLoaded(true))
    }, [dispatch, groupId])


    const editRoute = () => {
        let path = `/groups/${groupId}/edit`
        history.push(path)
    }

    const makeEvent = () => {
        let path = `/groups/${groupId}/events/new`
        history.push(path)
    }


    return isLoaded && (
        
       <div className='main-container'>
                <div className='top-container_'>
                    <div className='leftPhotos'>
                        {singleGroup.GroupImages && singleGroup.GroupImages[0] && <img className='big-image' src={singleGroup.GroupImages[0].url}></img>}
                        {(!singleGroup.GroupImages || !singleGroup.GroupImages[0]) && <div className='place-holder-group-img' ></div>}
                    </div>

                    <div className='rightOtherStuff'>
                        <div className='name'>{singleGroup.name}</div>
                        <div className='location'> {singleGroup.city}, {singleGroup.state}</div>
                        <div className='members-public'> {singleGroup.numMembers} {singleGroup.numMembers === 1 ? "member" : "members"} · {singleGroup.private ? "Private" : "Public"} group </div>
                        <div className='organizer'> Organized by {singleGroup.organizer.firstName}</div>
                        <div className='bottom-left-container'>
                        <div className='about'>
                            What we are about
                            <br />
                            {singleGroup.about}
                        </div>
                    </div>

                    
                </div>

                <div className='otherStuff'>
                    <div className='name-container'>
                        {isOwner &&
                        <p>Welcome Mr. / Mrs. {singleGroup.organizer.lastName}.  As the organizer of the group how do you wish to proceed?</p>}
                    </div>
                
                
                    <div className='button-container'>
                        {isOwner &&
                            <button className='button' onClick={editRoute}>Edit or remove Group</button>}
                    </div>
                    <div className='button-container'>
                        {isOwner &&
                            <button className='button' onClick={makeEvent}>Create Event</button>}
                    </div>
                    <div className='notice'>
                        {!isOwner &&
                        <>
                            <p>You are not an organizer of this group.  </p>
                            <p>If you are the organizer and do not have access to edit or delete the group <a href='https://help.meetup.com/hc/en-us'>please contact us </a></p>
                            </>
                        }
                    </div>


                </div>
        </div>
        </div>
    )
}