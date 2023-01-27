import { fetchDummyCartBySession } from "../api/fetch"

const SingleProduct = ({ product, products }) => {
    console.log("this is a single product", product)
    const cart = fetchDummyCartBySession()
    console.log("cart", cart)
    const addToCart = () => {
        cart.order_items.push(product)
        console.log("cart in func", cart)
        return 
    }
    return (
        <div>
            <img src={product.details.photoURL} height="200px" alt="Photo of glasses" />
            <br />
            <div>
            <b>{product.details.name} | ${product.details.price}</b> 
            <button onClick={addToCart} className="add-to-cart">Add To Cart</button>
            </div>
            <p>{product.details.description} </p>
        </div>
    )
}

export default SingleProduct