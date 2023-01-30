import { useState } from "react"
import { useEffect } from "react"
import { fetchProducts } from "../api/fetch"
import SingleProduct from "./SingleProduct"


const Products = () => {
    const [productList, setProductList] = useState([])
    useEffect(() => {
        const getProducts = async () => {
        const products = await fetchProducts()
        console.log(products)
        setProductList(products)
        }
        getProducts()
        console.log(productList)
    }, [])
    return(
        <div>
            <p>Products</p>
        {productList.map((product) => {
            return (
                <div className="products" key={product.id}>
                <SingleProduct product={product} products={productList} />
                </div>)
            })}
        </div>
        )
}

export default Products