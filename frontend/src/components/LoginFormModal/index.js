import React, { useState } from 'react';
import { Modal } from '../../context/Modal'
import Login from './LoginForm';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
  
      <button className='button-login' onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Login onClose={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;