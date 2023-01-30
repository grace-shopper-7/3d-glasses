import React, { useEffect, useState } from "react";
import { fetchDummyProducts, fetchProducts, fetchDummyCartBySession } from "../api/fetch"
import SingleProduct from "./SingleProduct"


const Products = () => {
    const [products, setProducts] = useState([]);
    const [useEffectSetter, setUseEffectSetter] = useState(false);

    useEffect(() => {
        const getProducts = async () => {
            let var1 = await fetchProducts();
            setProducts(var1);
        }

        getProducts();
    }, []);

    // console.log("this is a single product", product)
    const cart = fetchDummyCartBySession()
    // console.log("cart", cart)
    const addToCart = () => {
        cart.order_items.push(product)
        console.log("cart in func", cart)
        return 
    }

    // let products = await fetchProducts();
    // console.log(products);
    return(
        <div>
            <p>Products</p>
            {products?.map((product) => {
                return (
                    <div className="products" key={product.id}>
                        <div>
                            <img src={product.photoURL} height="200px" alt="Photo of glasses" />
                            <br />
                            <div>
                                <b>{product.name} | ${product.price}</b> 
                                <button onClick={addToCart} className="add-to-cart">Add To Cart</button>
                            </div>
                            <p>{product.description} </p>
                        </div>
                    </div>)
            })}
            <p>Helloworld</p>
        </div>
        )
}

export default Products