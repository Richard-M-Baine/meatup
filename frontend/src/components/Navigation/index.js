// frontend/src/components/Navigation/index.js


import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import DemoUser from '../Demonstration/index';
import SignupFormModal from '../SignupFormModal';
import download from '../Home/splashImages/download.jpg'


import './Navigation.css';







function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;




  if (sessionUser) {


    sessionLinks = (
      <div className='navLoginOutDiv'>
        <div className='newGroupDiv'>
        <NavLink className='newNavGroup' to={`/groups/new`}>Create a group</NavLink>
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
          <SignupFormModal />
        </div>
      )
      
    
  }


  // altered the authMe thing for divs

  return (
    // thank you

    <nav className='nav login'>
      <div className='logo'>
        <NavLink exact to="/"><img src={download}/></NavLink>
      </div>
      <div className='buttons'>
        {isLoaded && sessionLinks}
      </div>
    </nav>
  );
}

export default Navigation;
