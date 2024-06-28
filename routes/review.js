const router = require('express').Router();
const Review = require('../models/review');
const Product = require('../models/product');

router.post('/products/:productId/add', async (req, res) => {
    try {
        const { productId } = req.params;
        const { rating, comment } = req.body;

        const review = await Review.create({ rating, comment });
        const product = await Product.findById(productId);

        product.reviews.push(review);
        product.save();

        res.redirect('back');
    } catch (err) {
        console.log(err);
        res.render('error', { err: err.message })
    }
})

module.exports = router;