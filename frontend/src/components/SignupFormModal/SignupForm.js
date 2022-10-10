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
      <>
        <form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <ul>
            {errors.map((error, index) => <li key={index}>{Object.values(error)[0]}</li>)}
          </ul>
          <h2>
            Email
          </h2>
  
          <input
            className="w100"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            
  
          />
          <h2>
            Username
          </h2>
  
          <input
            className="w100"
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
            
  
          />
          <h2>
            First Name
          </h2>
  
          <input
            className="w100"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            
  
          />
          <h2>
            Last Name
          </h2>
  
          <input
            className="w100"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            
  
          />
          <h2>
            Password
          </h2>
  
          <input
            className="w100"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            
  
          />
          <h2>
            Confirm Password
          </h2>
  
          <input
            className="w100"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            
  
          />
          <div className="signup-footer w100 flex-column-center">
            {/* <button className="return" onclick="javascript:history.back()">Back</button> */}
            <button className="signup-bottom" type="submit">Sign Up</button>
          </div>
        </form>
      </>
    );
  }
  
  export default Signup;
  