import { useState } from "react"
import { IoIosArrowDown } from 'react-icons/io';

const CartItems = ({cartItem, cart}) => {
    const [isOpen, setIsOpen] = useState(false)
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
        <b>{cartItem.details.name}</b>
        {/* <button onClick={handleDelete}>Delete</button> */}
        <p>qty: {cartItem.quantity}</p>
        <button onClick={handleClick}><IoIosArrowDown /></button>
        {isOpen ? 
         (
            <div>
                {cartItem.details?.description}
            </div>  
        )
        :
         null
        }
        <p>${cartItem.details?.price}</p>
        </div>
    )
}

export default CartItems