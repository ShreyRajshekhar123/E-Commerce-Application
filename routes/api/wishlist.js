const express = require('express');
const Product = require('../../models/product');
const User = require('../../models/user');
const { isLoggedIn } = require('../../middlewares/products');
const router = express.Router();

router.get('/products/:productId/like', isLoggedIn, async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user.id;

        const product = await Product.findOne({ _id: productId })

        if (!product) throw new Error('No product found!');

        const user = await User.findById(userId);
        if (user.wishList.includes(productId)) {
            await User.findByIdAndUpdate(userId, { $pull: { wishList: productId } });
        }
        else {
            // await User.findByIdAndUpdate(userId,{})
            user.wishList.push(productId);
            await user.save();
        }

        res.status(200).json({
            success: true,
            msg: 'WishList updated successfully',
        })
    }
    catch (err) {
        console.log(err);
        res.render('error', { err: err.message });
    }
})

module.exports = router;