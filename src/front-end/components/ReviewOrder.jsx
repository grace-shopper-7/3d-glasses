// orderSummary
import { NavLink } from "react-router-dom"
import { fetchCartBySession } from "../api/fetch"
import CartItems from "./CartItems"
import OrderLine from "./OrderLine"
import "./styles/ReviewOrder.css"
import { useState, useRef } from "react"
import { IoIosArrowDown } from 'react-icons/io'

const ReviewOrder = ({cart}) => {
  const [paymentIsOpen, setPaymentIsOpen] = useState(false);
  const [shippingIsOpen, setShippingIsOpen] = useState(false);
  const [differentAdd, setDifferentAdd] = useState(false);
  // const cvcRef = useRef()
  // const ccnRef = useRef()
  // const expRef = useRef()


  // let paymentObj = {
  //   amount: 0, 
  //   orderId: 0, 
  //   ccn: "", 
  //   cvc: "", 
  //   exp: "", 
  //   billing: "", 
  //   name: "", 
  //   userId: 0 
  // }

    if (cart.length > 0)  {
         let total = cart
         .map((orderItem) => {
             return ((+orderItem.price)*(orderItem.quantity))})
         .reduce((a, b) => {
             return a + b;
           }, )
    return (
        <div className="orderPreview">
            <div>
            <p>Your Shopping Cart</p> 
            {cart.map((cartItem) => {
                return (
                <div className="cart-items" key={cartItem.id}>
                    <OrderLine cartItem={cartItem} cart={cart}/>
                </div>)
            })}
            <aside>
            <b>Subtotal | ${total.toFixed(2)}</b>
            <hr />
            <b>Shipping | Free</b>
            <hr />
            <b>Total ${total.toFixed(2)}</b>
            <NavLink to={"/checkout"}><button className="checkout-button">Place Order</button></NavLink>
            </aside>
            </div>
            <aside className="checkout-details">
                <div><b>Shipping Address: </b> <button className="arrow-button" onClick={()=> setShippingIsOpen(!shippingIsOpen)}><IoIosArrowDown/></button></div>
                <hr />
                {shippingIsOpen?
              <form>
                <input type= "text" placeholder= "First Name "></input>
                <input type= "text" placeholder= "Last Name "></input>
                <input type= "text" placeholder= "Address line 1"></input>
                <input type= "text" placeholder= "Address line 2"></input>
                <input type= "text" placeholder= "City"></input>
                <input type= "text" placeholder= "State"></input>
                <input type= "number" placeholder= "Zip"></input>
                <input type= "tel" placeholder= "Phone number"></input>
              </form>
               : null}
                <div><b>Payment Details: </b> <button className="arrow-button" onClick={()=> setPaymentIsOpen(!paymentIsOpen)}><IoIosArrowDown/></button></div>
                <hr />
                {paymentIsOpen?
              <form>
                <input type= "tel" placeholder= "Card number"></input>
                <input type= "tel" placeholder= "CVC "></input>
                <input type= "date" placeholder= "Expiration "></input>
                <input type= "text" placeholder= "Name on card "></input>
                <hr />
                <b>Billing Address: </b>
                <label> Different from shipping<input type="checkbox" onClick={()=> setDifferentAdd(!differentAdd)}></input></label>
                {differentAdd?
                <div>
                  <input type= "text" placeholder= "First Name "></input>
                  <input type= "text" placeholder= "Last Name "></input>
                  <input type= "text" placeholder= "Address line 1"></input>
                  <input type= "text" placeholder= "Address line 2"></input>
                  <input type= "text" placeholder= "City"></input>
                  <input type= "text" placeholder= "State"></input>
                  <input type= "number" placeholder= "Zip"></input>
                  <input type= "tel" placeholder= "Phone number"></input>
                </div>
               : null}
              </form>
            : null}
            </aside>
        </div>
    )}
    else{
    return (
        <div className="shopping-cart">
            <p>Your Shopping Cart Is Empty</p>
        </div>
    )
    }
}

export default ReviewOrder