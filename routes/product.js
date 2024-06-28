const express = require('express');
const Product = require('../models/product');
const { productSchema } = require('../validators/productSchema');
const { validator } = require('../middlewares/validator');
const router = express.Router();
const { isLoggedIn, isSeller } = require('../middlewares/products');
const { 
    showAllProducts, 
    createProduct,
    productForm,
    showProduct,
    productEditForm,
    editProduct,
    deleteProduct
} = require('../controllers/product');

router.route('/')
    .get(showAllProducts)
    .post(isLoggedIn, isSeller, validator(productSchema), createProduct)

router.route('/new')
    .get(isLoggedIn, isSeller, productForm);

router.route('/:id')
    .get(showProduct)
    .put(isLoggedIn, isSeller, editProduct)
    .delete(isLoggedIn, isSeller, deleteProduct)

router.route('/:id/edit')
    .get(isLoggedIn, isSeller, productEditForm)

// router.get('/products', showAllProducts);

// router.post('/products', isLoggedIn, isSeller, validator(productSchema), createProduct);

// router.get('/products/new', isLoggedIn, isSeller, productForm)

// router.get('/products/:id', showProduct)

// router.get('/products/:id/edit', isLoggedIn, isSeller, productEditForm)

// router.put('/products/:id', isLoggedIn, isSeller, editProduct)

// router.delete('/products/:id', isLoggedIn, isSeller, deleteProduct)


module.exports = router;

