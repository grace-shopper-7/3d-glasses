import { fetchOrdersByUser, fetchOrderLinesByOrderId, fetchFullOrdersByUser } from "../api/fetch";
import { fetchMe } from "../api/auth";
import { useEffect, useState } from "react";

const OrderHistory = ({user, token}) => {
const [userOrders, setUserOrders] = useState([])
const [userOrderLines, setUserOrderLines] = useState([])

useEffect(()=> {
    const processOrders = async() => {
        const user =await fetchMe(token)
        const orders = await fetchFullOrdersByUser(user.id, token)
        console.log("useEffect orders:", orders)
        let filteredOrders = orders.filter(order => order.userId === user.id)
        setUserOrders(filteredOrders)
        // console.log(orders)
        //     if(orders)
        //         for (let order of orders) {
        //             let orderLines = await fetchOrderLinesByOrderId(order.id, token)
        //             userOrderLines.push(orderLines)}
        //             console.log(userOrderLines)
        //         }
    } 
    processOrders()
    console.log("User Orders:" ,userOrders)
}, [])

return ( 
    <div> 
            <h3>Your Orders:</h3>
            {userOrders.length? 
            <div className='order-history'>
                {userOrders?.map ( (order) => {
                    // const newLines = await fetchOrderLinesByOrderId(order.id, token)
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
                                    console.log("line", line)
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