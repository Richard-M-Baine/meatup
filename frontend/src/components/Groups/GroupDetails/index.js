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
        
       <div className='mainGroupDetails'>
                <div className='groupDetailsTop'>
                    <div className='leftGroupDetailPhotos'>
                    <img id='GDphoto'src={singleGroup.groupImages?.length > 0 ? singleGroup.groupImages[0].url : ""} />
                
                    </div>

                    <div className='rightTopGroupDetails'>
                        <h2 className='GDname'>{singleGroup.name}</h2>
                        <h3 className='GDlocation'> {singleGroup.city}, {singleGroup.state}</h3>
                        <div className='GDmembers-public'> {singleGroup.numMembers} {singleGroup.numMembers === 1 ? "member" : "members"} · {singleGroup.private ? "Private" : "Public"} group </div>
                        <div className='GDorganizer'> Organized by {singleGroup.organizer.firstName}</div>
                        <div className='GDbottom-left-container'>
                        <div className='GDabout'>
                            <h4>What are we about? </h4>
                            {singleGroup.about}
                        </div>
                    </div>
                    </div>
                    
                </div>

                <div className='otherStuffGD'>
                    <div className='GDname-container'>
                        {isOwner &&
                        <p>Welcome Mr. / Mrs. {singleGroup.organizer.lastName}.  As the organizer of the group how do you wish to proceed?</p>}
                    </div>
                
                <div className='GDbuttonsuperDiv'>
                    <div className='GDbutton-container'>
                        {isOwner &&
                            <button className='GDbutton' onClick={editRoute}>Edit or remove Group</button>}
                    </div>
                    <div className='GDbutton-container'>
                        {isOwner &&
                            <button className='GDbutton' onClick={makeEvent}>Create Event</button>}
                    </div>
                </div>
                    <div className='GDnotice'>
                        {!isOwner &&
                        <>
                            <p>You are not an organizer of this group.  </p>
                            <p>If you are the organizer and do not have access to edit or delete the group <a href='https://help.meetup.com/hc/en-us'>please contact us </a></p>
                            </>
                        }
                    </div>


                </div>
        </div>
        
    )
}