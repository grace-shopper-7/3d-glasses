import { fetchFullOrdersByUser } from "../api/fetch";
import { fetchMe } from "../api/auth";
import { useEffect, useState } from "react";

const OrderHistory = ({user, token}) => {
const [userOrders, setUserOrders] = useState([])

useEffect(()=> {
    const processOrders = async() => {
        const user =await fetchMe(token)
        const orders = await fetchFullOrdersByUser(user.id, token)
        let filteredOrders = orders.filter(order => order.userId === user.id)
        setUserOrders(filteredOrders)
    } 
    processOrders()
}, [])

return ( 
    <div> 
            <h3>Your Orders:</h3>
            {userOrders.length? 
            <div className='order-history'>
                {userOrders?.map ( (order) => {
                    let yr = order.createdAt.slice(0, 4)
                    let mn = order.createdAt.slice(5, 7)
                    let day = order.createdAt.slice(8, 10)

                    return(
                        <div key={order.id} className='history-order'>
                            <p>TOTAL: ${order.amount}</p>
                            <p>ORDER PLACED: {mn}/{day}/{yr}</p>
                            <div>
                                <ol>
                                {order.productDetails.map(line => {
                                    if (line?.orderId === order.id) {
                                    return (
                                        <li key={line.id}>
                                        <div className="order-line" >
                                            <div>
                                                <b>{line.name}</b>
                                                <p>${line.price}</p>
                                                <p>qty: {line.quantity}</p>
                                            </div>
                                            <img src={line.photoURL} width="50" alt="Photo of glasses" />
                                        </div>
                                        </li>
                                    )
                                    }}
                                )}
                                </ol>
                            </div>
                        </div>
                    )
                })}
            </div>
            :
            <div>
                <p>No orders placed</p>
            </div>}
        </div> 
    )
}

export default OrderHistory