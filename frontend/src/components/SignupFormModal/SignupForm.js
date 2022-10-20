import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";

import './SignupForm.css'

function Signup() {
    const dispatch = useDispatch();
    const history = useHistory()
  
    const sessionUser = useSelector((state) => state.session.user);
  
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUserName] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const [errors, setErrors] = useState([]);
  
    //if (sessionUser) return <Redirect to="/" />;
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (password === confirmPassword) {
        setErrors([]);
        return dispatch(sessionActions.signup({ firstName, lastName, email, username, password }))
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
          });
      }
      return setErrors([{ password: 'Confirm Password field must be the same as the Password field!' }]);
    };
  
    return (
      <div className="signup-ruckgrund">
        <div className="signup-erstediv">
        <h1 id="signupbutton">Sign Up</h1>
        </div>
        <form className='signupForm' onSubmit={handleSubmit}>
          
          <ul>
            {errors.map((error, index) => <li key={index}>{Object.values(error)[0]}</li>)}
          </ul>

          <div className="divdiv">
          <h2 className="label">
            Email
          </h2>
          </div>
  
          <input
            className="input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            
  
          />
          <h2 className="label">
            Username
          </h2>
  
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
            
  
          />
          <h2 className="label">
            First Name
          </h2>
  
          <input
            className="input"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            
  
          />
          <h2 className="label">
            Last Name
          </h2>
  
          <input
            className="input"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            
  
          />
          <h2 className="label">
            Password
          </h2>
  
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            
  
          />
          <h2 className="label">
            Confirm Password
          </h2>
  
          <input
            className="input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            
  
          />
          <div className="signup-button-div">
            {/* <button className="return" onclick="javascript:history.back()">Back</button> */}
            <button className="signup-bottom" type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    );
  }
  
  export default Signup;
  