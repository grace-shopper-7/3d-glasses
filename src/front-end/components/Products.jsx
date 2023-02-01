import React, { useEffect, useState } from "react";
import { fetchProducts, patchCartItem, postItemToCart } from "../api/fetch"
import SingleProduct from "./SingleProduct"


const Products = ({ token, sessionId, editTrigger, setEditTrigger, cart }) => {
    const [ productList, setProductList ] = useState([]);
    const [ newQuantity, setNewQuantity ] = useState(0);
    const [ productId, setProductId ] = useState(0);
    const [ errorMessage, setErrorMessage ] = useState("");
    useEffect(() => {
        const getProducts = async () => {
        const products = await fetchProducts()
        // console.log("UseEffect/FetchProducts:", products)
        setProductList(products)
        }
        getProducts()
        // console.log("UseEffect/ProductList:", productList)
    }, [])

    const handleSubmit = async (productId) => {
        if (token) {
            console.log("Firing postitemtocart!");
            let quantity = 1;
            let newItem = await postItemToCart( token, sessionId, productId, quantity)
            console.log(newItem);
            if (newItem.error) {
                let searchItems = cart.filter((cartItem) => cartItem.productId === productId);
                console.log("SUCCESS", searchItems[0].id);
                let updatedItem = await patchCartItem((searchItems[0].quantity+1), searchItems[0].id, token);
                console.log("EVEN MORE SUCCESS", updatedItem);
                if (editTrigger) {
                    setEditTrigger(false);
                } else {
                    setEditTrigger(true);
                }
            } else {
                console.log("FAILURE");
            }
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
                        <form value={product.id} className="add-to-cart" onSubmit={ async (e) => {
                            e.preventDefault();
                            await handleSubmit(product.id);
                            setProductId(product.id);
                            if (!editTrigger) {
                                setEditTrigger(true)
                            } else {
                                setEditTrigger(false)
                            }
                        }}>
                        <button value={product.id} className="add-to-cart" type="submit">Add To Cart</button>
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