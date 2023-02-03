import OrderLine from "./OrderLine"
const OrderComplete = ({shippingAddress, setShippingAddress, orderPayment, setOrderPayment, newOrder, setNewOrder, cart, setCart, totalPrice, setTotalPrice}) => {
    console.log(orderPayment)
    let secretCCN = orderPayment.ccn.slice(-4)
    console.log(secretCCN)
    return (
        <div>
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
        </div>
    )
}

export default OrderComplete