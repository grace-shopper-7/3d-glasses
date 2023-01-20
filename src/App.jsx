import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import './App.css';
// import Test from '../front-end/src/components/test'

import Navbar from '../front-end/src/pages/Navbar';
import Home from '../front-end/src/pages/Homepage';

function App() {
  const [token, setToken] = useState(null);

  return (
    <div className="App">
      <header>
        <h1 className="LOGO">3D Glasses</h1>
        <Navbar token={ token }/>
      </header>
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
