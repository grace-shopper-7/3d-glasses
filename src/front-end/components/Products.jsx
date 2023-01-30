import React, { useEffect, useState } from "react";
import { fetchDummyProducts, fetchProducts, fetchDummyCartBySession } from "../api/fetch"
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
                        <img src={product.photoURL} height="200px" alt="Photo of glasses" />
                        <br />
                        <div>
                        <b>{product.name} | ${product.price}</b> 
                        <button className="add-to-cart">Add To Cart</button>
                        </div>
                        <p>{product.description} </p>
                    </div>)
                })}
            <p>Helloworld</p>
        </div>
        )
}

export default Products