import React, { useEffect, useState } from "react";
import { fetchProducts, postItemToCart } from "../api/fetch"
import SingleProduct from "./SingleProduct"


const Products = ({ token, sessionId, editTrigger, setEditTrigger }) => {
    const [ productList, setProductList ] = useState([])
    const [ productId, setProductId ] = useState(0)
    const [ errorMessage, setErrorMessage ] = useState("")
    useEffect(() => {
        const getProducts = async () => {
        const products = await fetchProducts()
        console.log(products)
        setProductList(products)
        }
        getProducts()
        console.log(productList)
    }, [])

    const handleSubmit = async (e) => {
        if (token) {
            let quantity = 1
            await postItemToCart( token, sessionId, productId, quantity)
            setProductId(0)
            
        } else {
            setErrorMessage("You must be logged in to add product to cart.")
        }
    }
    
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
                        <form className="add-to-cart" onSubmit={ async (e) => {
                            e.preventDefault();
                            await handleSubmit(e);
                            setProductId(product.id)
                            if (editTrigger) {
                                setEditTrigger(false)
                            } else {
                                setEditTrigger(true)
                                }
                            }}>
                        <button className="add-to-cart" type="submit">Add To Cart</button>
                        </form>
                        { (errorMessage && (productId === product.id)) &&     
                        <p>{errorMessage}</p>
                        }
                        </div>
                        <p>{product.description} </p>
                    </div>)
                })}
            <p>Helloworld</p>
        </div>
        )
}

export default Products