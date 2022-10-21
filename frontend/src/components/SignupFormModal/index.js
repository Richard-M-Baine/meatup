// fill me out if you want a modal

import React, { useState } from 'react';
import { Modal } from '../../context/Modal'
import Signup from './SignupForm';

import './sadindex.css'

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
  
      <button className='button-signup' onClick={() => setShowModal(true)}>Sign up</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Signup onClose={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;