import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import { fetchMe } from './front-end/src/api/auth';
import Home from './front-end/src/pages/Homepage';
import Header from './front-end/src/components/Header';
import AuthPage from './front-end/src/pages/AuthPage';
import Profile from './front-end/src/pages/Profile';
import OrderHistory from './front-end/src/pages/OrderHistory';
import Products from './front-end/src/pages/Products';
import ReviewOrder from './front-end/src/pages/ReviewOrder';
import Checkout from './front-end/src/pages/Checkout';
import OrderComplete from './front-end/src/pages/OrderComplete';
function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});
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
