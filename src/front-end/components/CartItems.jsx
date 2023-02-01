import { useEffect } from "react";
import { useState } from "react"
import { IoIosArrowDown } from 'react-icons/io';
import { IoTrashOutline } from 'react-icons/io5';
import { patchCartItem } from "../api/fetch";


const CartItems = ({cartItem, cart, setCart, token, openModal, closeModal, editTrigger, setEditTrigger}) => {
    const [editId, setEditId] = useState(0);
    const [newQty, setNewQty] = useState(0);

    // useEffect(() => {
    //     if (editId && newQty) {
    //         async function newFunc() {
    //             console.log("firing patchCartItem")
    //             const response = await patchCartItem(newQty, editId, token);
    //             console.log("response:", response);
    //         }
    //         newFunc();
    //         setEditId(0);
    //         setNewQty(0);
    //         // closeModal();
    //     }
    // }, []);

    const handleSubmit = async () => {
        console.log("firing patchCartItem")
        const response = await patchCartItem(newQty, editId, token);
        console.log("response:", response);
        setEditId(0);
        setNewQty(0);
    }

    const [isOpen, setIsOpen] = useState(false);
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
            <b>{cartItem.name}</b>
            <button onClick={handleDelete}><IoTrashOutline /></button>
            
                
                {/* <button onClick={incrementCounter}>+</button> <button onClick={decrementCounter}>-</button> */}
                { (editId != cartItem.id) &&
                <div className="quantity">
                    <p>qty: {cartItem.quantity}</p>
                    <form className="edit-quantity-button" onSubmit={async (e) => {
                        e.preventDefault();
                        setEditId(cartItem.id);
                        setNewQty(cartItem.quantity);
                    }}>
                        <button type="submit">Edit Quantity</button>
                    </form>
                </div>
                }
                { (editId === cartItem.id) &&
                <div className="quantity">
                    <input className="quantity-field" type='number' name='newQuantity' value={newQty} onChange={(event) => setNewQty(event.target.value)} />
                    <form className="edit-quantity-button" onSubmit={async (e) => {
                        e.preventDefault();
                        await handleSubmit();
                        if (editTrigger) {
                            setEditTrigger(false);
                        } else {
                            setEditTrigger(true);
                        };
                    }}>
                        <button>Submit</button>
                    </form>
                </div>
                }
            
            <button onClick={handleClick}><IoIosArrowDown /></button>
            {isOpen ? 
            (
                <div>
                    {cartItem.description}
                </div>  
            )
            :
            null
            }
            <p>${cartItem.price}</p>
        </div>
    )
}

export default CartItems