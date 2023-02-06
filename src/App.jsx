import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import { fetchMe } from './front-end/api/auth';
import Home from './front-end/components/Homepage';
import Header from './front-end/components/Header';
import Profile from './front-end/components/Profile';
import Products from './front-end/components/Products';
import ReviewOrder from './front-end/components/ReviewOrder';
import OrderComplete from './front-end/components/OrderComplete';
import Navbar from './front-end/components/Navbar';
import AuthForm from './front-end/components/AuthForm';
import AdminPage from './front-end/components/AdminPage';
import Carousel from './front-end/components/Carousel'


function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [persInfo, setPersInfo] = useState({})
  const [sessionId, setSessionId] = useState(0);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [newOrder, setNewOrder] = useState({})
  const [newLines, setNewLines] = useState([])
  const [editTrigger, setEditTrigger] = useState(false);
  const [orderPayment, setOrderPayment] = useState({})
  const [shippingAddress, setShippingAddress] = useState("")
  // REVISIT: you're calling fetchMe() without a token and then
  // saying fetchMe() needs a token on auth.js

  // useEffect(() => {
  //   if(!user) {
  //     const getMe = async () => {
  //       const response = await fetchMe(token);
  //       const user = await response;
  //       setUser(user)
  //       console.log("USER HERE: ", user)
  //     }
  //     getMe()
  //   }
  // }, [user])

  // Unsure of how to console.log the token/user data, so if this code looks wrong feel free to delete as I can't
  // tell if lines 37-62 are working as intended.
  useEffect(()=>{
    const getPreviousData = async () => {
      if (localStorage.token && !token) {
        setToken(localStorage.token);
      };
      if (localStorage.sessionId && !sessionId) {
        setSessionId(localStorage.sessionId);
      };
    }
    getPreviousData();
  }, []);

  useEffect(()=>{
    const getUserData = async () => {
      if (token) {
        const userData = await fetchMe(token);
        setUser(userData);
        console.log("Token, sessionId, user:", token, sessionId, user);
      }
    }
    getUserData();
  }, [token]);
  
  // useEffect(()=>{
  //   if (!token && !user) {
  //     // Guest Check-in time
  //     const guestCheckIn = async () => {
  //       const response = await guestLogin();
  //       console.log("User/Token:", user, token);
  //       setUser(response.user.id);
  //       setToken(response.token);
  //       // On a normal login we'd want the userId/token to go into localstorage,
  //       // but we don't want to persist a "guest" login, just their cart data.
  //     }
  //     guestCheckIn();
  //   } else if (!token) {
  //     // go get the user field
  //   } else if (!user) {
  //     // go get the token
  //   }
  // },[]); // Blank array ensures the "Guest Check-in" only happens when someone first loads/visits the page.

  return (
    <div className="App" >
      <Header 
        token={token} 
        setToken={setToken} 
        user={user} 
        setUser={setUser} 
        sessionId={sessionId}
        setSessionId={setSessionId}
        cart={cart}
        setCart={setCart} 
        totalPrice={totalPrice}
        setTotalPrice={setTotalPrice}
        editTrigger={editTrigger}
        setEditTrigger={setEditTrigger}
      />
      <Navbar token={token} user={user} cart={cart} setCart={setCart}/>
      <div className='mainBody'>
        <Routes>
          <Route path='/' 
            element={<Home user={user}/>}
          />
          {!token &&
          <Route 
            path='/loginregister' 
            element={<AuthForm 
                      setUser={setUser} 
                      setToken={setToken} 
                      setSessionId={setSessionId} 
                      user={user} 
                      token={token} 
                    />}/>
          }
          {token &&
          <Route path='/profile' element={<Profile setUser={setUser} user={user} token={token} persInfo={persInfo} setPersInfo={setPersInfo}/>}/>
          }
         
          <Route path='/revieworder' element={<ReviewOrder user={user} newLines={newLines} setNewLines={setNewLines} persInfo={persInfo} setPersInfo={setPersInfo} shippingAddress={shippingAddress} setShippingAddress={setShippingAddress} orderPayment={orderPayment} setOrderPayment={setOrderPayment} newOrder={newOrder} setNewOrder={setNewOrder} token={token} cart={cart} totalPrice={totalPrice} setTotalPrice={setTotalPrice}/>}/>

          <Route 
            path='/products' 
            element={<Products 
                      token={token} 
                      sessionId={sessionId} 
                      editTrigger={editTrigger} 
                      setEditTrigger={setEditTrigger}
                      cart={cart} 
                      user={user}
                    />}/>
         
          <Route path='/ordercomplete' element={<OrderComplete newLines={newLines} setNewLines={setNewLines} token={token} sessionId={sessionId} editTrigger={editTrigger} setEditTrigger={setEditTrigger} shippingAddress={shippingAddress} setShippingAddress={setShippingAddress} orderPayment={orderPayment} setOrderPayment={setOrderPayment} newOrder={newOrder} setNewOrder={setNewOrder} cart={cart} setCart={setCart} totalPrice={totalPrice} setTotalPrice={setTotalPrice}/>}/>
          { (token && user.id === 1) &&
          <Route path='/admin' element={<AdminPage token={token} />} />
          }
        </Routes>
      </div>
    </div>
  )
}

export default App
