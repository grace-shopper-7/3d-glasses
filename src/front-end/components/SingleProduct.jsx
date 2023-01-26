const SingleProduct = ({ product, products }) => {
    console.log("this is a single product", product)
    return (
        <div>
            {/* <img src={product.photoURL} alt="Photo of glasses" /> */}
            <b>{product.name} | {product.price}</b>
            <p>{product.description} </p>
        </div>
    )
}

export default SingleProduct