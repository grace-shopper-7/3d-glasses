import { fetchOrdersByUser, fetchOrderLinesByOrderId } from "../api/fetch";
import { fetchMe } from "../api/auth";
import { useEffect, useState } from "react";

const OrderHistory = ({token}) => {
const [userOrders, setUserOrders] = useState([])
useEffect(()=> {
    const getMyOrders = async() => {
    const user =await fetchMe(token)
    const myOrders = await fetchOrdersByUser(user.id, token)
    // console.log("user id", user.id)
    // console.log(myOrders)
    setUserOrders(myOrders)
    const myOrderLines = await Promise.all(
        userOrders.map((order) => {
            console.log(order.id)
            fetchOrderLinesByOrderId(order.id, token)
        })
        )
        console.log("MyOrderLines", myOrderLines)
}

    getMyOrders()
    // console.log("User Orders:" ,userOrders)
}, [])
    return (
        <div>
            <h3>Your Orders:</h3>
            {userOrders?.map ((order) => {
                let yr = order.createdAt.slice(0, 4)
                let mn = order.createdAt.slice(5, 7)
                let day = order.createdAt.slice(8, 10)
                return(
                    <div>
                        <p>TOTAL: ${order.amount}</p>
                        <p>ORDER PLACED: {mn}/{day}/{yr}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default OrderHistory