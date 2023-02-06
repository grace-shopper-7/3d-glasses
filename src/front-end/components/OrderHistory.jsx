import { fetchOrdersByUser, fetchOrderLinesByOrderId } from "../api/fetch";
import { fetchMe } from "../api/auth";
import { useEffect, useState } from "react";

const OrderHistory = ({user, token}) => {
const [userOrders, setUserOrders] = useState([])
const [userOrderLines, setUserOrderLines] = useState([])

useEffect(()=> {
    const processOrders = async() => {
    const user =await fetchMe(token)
    const orders = await fetchOrdersByUser(user.id, token)
    console.log(orders)
    if(orders)
    {setUserOrders(orders)
    for (let order of orders) {
        let orderLines = await fetchOrderLinesByOrderId(order.id, token)

        setUserOrderLines([...userOrderLines, ...orderLines])
        console.log(order, "userORderLINES", orderLines)
    }
    }}
    
    processOrders()
    console.log("User Orders:" ,userOrders)
}, [user])

return ( 
    <div> 
            <h3>Your Orders:</h3>
            {userOrders.length? 
            <div>
                {userOrders?.map ( (order) => {
                    // const newLines = await fetchOrderLinesByOrderId(order.id, token)
                    let yr = order.createdAt.slice(0, 4)
                    let mn = order.createdAt.slice(5, 7)
                    let day = order.createdAt.slice(8, 10)

                    return(
                        <div key={order.id}>
                            <p>TOTAL: ${order.amount}</p>
                            <p>ORDER PLACED: {mn}/{day}/{yr}</p>
                            <div>
                                <ol>
                                {userOrderLines.map(line => {
                                    console.log("line", line)
                                    if (line.orderId === order.id) {
                                    return (
                                        <li key={line.id}>
                                        <div >
                                            <div>
                                                <b>{line.name}</b>
                                                <p>${line.price}</p>
                                                <p>{line.quantity}</p>
                                            </div>
                                            <img src={line.photoURL} width="50" alt="Photo of glasses" />
                                        </div>
                                        </li>
                                    )}
                                    // for(let i=0; i<line.length; i++) {
                                    //     // if(order.id === line[i].orderId) {
                                    // return (
                                    //         <li>
                                    //     <div key={line[i].id}>
                                    //         <div>
                                    //             <b>{line[i].name}</b>
                                    //             <p>${line[i].price}</p>
                                    //         </div>
                                    //         <img src={line[i].photoURL} width="50" alt="Photo of glasses" />
                                    //     </div>
                                    //         </li>
                                    }
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