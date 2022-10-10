import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './Demonstration.css';

export default function DemoUser() {
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const credential = 'bilbo@gmail.com';
        const password = 'password';
        return dispatch(sessionActions.login({ credential, password }))
    }
    return (
        <form onSubmit={handleSubmit}>
             <h4>The purple is demo user button.</h4>
            <button className = 'dasButton'type='submit'>Demo User</button>
        </form>
    )
}