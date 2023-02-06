import { useState } from 'react'
import { NavLink } from 'react-router-dom'
// import { useUser } from '../state/context'
import { deleteCartItem } from '../api/fetch'
import Modal from 'react-modal'
import Cart from './Cart'
import {AiFillCloseSquare, AiOutlineShoppingCart} from 'react-icons/ai'

import { useLocation, useNavigate } from 'react-router-dom'
import './styles/Header.css'
import Carousel from './Carousel'

// import AuthForm from './AuthForm'


const Header = ({token, setToken, setUser, cart, setCart, sessionId, setSessionId, totalPrice, setTotalPrice, editTrigger, setEditTrigger}) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate= useNavigate();
  const localUser = localStorage.getItem("username");
  console.log("THIS IS LOCAL USER", localUser)
  
  const handleLeave = async() => {
    setCart([])
    for (let i=0; i<cart.length; i++) {
        deleteCartItem(token, cart[i].id)
    }
    navigate('/')
}
  //modal funcs
  function openModal() {
    setIsOpen(true);
  }
  
  function closeModal() {
    // console.log("localStorage:", localStorage)
    setIsOpen(false);
  }
  
  //auth funcs
  function signOut() {
    setToken("");
    localStorage.removeItem('token');
    setUser({}); 
    localStorage.removeItem('user');
    setSessionId(0); 
    localStorage.removeItem('sessionId');
    setIsOpen(false)
    localStorage.removeItem('username');
  }
  return (
    <>
      <div className='header'>
      <Carousel />
        <div className='signout'> 
          {(token && localStorage)
          ? <>
              <div>
              <NavLink to='/'>
              <button className='sign-in-out-button' onClick={() => {
                closeModal();
                signOut();
              }}>Sign Out!</button>
              </NavLink>
              {location.pathname.includes("revieworder") ? 
              null
              :
              <>
                {/* <p style={{height: '1rem'}}></p> */}
                  <button className='cart-button' onClick={!modalIsOpen? openModal : closeModal}><AiOutlineShoppingCart /></button>
              </>
              }
              </div>
              <p className='greeting'>Hey, {localUser}!</p>
            </>
          : null 
          } 
        </div>
      </div>
      <Modal 
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className={"CartModal"}
      overlayClassName='CartOverlay'
      portalClassName="ModalPortal"
      contentLabel="CartModal"
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
          editTrigger={editTrigger}
          setEditTrigger={setEditTrigger}
        />
      </Modal>
    </>
  )
}

export default Header