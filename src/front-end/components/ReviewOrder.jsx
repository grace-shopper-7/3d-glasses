// orderSummary
import { NavLink } from "react-router-dom"
import { fetchDummyCartBySession } from "../api/fetch"
import CartItems from "./CartItems"
import OrderLine from "./OrderLine"

const ReviewOrder = () => {
    const cart = fetchDummyCartBySession()
    if (cart.order_items.length > 0)  {
         let total = cart.order_items
         .map((orderItem) => {
             return orderItem.details.price;})
         .reduce((a, b) => {
             return a + b;
           }, )
    return (
        <div className="shopping-cart">
            <div>
            <p>Your Shopping Cart</p> 
            {cart.order_items.map((cartItem) => {
                return (
                <div className="cart-items" key={cartItem.id}>
                    <OrderLine cartItem={cartItem} cart={cart}/>
                </div>)
            })}
            </div>
            <aside>
            <b>Subtotal | ${total}</b>
            <hr />
            <b>Shipping | Free</b>
            <hr />
            <b>Tax | Calculated at checkout</b>
            <hr />
            <b>Total ${total}</b>
            <NavLink to={"/checkout"}><button className="checkout-button">Confirm &#38; Checkout</button></NavLink>
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