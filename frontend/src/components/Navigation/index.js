// frontend/src/components/Navigation/index.js


import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import DemoUser from '../Demonstration/index';


import './Navigation.css';







function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
 
  if (sessionUser) {
    sessionLinks = (
      <div className='navLoginOutDiv'>
        <div className='newGroupButton'>
        <NavLink className='new-group' to={`/groups/new`}>Create your group</NavLink>

        </div>
      <div className='profile'>
      <ProfileButton user={sessionUser} />
      </div>
      </div>
    );
  } 
  
  else {
    sessionLinks = (
      <div className='logout'>
        <DemoUser />
        <LoginFormModal />
        <NavLink className= 'signup' to="/signup">Sign Up</NavLink>
      </div>
    );
  }


  // altered the authMe thing for divs

  return (
    // thank you

    <div className={sessionUser ? "navbar login" : 'navbar logout'}>
      <div className='logo'>
        <NavLink exact to="/">insert logo here</NavLink>
      </div>
      <div className='buttons'>
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;
