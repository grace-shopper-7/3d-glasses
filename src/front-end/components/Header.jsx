import { useState } from 'react'
import { NavLink } from 'react-router-dom'
// import { useUser } from '../state/context'
import Modal from 'react-modal'
import Cart from './Cart'
// import AuthForm from './AuthForm'


const Header = ({token, setToken, user, setUser}) => {
  const [modalIsOpen, setIsOpen] = useState(false)

  //modal funcs
  function openModal() {
    setIsOpen(true);
  }
  
  function closeModal() {
    setIsOpen(false);
  }

  //auth funcs
  function signOut() {
    setToken(null);
    localStorage.removeItem('token') 
    setUser(null); 
    localStorage.removeItem('user') 
  }
  return (
    <>
      <div className='header'>
        <NavLink to='/' className={'site-logo'}>
       <h1>3D GLASSES</h1>
        </NavLink>
        <div className="nav-sign-in"> 
          {token 
          ? <>
              <p className='greeting'>Hey, {user.username}!</p>
              <NavLink to='/'>
              <button className='sign-in-out-button' onClick={signOut}>Sign Out!</button>
              </NavLink>
            </>
          : <>
            <p style={{height: '1rem'}}></p>
              <button className='cart-button' onClick={openModal}>Cart</button>
          </>
          }
        </div>
      </div>
      <Modal 
      closeTimeoutMS={300}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className={"AuthModal"}
      overlayClassName='AuthOverlay'
      portalClassName="ModalPortal"
      contentLabel="Login Modal"
      >
        <Cart closeModal={closeModal}/>
      </Modal>
    </>
  )
}

export default Header