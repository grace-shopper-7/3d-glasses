import { useState } from "react"
import { IoIosArrowDown } from 'react-icons/io';
import {useLocation} from 'react-router-dom'
const OrderLine = ({cartItem, cart}) => {
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()
    const handleClick = () => {
        setIsOpen(!isOpen)
    }
    // const handleDelete = () => {
    //     const filteredCart = cart.order_items.filter(item => 
    //         item.id !== id)
    //     return filteredCart
    // }
    // let itemID = cartItem.id
    return(
        <div className="cart-item">  
        <img src={cartItem.photoURL} height="100px" alt="Photo of glasses" />     
        <b>{cartItem.name}</b>
        {/* <button onClick={handleDelete}>Delete</button> */}
        {location.pathname.includes("ordercomplete")
        ? null
        :
            <div>
                <p>qty: {cartItem.quantity}</p>
                <button onClick={handleClick}><IoIosArrowDown /></button>
                {isOpen ? 
                    <div>
                        {cartItem.description}
                    </div>
                :
                null}
            </div>
        }
        <p>${cartItem.price}</p>
        </div>
    )
}

export default OrderLine