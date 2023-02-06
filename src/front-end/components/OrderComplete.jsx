import { useEffect } from "react"
import {useNavigate} from 'react-router-dom'
import { deleteCartItem, fetchCartBySession } from "../api/fetch";
import OrderLine from "./OrderLine"
const OrderComplete = ({token, sessionId, editTrigger, shippingAddress, setShippingAddress, orderPayment, setOrderPayment, newOrder, setNewOrder, cart, setCart, totalPrice, setTotalPrice}) => {
    const navigate = useNavigate();
    const handleLeave = async() => {
        setCart([])
        for (let i=0; i<cart.length; i++) {
            deleteCartItem(token, cart[i].id)
        }
        navigate('/')
    }
    useEffect(() => {
        const getCartItems = async () => {
            const cartItems = await fetchCartBySession(sessionId, token);
            setCart(cartItems);
        }
        getCartItems();
    }, [editTrigger])
    let secretCCN = orderPayment.ccn.slice(-4)
    return (
        <div className='order-complete'>
            <h1>Thank you for your purchase!</h1>
            <b>ORDER REVIEW:</b>
            <hr />
            <b>Your Order:</b>
            {cart.map((cartItem) => {
                return (
                <div className="cart-items" key={cartItem.id}>
                    <OrderLine cartItem={cartItem} cart={cart}/>
                </div>)
            })}
            <b>Shipping Address:</b>
            <p>{shippingAddress}</p>
            <b>Total:</b>
            <p>${newOrder.amount}</p>
            <b>Payment Information:</b>
            <p>Card ending in: {secretCCN}</p>
            <p>Name: {orderPayment.name}</p>
            <p>Billing Address: {orderPayment.billing}</p>
            <button onClick={handleLeave}>Back to Home</button>
        </div>
    )
}

export default OrderComplete