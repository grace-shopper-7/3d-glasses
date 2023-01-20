import { useEffect } from "react";
import { useCart } from "../state/context";

const Test = () => {
    const {cart, addItem} = useCart();

    const {goofyGlassesCartItem} = {id: 1, name: 'Goofy Glasses', price: 4.99, qty: 3}

    try {
        useEffect(() => {
            addItem(goofyGlassesCartItem);
        }, []);
    } catch (error) {
        console.error(error);
    };

    return (
        <div>
            <h1>{cart[0].name}</h1>
            <p>{cart[0].id}</p>
            <p>{cart[0].price}</p>
        </div>
    );
    
    // async function addTestItem() {
    //     const {cart, addItem} = useCart();
    
    //     const goofyGlassesCartItem = {id: 1, name: 'Goofy Glasses', price: 4.99, qty: 3}
        
    //     const newCart = await addItem(goofyGlassesCartItem);
    
    //     console.log(newCart);
    //     return newCart;
    // }
    
    // addTestItem();
    // return;
}

export default Test;