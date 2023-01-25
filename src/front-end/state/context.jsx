import { createContext, useContext } from "react";
import { useImmerReducer } from "use-immer";
import { userInitState, userReducer, productsInitState, productReducer, cartInitState, cartReducer, ordersInitState, orderReducer } from "./reducers";

const UserContext = createContext(userInitState)
const ProductsContext = createContext(productsInitState)
const CartContext = createContext(cartInitState)
const OrderContext = createContext(ordersInitState)

export const useUser = () => {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error("useUser must be used within UserContext")
    }
    return context
}

export const useProducts = () => {
    const context = useContext(ProductsContext)
    if (context === undefined) {
        throw new Error("useProducts must be used within ProductsContext")
    }
    return context
}

export const useCart = () => {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error("useCart must be used within CartContext")
    }
    return context
}

export const useOrder = () => {
    const context = useContext(OrderContext)
    if (context === undefined) {
        throw new Error("useOrder must be used within OrderContext")
    }
    return context
}
export const ProductsProvider = ({children}) => {
    const [state, dispatch] = useImmerReducer(productReducer, productsInitState)

    const populateProducts = (productList) => {
        dispatch({
            type: 'populate_products',
            payload: productList
        })
    }

    const addProduct = (product) => {
        dispatch({
            type: 'add_product',
            payload: product
        })
    }

    const removeProduct = (productId) => {
        dispatch({
            type: 'remove_product',
            payload: productId
        })
    }

    // Revisit "edit product listing" functionality

    const addReview = (review, productId) => {
        dispatch({
            type: 'add_review',
            payload: {
                review: review,
                productId: productId
            }
        })
    }

    // Revisit "edit review" functionality

    const removeReview = (reviewId, productId) => {
        dispatch({
            type: 'remove_review',
            payload: {
                reviewId: reviewId,
                productId: productId
            }
        })
    }

    const value = {
        products: state.products,
        reviews: state.reviews,
        populateProducts,
        addProduct,
        removeProduct,
        addReview,
        removeReview
    }
    return <ProductsContext.Provider value = {value}>{children}</ProductsContext.Provider>
}

export const UserProvider = ({children}) => {
    const [state, dispatch] = useImmerReducer(userReducer, userInitState)

    const setUser = (user) => {
        dispatch({
        type: 'set_user',
        payload: user
        })
    }

    const setToken = (token) => {
        dispatch({
        type: 'set_token',
        payload: token
        })
    }

    const value = {
        user: state.user,
        token: state.token,
        setUser,
        setToken
    }
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

// Revisit: Add case for adjusting quantity of specific item(s) in cart
export const CartProvider = ({children}) => {
    const [state, dispatch] = useImmerReducer(cartReducer, cartInitState)

    const addItem = (cartItem) => {
        dispatch({
            type: 'add_item_to_cart',
            payload: cartItem
        })
    }

    const removeItem = (cartItemId, qty) => {
        dispatch({
            type: 'remove_item_from_cart',
            payload: {
                id: cartItemId,
                qty: qty
            }
        })
    }

    const value = {
        cart: state.cart,
        itemCount: state.itemCount,
        addItem,
        removeItem
    }
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const OrderProvider = ({children}) => {
    const [state, dispatch] = useImmerReducer(orderReducer, orderInitState)

    const populateOrders = (orders) => {
        dispatch({
            type: 'populate_orders',
            payload: orders
        })
    }

    const placeOrder = (order) => {
        dispatch({
            type: 'place_order',
            payload: order
        })
    }

    const populateOrderLines = (lines) => {
        dispatch({
            type: 'populate_order_lines',
            payload: lines
        })
    }

    const value = {
        orders: state.orders,
        lines: state.lines,
        populateOrders,
        placeOrder,
        populateOrderLines
    }
    return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}