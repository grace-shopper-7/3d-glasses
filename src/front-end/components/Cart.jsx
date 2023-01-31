import { NavLink } from "react-router-dom"
import { fetchCartBySession, fetchDummyCartBySession, fetchSessionByUser } from "../api/fetch"
import CartItems from "./CartItems"
import { useState } from "react"
import { useCart } from "../state/context"
import { useEffect } from "react"

//PRODUCT DETAILS FOR PRICE, ID, QTY
const Cart = ({closeModal, sessionId, token, cart, setCart}) => {

    useEffect(() => {
        const getCartItems = async () => {
            const cartItems = await fetchCartBySession(sessionId, token)
            console.log(cartItems)
            setCart(cartItems)
        }
        getCartItems();
        console.log(cart);
    }, [])

    if (cart?.length > 0)  {
         let total = cart
         .map((orderItem) => {
             return orderItem.price;})
         .reduce((a, b) => {
             return a + b;
           }, )
    return (
        <div className="shopping-cart">
            <p>Your Shopping Cart</p> 
            {cart?.map((cartItem) => {
                return (
                <div className="cart-items" key={cartItem.id}>
                    <CartItems cartItem={cartItem} cart={cart} setCart={setCart}/>
                </div>)
            })}
            <b>Total: ${total}</b>
            <NavLink to={"/revieworder"}><button className="checkout-button" onClick={closeModal}>Review Order</button></NavLink>
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

export default Cart