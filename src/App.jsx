import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import { fetchMe } from './front-end/api/auth';
import Home from './front-end/pages/Homepage';
import Header from './front-end/components/Header';
import Navbar from './front-end/components/Navbar';

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
          <Route path='/loginregister' />
          }
          {token &&
          <Route path='/profile' />
          }
          {token &&
          <Route path='/profile/myorders' />
          }
          <Route path='/products' />
          <Route path='/revieworder' />
          <Route path='/checkout' />
          <Route path='/ordercomplete' />
        </Routes>
      </div>
    </div>
  )
}

export default App
