// I am LoginForm.js and live in the LoginFormModal component

import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import {useDispatch, useSelector} from 'react-redux'

import {Link, useHistory} from 'react-router-dom'
import { Redirect } from 'react-router-dom';

import SignupFormModal from '../SignupFormModal/index'


import './LoginForm.css'

function Login( ){
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [passwordType, setPasswordType] = useState('password');
    const [checked, setChecked] = useState(false);

    const history = useHistory()

    const sessionUser = useSelector(state => state.session.user);

    
  

    useEffect(()=> {
        if(checked) setPasswordType('text')
        else setPasswordType('password')
      }, [passwordType, checked])

      const submitFunction = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password })).catch(
          async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
          }
        );
        
      };


   // Object.keys(sessionUser).length
    if (sessionUser) return (
         
      
      <Redirect to="/" />
    );
      
    return (
      <div className='login-ruckgrund'>
          <div className='login-erstediv'>
              <div className='login-div'>Log in</div>
              
          </div>
          <form className='login-form' onSubmit={submitFunction}>
              <ul>
                  {errors.map((error, index) => <li key={index}>{error}</li>)}
              </ul>
              <label className='email-login-label'>
                  Please enter your Email  </label>
              <input
                  className='email-box'
                  type="text"
                  value={credential}
                  onChange={(e) => setCredential(e.target.value)}
                  required
              />

              <label className='email-login-label'>Password</label>

              <input
                  className='email-box'
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
              />

              <div className='login-button-div'>
                  <button className='login-button' type="submit">Log In</button>  
              </div>
          </form>
      </div >
  );
        
    }
    
    export default Login;

