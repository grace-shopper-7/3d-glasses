import { useState } from 'react'
import { NavLink } from 'react-router-dom'
// import { useUser } from '../state/context'
import Modal from 'react-modal'
import Cart from './Cart'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import { useLocation } from 'react-router-dom'
// import AuthForm from './AuthForm'


const Header = ({token, setToken, user, setUser, cart, setCart, sessionId, totalPrice, setTotalPrice}) => {
  const [modalIsOpen, setIsOpen] = useState(false)
  const location = useLocation()

  //modal funcs
  function openModal() {
    setIsOpen(true);
  }
  
  function closeModal() {
    setIsOpen(false);
  }

  //auth funcs
  function signOut() {
    setToken("");
    localStorage.removeItem('token') 
    setUser({}); 
    localStorage.removeItem('user')
    setSessionId(0); 
    localStorage.removeItem('user') 
  }
  return (
    <>
      <div className='header'>
        <NavLink to='/' className='site-logo'>
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
          : null 
          } 
          {location.pathname.includes("revieworder") ? 
          null
          :
          <>
            <p style={{height: '1rem'}}></p>
              <button className='cart-button' onClick={!modalIsOpen? openModal : closeModal}><AiOutlineShoppingCart /></button>
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
        <Cart 
          cart={cart} 
          setCart={setCart} 
          openModal={openModal}
          closeModal={closeModal} 
          sessionId={sessionId} 
          token={token} 
          totalPrice={totalPrice}
          setTotalPrice={setTotalPrice}
        />
      </Modal>
    </>
  )
}

export default Header