import { fetchDummyProducts } from "../api/fetch"
import SingleProduct from "./SingleProduct"


const Products = () => {
    let products = fetchDummyProducts()
    return(
        <div>
            <p>Products</p>
        {products.map((product) => {
            return (
                <div className="products" key={product.id}>
                <SingleProduct product={product} products={products} />
                </div>)
            })}
        </div>
        )
}

export default Products