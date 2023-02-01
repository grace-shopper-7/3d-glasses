// orderSummary
import { NavLink } from "react-router-dom"
import { fetchCartBySession } from "../api/fetch"
import CartItems from "./CartItems"
import OrderLine from "./OrderLine"

const ReviewOrder = ({cart}) => {

    if (cart.length > 0)  {
         let total = cart
         .map((orderItem) => {
             return ((+orderItem.price)*(orderItem.quantity))})
         .reduce((a, b) => {
             return a + b;
           }, )
    return (
        <div className="shopping-cart">
            <div>
            <p>Your Shopping Cart</p> 
            {cart.map((cartItem) => {
                return (
                <div className="cart-items" key={cartItem.id}>
                    <OrderLine cartItem={cartItem} cart={cart}/>
                </div>)
            })}
            </div>
            <aside>
            <b>Subtotal | ${total.toFixed(2)}</b>
            <hr />
            <b>Shipping | Free</b>
            <hr />
            <b>Tax | Calculated at checkout</b>
            <hr />
            <b>Total ${total.toFixed(2)}</b>
            <NavLink to={"/checkout"}><button className="checkout-button">Place Order</button></NavLink>
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