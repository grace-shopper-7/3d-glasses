// orderSummary
import { NavLink } from "react-router-dom"
import { fetchCartBySession, postOrder, postOrderLine, postPaymentDetails } from "../api/fetch"
import CartItems from "./CartItems"
import OrderLine from "./OrderLine"
import "./styles/ReviewOrder.css"
import { useState, useRef } from "react"
import { IoIosArrowDown } from 'react-icons/io'
import { patchUser } from "../api/fetch"
import {useNavigate} from 'react-router-dom'


const ReviewOrder = ({cart, token}) => {
  const navigate = useNavigate()
  const [paymentIsOpen, setPaymentIsOpen] = useState(false);
  const [shippingIsOpen, setShippingIsOpen] = useState(false);
  const [differentAdd, setDifferentAdd] = useState(false)
  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const add1Ref = useRef()
  const add2Ref= useRef()
  const cityRef = useRef()
  const stateRef = useRef()
  const zipRef = useRef()
  const telephoneRef = useRef()
  const cvcRef = useRef()
  const ccnRef = useRef()
  const expRef = useRef()
  const billingRef = useRef()
  const nameRef = useRef()
  
  // if (!token) {
  // navigate('/')
  // }
  let total = cart
      .map((orderItem) => {
        return ((+orderItem.price)*(orderItem.quantity))})
        .reduce((a, b) => {
          return a + b;
        }, ) 
  const currentUser = JSON.parse(localStorage.getItem("user"))
  console.log ("currentUser init log: ", currentUser)
  const handleSubmit = async (e) => {
  e.preventDefault()
          try {
            
            const newOrder = await postOrder(token, currentUser.id, total.toFixed(2))
            console.log("the order: ", newOrder)

            const newOrderLines = await Promise.all(
              cart.map(item => 
                postOrderLine(token, item.id, item.quantity))
            )
              console.log("order lines: ", newOrderLines)
              const fullAdd = `${add1Ref.current.value} ${add2Ref?.current.value}, ${cityRef.current.value}, ${stateRef.current.value} ${zipRef.current.value}`
              console.log(fullAdd)
              // const patchBody = {
              //   "firstName": `${}`,
              //   "lastName": `${}`,
              //   "address": `${fullAdd}`,
              //   "telephone": `${}`,
              // }
              // console.log("here is the patch body", patchBody)
              // const patchedUser = await patchUser(firstNameRef.current.value, lastNameRef.current.value, fullAdd, telephoneRef.current.value, currentUser.id, token)
              // console.log("patchedUser: ", patchedUser)
              // if (patchedUser.error){
              // alert("There was an error updating the user!")
              // }else{
              // localStorage.setItem('user', JSON.stringify(patchedUser))
              // }
              
              let billingVar = billingRef.current?.value ? billingRef.current.value : fullAdd
              const newPayment = await postPaymentDetails(token, total.toFixed(2), newOrder.id, ccnRef.current.value, cvcRef.current.value, expRef.current.value, billingVar, nameRef.current.value, currentUser.id)
              console.log("the payment: ", newPayment)
              
              } catch (error) {
                console.error("There was a problem placing your order:", error)
                throw error
              }
            }
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
            <button type="submit" onClick={handleSubmit} form="order-form" className="checkout-button">Place Order</button>
            </aside>
            </div>
            <aside className="checkout-details">
                <div><b>Shipping Address: </b> <button className="arrow-button" onClick={()=> setShippingIsOpen(!shippingIsOpen)}><IoIosArrowDown/></button></div>
                <hr />
                {shippingIsOpen?
              <form id="order-form" onSubmit={handleSubmit}>
                <input ref={firstNameRef} type= "text" placeholder= "First Name "/>
                <input ref={lastNameRef} type= "text" placeholder= "Last Name "/>
                <input ref={add1Ref} type= "text" placeholder= "Address line 1"/>
                <input ref={add2Ref} type= "text" placeholder= "Address line 2"/>
                <input ref={cityRef} type= "text" placeholder= "City"/>
                <input ref={stateRef} type= "text" placeholder= "State"/>
                <input ref={zipRef} type= "number" placeholder= "Zip"/>
                <input ref={telephoneRef} type= "tel" placeholder= "Phone number"/>
              </form>
               : null}
                <div><b>Payment Details: </b> <button className="arrow-button" onClick={()=> setPaymentIsOpen(!paymentIsOpen)}><IoIosArrowDown/></button></div>
                <hr />
                {paymentIsOpen?
              <form>
                <input ref={ccnRef} type= "tel" placeholder= "Card number"/>
                <input ref={cvcRef} type= "tel" placeholder= "CVC "/>
                <input ref={expRef} type= "date" placeholder= "Expiration "/>
                <input ref={nameRef} type= "text" placeholder= "Name on card "/>
                <hr />
                <b>Billing Address: </b>
                <label> Different from shipping<input type="checkbox" onClick={()=> setDifferentAdd(!differentAdd)}/></label>
                {differentAdd?
                <div>
                  <input type= "text" placeholder= "First Name "/>
                  <input type= "text" placeholder= "Last Name "/>
                  <input ref={billingRef} type= "text" placeholder= "Address line 1"/>
                  <input type= "text" placeholder= "Address line 2"/>
                  <input type= "text" placeholder= "City"/>
                  <input type= "text" placeholder= "State"/>
                  <input type= "number" placeholder= "Zip"/>
                  <input type= "tel" placeholder= "Phone number"/>
                </div>
               : null}
              </form>
            : null}
            </aside>
        </div>
    )}


export default ReviewOrder