const express = require('express');
const { getProductsWithoutReviews, getProductById, createProducts, updateProduct, deleteProduct } = require('../db/products');
const productsRouter = express.Router();

// const { requireUser } = require('./utils');
// const { requireAdmin } = require('./utils');

productsRouter.use((req, res, next) => {
    console.log("A request is being made to /products.");

    next();
});

// ROUTES GO HERE
//------------------------------------------------------------------------
// POST /api/products/ ** ADMIN ONLY
productsRouter.post('/', async (req, res, next) => {
    const productFields = req.body;
    
    try {
        const newProduct = await createProducts(productFields);
        res.send(newProduct);
    } catch ({name, message}) {
        next({name, message});
    }
})

// PATCH /api/products/:productId ** ADMIN ONLY
productsRouter.patch('/:productId', async (req, res, next) => {
    const updateFields = {id: req.params.productId, ...req.body};

    console.log(updateFields);

    try {
        const updatedProduct = await updateProduct(updateFields);
        res.send(updatedProduct);
    } catch ({name, message}) {
        next({name, message});
    }
})

// DELETE /api/products/:productId ** ADMIN ONLY
productsRouter.delete('/:productId', async (req, res, next) => {
    const productId = req.params.productId;
    
    try {
        const deletedProduct = await deleteProduct(productId);
        res.send(deletedProduct);
    } catch ({name, message}) {
        next({name, message});
    }
})

//------------------------------------------------------------------------

// GET /api/products
// Revisit: come back and change the called function when reviews are implemented
productsRouter.get('/', async (req, res, next) => {
    try {
        const allProducts = await getProductsWithoutReviews();
        res.send(allProducts);
    } catch ({ name, message }) {
        next({ name, message });
    }
})

// GET /api/products/:productId
productsRouter.get('/:productId', async (req, res, next) => {
    const productId = req.params.productId;

    try {
        const singleProduct = await getProductById(productId);
        res.send(singleProduct);
    } catch ({name, message}) {
        next({name, message});
    }
})

productsRouter.use((req, res, next) => {
    console.log("Now leaving /products.");

    next();
});

module.exports = productsRouter;