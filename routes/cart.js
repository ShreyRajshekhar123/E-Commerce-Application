const express = require('express');
const User = require('../models/user');
const router = express.Router();
const { isLoggedIn } = require('../middlewares/products');

router.get('/user/cart', isLoggedIn, async (req, res) => {
    const userId = req.user._id;
    const user = await User.findOne({ _id: userId }).populate('cart.product');

    let totalPrice = 0;
    for(let item of user.cart){
        totalPrice += item.quantity * item.product.price;
    }

    res.render('cart/index', { cart: user.cart , totalPrice})
})

router.post('/user/cart/:id/add', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    const user = await User.findOne({ _id: userId });

    const existingProduct = user.cart.find(item => item.product == id);
    // console.log(existingProduct);

    if (existingProduct)
        existingProduct.quantity += 1;
    else
        user.cart.push({ product: id })

    await user.save();

    req.flash('success', 'Product added to your cart successfully!')
    res.redirect('back');
});

router.post('/user/cart/:id/remove', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    const user = await User.findOne({ _id: userId });

    const existingProduct = user.cart.find(item => item.product == id);
    // console.log(existingProduct);

    if (existingProduct && existingProduct.quantity > 1)
        existingProduct.quantity -= 1;

    await user.save();

    // req.flash('success', 'Product added to your cart successfully!')
    res.redirect('back');
});



router.delete('/user/cart/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    const user = await User.findById(userId);

    const itemIndex = user.cart.findIndex(item => item.product == id);

    if(itemIndex != -1)
        user.cart.splice(itemIndex, 1);

    await user.save();

    req.flash('success', 'Item removed from cart successfully!')
    res.redirect('back');
})

module.exports = router;