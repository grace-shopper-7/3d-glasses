import { NavLink } from "react-router-dom"
import { fetchCartBySession, fetchDummyCartBySession, fetchSessionByUser } from "../api/fetch"
import CartItems from "./CartItems"
import { useState } from "react"
import { useCart } from "../state/context"
import { useEffect } from "react"

//PRODUCT DETAILS FOR PRICE, ID, QTY
const Cart = ({closeModal, sessionId, token, cart, setCart, totalPrice, setTotalPrice}) => {

    useEffect(() => {
        const getCartItems = async () => {
            console.log(sessionId);
            const cartItems = await fetchCartBySession(sessionId, token);
            console.log(cartItems);
            setCart(cartItems);
        }
        getCartItems();
        console.log(cart);
    }, [])

    let interimPrice = (+totalPrice);

    if (cart?.length > 0)  {
        for (let i = 0; i < cart.length; i++) {
            let itemPrice = (+cart[i].price * cart[i].quantity);
            interimPrice += itemPrice;
            console.log(interimPrice);
        };
        return (
            <div className="shopping-cart">
                <p>Your Shopping Cart</p> 
                {cart?.map((cartItem) => {
                    return (
                    <div className="cart-items" key={cartItem.id}>
                        <CartItems cartItem={cartItem} cart={cart} setCart={setCart} token={token}/>
                    </div>)
                })}
                <b>Total: ${interimPrice}</b>
                <NavLink to={"/revieworder"}><button className="checkout-button" onClick={closeModal}>Review Order</button></NavLink>
            </div>
        )
    } else {
        return (
            <div className="shopping-cart">
                <p>Your Shopping Cart Is Empty</p>
            </div>
        )
    }
}

// Revisit: have the onClick for the "Review Order" button also run the "setTotalPrice" function so we can use it elsewhere 

export default Cart