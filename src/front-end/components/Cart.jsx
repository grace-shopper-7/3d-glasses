import { NavLink } from "react-router-dom"
import { fetchDummyCartBySession } from "../api/fetch"
import CartItems from "./CartItems"

//PRODUCT DETAILS FOR PRICE, ID, QTY
const Cart = ({closeModal}) => {
    const cart = fetchDummyCartBySession()
    let total = cart.order_items
    .map((orderItem) => {
        return orderItem.details.price;})
    .reduce((a, b) => {
        return a + b;
      }, )
    console.log(total)
    return (
        cart.order_items.length ?
        <div className="shopping-cart">
            <p>Your Shopping Cart</p> 
            {cart.order_items.map((cartItem) => {
                return (
                <div className="cart-items" key={cartItem.id}>
                    <CartItems cartItem={cartItem} cart={cart}/>
                </div>)
            })}
            <b>Total: ${total}</b>
            <NavLink to={"/checkout"}><button className="checkout-button">Checkout</button></NavLink>
        </div>
        :
        <div className="shopping-cart">
            <p>Your Shopping Cart Is Empty</p>
        </div>
    )
}

export default Cart