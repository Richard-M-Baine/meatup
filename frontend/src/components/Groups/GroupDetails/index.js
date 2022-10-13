import React from 'react'
import * as sessionActions from '../../../store/session';

import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams, Link, NavLink } from 'react-router-dom';

//css

import './GroupDetails.css'

export default function GroupDetails(){

    return (
        <h1>I am the group details thing</h1>
    )
}