import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import { fetchMe, guestLogin } from './front-end/api/auth';
import Home from './front-end/components/Homepage';
import Header from './front-end/components/Header';
import Profile from './front-end/components/Profile';
import OrderHistory from './front-end/components/OrderHistory';
import Products from './front-end/components/Products';
import ReviewOrder from './front-end/components/ReviewOrder';
import Checkout from './front-end/components/Checkout';
import OrderComplete from './front-end/components/OrderComplete';
import Navbar from './front-end/components/Navbar';
import AuthForm from './front-end/components/AuthForm';


function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [persInfo, setPersInfo] = useState({})
  const [sessionId, setSessionId] = useState(0);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [newOrder, setNewOrder] = useState({})
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
      if (token && !user) {
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
    <div className="App">
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
      <Navbar token={token} />
      <div className='mainBody'>
        <Routes>
          <Route path='/' 
            element={<Home />}
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
          <Route path='/profile' element={<Profile />}/>
          }
          {token &&
          <Route path='/profile/myorders' element={<OrderHistory />}/>
          }
          <Route path='/revieworder' element={<ReviewOrder persInfo={persInfo} setPersInfo={setPersInfo} shippingAddress={shippingAddress} setShippingAddress={setShippingAddress} orderPayment={orderPayment} setOrderPayment={setOrderPayment} newOrder={newOrder} setNewOrder={setNewOrder} token={token} cart={cart} totalPrice={totalPrice} setTotalPrice={setTotalPrice}/>}/>

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
         
          <Route path='/checkout' element={<Checkout />}/>
          <Route path='/ordercomplete' element={<OrderComplete shippingAddress={shippingAddress} setShippingAddress={setShippingAddress} orderPayment={orderPayment} setOrderPayment={setOrderPayment} newOrder={newOrder} setNewOrder={setNewOrder} cart={cart} setCart={setCart} totalPrice={totalPrice} setTotalPrice={setTotalPrice}/>}/>
          {/* <Route path='/userlist' element={<UserList />} */}
        </Routes>
      </div>
    </div>
  )
}

export default App
