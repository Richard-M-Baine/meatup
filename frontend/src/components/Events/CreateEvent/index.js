import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';

import './CreateEventForm.css'

import {createEventThunk} from '../../../store/events'
import * as EventActions from '../../../store/events'



function CreateEventForm() {

    return (
        <h1>You are Terrible</h1>
    )
}



export default CreateEventForm