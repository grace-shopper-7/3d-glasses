import { fetchCartBySession, postItemToCart } from "../api/fetch"
import { useCart } from "../state/context"

const SingleProduct = ({ product }) => {
    const addItem = useCart()
    async function addToCart(e) {
        e.preventDefault()   
        const cart = await fetchCartBySession(1)
        const addBody = {
            productId: product.id,
            quantity: product.quantity
        }
        const newItem = await postItemToCart(addBody, cart.id)
        addItem(newItem)
    }
    return (
        <div className="single-product">
            <img src={product.photoURL} height="200px" alt="Photo of glasses" />
            <br />
            <div>
            <b>{product.name} | ${product.price}</b> 
            <button onClick={addToCart} className="add-to-cart">Add To Cart</button>
            </div>
            <p>{product.description} </p>
        </div>
    )
}

export default SingleProduct