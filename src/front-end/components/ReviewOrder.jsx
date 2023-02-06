import { fetchCartBySession, postOrder, postOrderLine, postPaymentDetails } from "../api/fetch"
import OrderLine from "./OrderLine"
import "./styles/ReviewOrder.css"
import { useState, useRef } from "react"
import { IoIosArrowDown } from 'react-icons/io'
import {useNavigate, useLocation} from 'react-router-dom'

import "./styles/ReviewOrder.css";


const ReviewOrder = ({setNewLines, persInfo, setPersInfo, shippingAddress, setShippingAddress, orderPayment, setOrderPayment, totalPrice, setTotalPrice, cart, token, newOrder, setNewOrder}) => {
  const navigate = useNavigate()
  const location = useLocation()
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
  const nameRef = useRef()
  const firstBNameRef = useRef()
  const lastBNameRef = useRef()
  const billingAdd1Ref = useRef()
  const billingAdd2Ref = useRef()
  const billingCityRef = useRef()
  const billingStateRef = useRef()
  const billingZipRef = useRef()
  const billingPhoneRef = useRef()
  
  if (!cart.length) {
    navigate('/')
  }
  // {location.pathname.includes("ordercomplete") ? <OrderComplete cart={cart} fullAdd={fullAdd} total={total}/> : null}

  let total = cart
      ?.map((orderItem) => {
        return ((+orderItem.price)*(orderItem.quantity))})
        ?.reduce((a, b) => {
          return a + b;
        }, 0) 
  const currentUser = JSON.parse(localStorage.getItem("user"))
  console.log ("currentUser init log: ", currentUser)
  const handleSubmit = async (e) => {
  e.preventDefault()
          try {
            setTotalPrice(total)

            const freshOrder = await postOrder(token, currentUser.id, total.toFixed(2))
            setNewOrder(freshOrder)

            const newOrderLines = await Promise.all(
              cart.map(async item => 
                {const orderLine = await postOrderLine(token, freshOrder.id, item.productId, item.quantity)
                return orderLine
                })
              )
              setNewLines(newOrderLines)

              const fullAdd = `${add1Ref.current.value} ${add2Ref?.current.value}, ${cityRef.current.value}, ${stateRef.current.value} ${zipRef.current.value}`
              setShippingAddress(fullAdd)
              setPersInfo({
                firstName: firstNameRef.current.value,
                lastName: lastNameRef.current.value,
                address: {
                  add1: add1Ref.current.value,
                  add2: add2Ref.current.value,
                  city: cityRef.current.value,
                  state: stateRef.current.value,
                  zip: zipRef.current.value
                },
                telephone: telephoneRef.current.value
              })
              let billingVar = differentAdd ? `${firstBNameRef?.current.value} ${lastBNameRef?.current.value}, ${billingAdd1Ref?.current.value} ${billingAdd2Ref?.current.value}, ${billingCityRef?.current.value}, ${billingStateRef?.current.value} ${billingZipRef?.current.value}`
              : fullAdd
              const newPayment = await postPaymentDetails(token, total.toFixed(2), freshOrder.id, ccnRef.current.value, cvcRef.current.value, expRef.current.value, billingVar, nameRef.current.value, currentUser.id)
              setOrderPayment(newPayment)
              navigate('/ordercomplete')
              } catch (error) {
                console.error("There was a problem placing your order:", error)
                throw error
              }
            }
    return (
      <div className="orderPreview">
          <p classname="shoppingCartTitle">Your Shopping Cart</p> 
          <div className="entireCart">
            <div className="itemsInCart">
            {cart.map((cartItem) => {
                return (
                  <div className="cart-items" key={cartItem.id}>
                    <OrderLine cartItem={cartItem} cart={cart}/>
                </div>)
            })}
            </div>
            <div className="toTheRight">
                <aside>
                  <b>Subtotal | ${total.toFixed(2)}</b>
                  <hr />
                  <b>Shipping | Free</b>
                  <hr />
                  <b>Total ${total.toFixed(2)}</b>
                  <button type="submit" onClick={handleSubmit} form="order-form" className="checkout-button">Place Order</button>
                </aside>
    
                <aside>
                  <div><b>Shipping Address: </b> <button className="arrow-button" onClick={()=> setShippingIsOpen(!shippingIsOpen)}><IoIosArrowDown/></button></div>
                  <hr />
                  {shippingIsOpen?
                <form id="order-form" onSubmit={handleSubmit}>
                  <input ref={firstNameRef} type= "text" placeholder= "First Name " defaultValue={persInfo?.firstName}/>
                  <input ref={lastNameRef} type= "text" placeholder= "Last Name " defaultValue={persInfo?.lastName}/>
                  <input ref={add1Ref} type= "text" placeholder= "Address line 1" defaultValue={persInfo?.address?.add1}/>
                  <input ref={add2Ref} type= "text" placeholder= "Address line 2" defaultValue={persInfo?.address?.add2}/>
                  <input ref={cityRef} type= "text" placeholder= "City" defaultValue={persInfo?.address?.city}/>
                  <input ref={stateRef} type= "text" placeholder= "State" defaultValue={persInfo?.address?.state}/>
                  <input ref={zipRef} type= "number" placeholder= "Zip" defaultValue={persInfo?.address?.zip}/>
                  <input ref={telephoneRef} type= "tel" placeholder= "Phone number" defaultValue={persInfo?.telephone}/>
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
                  <input ref={firstBNameRef} type="text" placeholder="First Name "/>
                  <input ref={lastBNameRef} type= "text" placeholder="Last Name "/>
                  <input ref={billingAdd1Ref} type="text" placeholder="Address line 1"/>
                  <input ref={billingAdd2Ref} type= "text" placeholder="Address line 2"/>
                  <input ref={billingCityRef} type= "text" placeholder="City"/>
                  <input ref={billingStateRef} type= "text" placeholder="State"/>
                  <input ref={billingZipRef} type= "number" placeholder="Zip"/>
                  <input ref={billingPhoneRef} type= "tel" placeholder="Phone number"/>
                </div>
               : null}
              </form>
            : null}
                  </aside>
            </div>
            </div>
        </div>
    )}


export default ReviewOrder