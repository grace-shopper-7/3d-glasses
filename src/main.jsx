import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import Modal from 'react-modal'
import { CartProvider, OrderProvider, ProductsProvider, UserProvider } from './front-end/state/context'
// import { CartProvider } from '../front-end/src/state/context'

Modal.setAppElement('#root')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <UserProvider> */}
      <ProductsProvider>
         <CartProvider>
        <OrderProvider>
        <App />
        </OrderProvider>
      </CartProvider>
        </ProductsProvider> 
      {/* </UserProvider> */}
    </BrowserRouter>
  </React.StrictMode>,
)
