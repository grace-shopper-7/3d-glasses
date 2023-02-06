import { useState } from "react"
import { IoTrashOutline } from 'react-icons/io5';
import { deleteCartItem, patchCartItem } from "../api/fetch";


const CartItems = ({cartItem, token, editTrigger, setEditTrigger}) => {
    const [editId, setEditId] = useState(0);
    const [newQty, setNewQty] = useState(0);

    const handleSubmit = async () => {
        const response = await patchCartItem(newQty, editId, token);
        setEditId(0);
        setNewQty(0);
    }

    const handleDelete = async () => {
        const deletedCartItem = await deleteCartItem(token, cartItem.id);
        if (editTrigger) {
            setEditTrigger(false);
        } else {
            setEditTrigger(true);
        }
    }

    return(
        <div className="cart-item">       
            <b>{cartItem.name}</b>
            <button onClick={handleDelete}><IoTrashOutline /></button>
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
                    <input className="quantity-field" min='1' type='number' name='newQuantity' value={newQty} onChange={(event) => setNewQty(event.target.value)} />
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
            <p>${cartItem.price}</p>
        </div>
    )
}

export default CartItems