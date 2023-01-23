const Cart = ({closeModal}) => {
    return (
        <div>
            <p>this the cart </p>
            <button type="submit" onClick={async () => {closeModal()}}>CLOSE</button>
        </div>
    )
}

export default Cart