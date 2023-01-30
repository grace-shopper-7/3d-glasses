import { useState } from "react"
import { IoIosArrowDown } from 'react-icons/io';
import { IoTrashOutline } from 'react-icons/io5';


const CartItems = ({cartItem, cart, setCart}) => {
    const [isOpen, setIsOpen] = useState(false)
    const handleClick = () => {
        setIsOpen(!isOpen)
    }
    const [counter, setCounter] = useState(1);
    const incrementCounter = () => setCounter(counter + 1)
    let decrementCounter = () => setCounter(counter - 1)
    if(counter<=1) {
        decrementCounter=()=>setCounter(1)
    }
    const handleDelete = (e) => {
         setCart((current) => 
         current.filter((product) => product.id !== e.id)
         )
    }
    return(
        <div className="cart-item">       
        <b>{cartItem.details.name}</b>
        <button onClick={handleDelete}><IoTrashOutline /></button>
        <div className="quantity"><p>qty: {cartItem.quantity}</p>
        <button onClick={incrementCounter}>+</button> <button onClick={decrementCounter}>-</button>
        </div>
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