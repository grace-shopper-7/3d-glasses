import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import { fetchMe, guestLogin } from './front-end/api/auth';
import Home from './front-end/pages/Homepage';
import Header from './front-end/components/Header';
import AuthPage from './front-end/pages/AuthPage';
import Profile from './front-end/pages/Profile';
import OrderHistory from './front-end/pages/OrderHistory';
import Products from './front-end/pages/Products';
import ReviewOrder from './front-end/pages/ReviewOrder';
import Checkout from './front-end/pages/Checkout';
import OrderComplete from './front-end/pages/OrderComplete';
import Navbar from './front-end/components/Navbar';

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});

  // REVISIT: you're calling fetchMe() without a token and then
  // saying fetchMe() needs a token on auth.js

  useEffect(() => {
    if(!user) {
      const getMe = async () => {
        const response = await fetchMe();
        const user = await response;
        setUser(user)
        console.log("USER HERE: ", user)
      }
      getMe()
    }
  }, [user])

  // Unsure of how to console.log the token/user data, so if this code looks wrong feel free to delete as I can't
  // tell if lines 37-62 are working as intended.
  // if (localStorage.token && !token) {
  //   setToken(localStorage.token);
  // };

  // if (localStorage.user && !user) {
  //   setUser(localStorage.user);
  // };

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
      <Header token={token} setToken={setToken} user={user} setUser={setUser}/>
      <Navbar token={token} />
      <div className='mainBody'>
        <Routes>
          <Route path='/' 
            element={<Home />}
          />
          {!token &&
          <Route path='/loginregister' element={<AuthPage />}/>
          }
          {token &&
          <Route path='/profile' element={<Profile />}/>
          }
          {token &&
          <Route path='/profile/myorders' element={<OrderHistory />}/>
          }
          <Route path='/products' element={<Products />}/>
          <Route path='/revieworder' element={<ReviewOrder />}/>
          <Route path='/checkout' element={<Checkout />}/>
          <Route path='/ordercomplete' element={<OrderComplete />}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
