import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';
import './CreateGroup.css';
//import { createGroupThunk } from '../../store/group';
//import * as GroupActions from '../../store/group';


function CreateGroupForm(){
    const history = useHistory()
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user)

    // stuff for form

    const [name,setName] = useState('')
    const [about, setAbout] = useState('')
    const [type, setType] = useState('In Person')
    const [city, setCity] = useState('')
    const [state, setState] = useState('AK')
    const [preImage, setPreImage] = useState('')
    const [privacy, setPrivacy] = useState(false)
    const [errors, setErrors] = useState([])
    const [submit, setSubmit] = useState(false)

    // end form stuff

    if (!sessionUser){
        return (
            <div className='containerNoUser'>
                <div className='noUser'>
                    Please log in or sign up to create a group
                </div>


            </div>
        )
    }

    return(
        <h1>This works</h1>
    )

}

export default CreateGroupForm