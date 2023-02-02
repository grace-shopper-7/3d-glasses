import React, { useState } from "react";
import { postProduct } from "../api/fetch";

const AddProduct = ({ token, editTrigger, setEditTrigger, user }) => {
    const [ addProduct, setAddProduct ] = useState(0);
    const [ productName, setProductName ] = useState("");
    const [ productDesc, setProductDesc ] = useState("");
    const [ productSKU, setProductSKU ] = useState("");
    const [ productPrice, setProductPrice ] = useState(0);
    const [ productPhoto, setProductPhoto ] = useState("");
    
    return(
        <div className="add-product-form">
            { (!addProduct) &&
                <form className="add-product-form" onSubmit={async (e) => {
                    e.preventDefault();
                    setAddProduct(1);
                }}>
                    <button type="submit">Add Product</button>
                </form>
            }
            { (addProduct) &&
                <div>
                <form className="add-product-form" onSubmit={async (e) => {
                    e.preventDefault();
                    const newProduct = await postProduct(productName, productDesc, productSKU, productPrice, productPhoto, token);
                    console.log("New Product created:", newProduct);
                    if (editTrigger) {
                        setEditTrigger(false)
                    } else {
                        setEditTrigger(true)
                    };
                    setAddProduct(0);
                    setProductName("")
                    setProductDesc("");
                    setProductSKU("");
                    setProductPrice(0);
                    setProductPhoto("");
                }}>
                    <label className="postLabel" htmlFor='productName'>Product Name:</label>
                    <input className="input" type='text' name='productName' value={productName} onChange={(event) => setProductName(event.target.value)} />
                    <label className="postLabel" htmlFor='productDesc'>Product Description:</label>
                    <input className="input" type='text' name='productDesc' value={productDesc} onChange={(event) => setProductDesc(event.target.value)} />
                    <label className="postLabel" htmlFor='productSKU'>Product SKU:</label>
                    <input className="input" type='text' name='productSKU' value={productSKU} onChange={(event) => setProductSKU(event.target.value)} />
                    <label className="postLabel" htmlFor='productPrice'>Product Price:</label>
                    <input className="input" type='text' name='productPrice' value={productPrice} onChange={(event) => setProductPrice(event.target.value)} />
                    <label className="postLabel" htmlFor='productPhoto'>Product PhotoURL:</label>
                    <input className="input" type='text' name='productPhoto' value={productPhoto} onChange={(event) => setProductPhoto(event.target.value)} />
                    <p></p>
                    <button type="submit">Submit New Product</button>
                </form>
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    setAddProduct(0);
                }}>
                    <button type="submit">Cancel</button>
                </form>
                </div>
            }
        </div>
        )
}

export default AddProduct