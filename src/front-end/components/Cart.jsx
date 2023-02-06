import { NavLink } from "react-router-dom"
import { fetchCartBySession } from "../api/fetch"
import CartItems from "./CartItems"
import { deleteCartItem } from "../api/fetch"
import { useEffect } from "react"

//PRODUCT DETAILS FOR PRICE, ID, QTY
const Cart = ({openModal, closeModal, sessionId, token, cart, setCart, totalPrice, setTotalPrice, editTrigger, setEditTrigger}) => {
    

    useEffect(() => {
        const getCartItems = async () => {
            const cartItems = await fetchCartBySession(sessionId, token);
            setCart(cartItems);
        }
        getCartItems();
    }, [editTrigger])

    let interimPrice = 0;

    const handleCartClear = async () => {
        for (let i=0; i<cart.length; i++) {
            deleteCartItem(token, cart[i].id)
        }
        setTotalPrice(0)
        if (editTrigger) {
            setEditTrigger(false);
        } else {
            setEditTrigger(true);
        }
    }
    if (cart?.length > 0)  {
        for (let i = 0; i < cart.length; i++) {
            let itemPrice = (+cart[i].price * cart[i].quantity);
            interimPrice += itemPrice;
        };
        return (
            <div className="shopping-cart">
                <div className="aboveCart">
                    <div className="cart-buttons">
                        <button className="cart-close" onClick={closeModal}>X</button>
                        <button className="clear-cart" onClick={handleCartClear}>Clear Cart</button>
                    </div>
                    <p className="cart-title">Your Shopping Cart</p> 
                </div>
                {cart?.map((cartItem) => {
                    return (
                    <div className="cart-items" key={cartItem.id}>
                        <CartItems 
                            cartItem={cartItem} 
                            cart={cart} 
                            setCart={setCart} 
                            token={token}
                            openModal={openModal}
                            closeModal={closeModal}
                            editTrigger={editTrigger}
                            setEditTrigger={setEditTrigger}
                        />
                    </div>)
                })}
                <b>Total: ${interimPrice.toFixed(2)}</b>
                <NavLink to={"/revieworder"}><button className="checkout-button" onClick={closeModal}>Review Order</button></NavLink>
            </div>
        )
    } else {
        return (
            <div className="aboveCart">
            <button className="cart-close" onClick={closeModal}>X</button>
            <p id='empty-cart'>Your Shopping Cart Is Empty</p>
            </div>
        )
    }
}

// Revisit: have the onClick for the "Review Order" button also run the "setTotalPrice" function so we can use it elsewhere 

export default Cart