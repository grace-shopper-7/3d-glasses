import React, { useEffect, useState } from "react";
import { deleteProduct, fetchProducts, patchCartItem, patchProduct, postItemToCart } from "../api/fetch"
import AddProduct from "./AddProduct";
import "./styles/Products.css";


const Products = ({ token, sessionId, editTrigger, setEditTrigger, cart, user, productList, setProductList }) => {
    // const [ productList, setProductList ] = useState([]);
    const [ productId, setProductId ] = useState(0);
    const [ errorMessage, setErrorMessage ] = useState("");
    const [ searchTerm, setSearchTerm ] = useState('');

    const [ editId, setEditId ] = useState(0);
    const [ deleteId, setDeleteId ] = useState(0);
    const [ newName, setNewName ] = useState("");
    const [ newDesc, setNewDesc ] = useState("");
    const [ newPrice, setNewPrice ] = useState(null);
    const [ newPhoto, setNewPhoto ] = useState("");

    useEffect(() => {
        const getProducts = async () => {
        const products = await fetchProducts()
        setProductList(products)
        }
        getProducts()
    }, [editTrigger]);

    const handleSubmit = async (productId) => {
        if (token) {
            let quantity = 1;
            let newItem = await postItemToCart( token, sessionId, productId, quantity)
            console.log(token, sessionId, productId, quantity)
            console.log("newItem", newItem)
            if (newItem.error) {
                let searchItems = cart.filter((cartItem) => cartItem.productId === productId);
                let updatedItem = await patchCartItem((searchItems[0].quantity+1), searchItems[0].id, token);
                console.log(updatedItem)
                if (editTrigger) {
                    setEditTrigger(false);
                } else {
                    setEditTrigger(true);
                }
            }
        } else {
            setErrorMessage("You must be logged in to add product to cart.")
        }
    }

    const filteredProducts = productList?.filter(product => product.name.toLowerCase()
    .includes(searchTerm.toLowerCase()));

    return(
        <div>
            <p className="productsTitle">Products</p>
            <input
                className="search"
                placeholder="Search Glasses By Name"
                value={searchTerm}
                type="text"
                onChange={(e) => setSearchTerm(e.target.value)}
            ></input>
            { (user.id === 1) &&
            <AddProduct token={token} editTrigger={editTrigger} setEditTrigger={setEditTrigger} user={user} />
            }
            <div className="allProducts">
            {filteredProducts.map((product) => {

                return (
                    <div className="products" key={product.id}>
                        <div className="product-image">
                            <img src={product.photoURL} width="100%" alt="Photo of glasses" />
                        </div>
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
                            }}
                            >
                            <button value={product.id} className="productButton" type="submit">Add To Cart</button>
                            </form>
                            { (errorMessage && (productId === product.id)) &&     
                            <p>{errorMessage}</p>
                            }
                            <p >{product.description} </p>
                        </div>
                        {/* - - - - - - - - - - - - - - EDIT PRODUCT BUTTON HERE - - - - - - - - - - - - - - */}
                        { ((product.id != editId) && (user.id === 1)) &&
                            <form className="edit-product-form" onSubmit={async (e) => {
                                e.preventDefault();
                                setEditId(product.id);
                                setNewName(product.name);
                                setNewDesc(product.description);
                                setNewPrice(product.price);
                                setNewPhoto(product.photoURL);
                                setDeleteId(0);
                            }}>
                                <button type="submit" className="productButton">Edit Product</button>
                            </form>
                        }
                        { ((product.id === editId) && (user.id === 1)) &&
                            <form className="edit-product-form" onSubmit={async (e) => {
                                e.preventDefault();
                                const editedProduct = await patchProduct(product.id, newName, newDesc, newPrice, newPhoto, token);
                                if (editTrigger) {
                                    setEditTrigger(false)
                                } else {
                                    setEditTrigger(true)
                                };
                                setEditId(0);
                            }}>
                                <label className="postLabel" htmlFor='newName'>New Name:</label>
                                <br/>
                                <input className="input" type='text' name='newName' value={newName} onChange={(event) => setNewName(event.target.value)} />
                                <br/>
                                <label className="postLabel" htmlFor='newDesc'>New Description:</label>
                                <br/>
                                <input className="input" type='text' name='newDesc' value={newDesc} onChange={(event) => setNewDesc(event.target.value)} />
                                <br/>
                                <label className="postLabel" htmlFor='newPrice'>New Price:</label>
                                <br/>
                                <input className="input" type='text' name='newPrice' value={newPrice} onChange={(event) => setNewPrice(event.target.value)} />
                                <br/>
                                <label className="postLabel" htmlFor='newPhoto'>New PhotoURL:</label>
                                <br/>
                                <input className="input" type='text' name='newPhoto' value={newPhoto} onChange={(event) => setNewPhoto(event.target.value)} />
                                <br/>
                                <button type="submit">Submit Changes</button>
                            </form>
                        }
                        {/* - - - - - - - - - - - - - - DELETE PRODUCT BUTTON HERE - - - - - - - - - - - - - - */}
                        { ((product.id != deleteId) && (user.id === 1)) &&
                            <form onSubmit={async (e) => {
                                e.preventDefault();
                                setDeleteId(product.id);
                                setEditId(0);
                            }}>
                                <button type="submit" className="productButton">Delete Product</button>
                            </form>
                        }
                        { ((product.id === deleteId) && (user.id === 1)) &&
                            <div className="delete_checker">
                                <p>Are you sure you would like to delete {product.name}?</p>
                                <p>This will remove said product from everyone's shopping carts and cannot (easily) be undone!</p>
                                <form onSubmit={async (e) => {
                                    e.preventDefault();
                                    const deletedProduct = await deleteProduct(product.id, token);
                                    if (editTrigger) {
                                        setEditTrigger(false)
                                    } else {
                                        setEditTrigger(true)
                                    };
                                    setDeleteId(0);
                                }}>
                                    <button type="submit">Yes I'm Sure</button>
                                </form>
                                <form onSubmit={async (e) => {
                                    e.preventDefault();
                                    if (editTrigger) {
                                        setEditTrigger(false)
                                    } else {
                                        setEditTrigger(true)
                                    };
                                    setDeleteId(0);
                                }}>
                                    <button type="submit">No, take me back</button>
                                </form>
                            </div>
                        }
                    </div>)
                })}
                </div>
        </div>
        )
}

export default Products