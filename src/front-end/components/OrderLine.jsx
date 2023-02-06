import { useState } from "react"
import { IoIosArrowDown } from 'react-icons/io';
import {useLocation} from 'react-router-dom'

const OrderLine = ({cartItem, cart}) => {
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()
    const handleClick = () => {
        setIsOpen(!isOpen)
    }
    return(
        <div className="cart-item">  
        <img src={cartItem.photoURL} height="100px" alt="Photo of glasses" />     
        <b>{cartItem.name}</b>
        <p>qty: {cartItem.quantity}</p>
        <p>${cartItem.price}</p>
        </div>
    )
}

export default OrderLine