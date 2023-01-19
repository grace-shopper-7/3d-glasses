import { createContext, useContext } from "react";
import {useImmerReducer} from "use-immer";
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

    const addReview = (review, productId) => {
        dispatch({
            type: 'add_review',
            payload: {
                review: review,
                productId: productId
            }
        })
    }

    const removeReview = (review, productId) => {
        dispatch({
            type: 'remove_review',
            payload: {
                review: review,
                productId: productId
            }
        })
    }

    const value = {
        products: state.products,
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