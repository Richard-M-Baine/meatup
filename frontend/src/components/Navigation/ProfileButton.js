import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

import './profile.css'
import ukraine from './ukraine.png'



function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button onClick={openMenu}>
        <img className='ukraine' src={ukraine}/>
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li className='profileNavName'>Welcome {user.firstName} {user.lastName}</li>
          <li className='profileNavName'>logged in with {user.email}</li>
         
          <li id='profileNavButton'>
            <button className="profileButtonp" onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;