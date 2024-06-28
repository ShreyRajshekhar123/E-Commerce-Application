const express = require('express')
const router = express.Router();
const Razorpay = require('razorpay');
const Order = require('../../models/order');
const { isLoggedIn } = require('../../middlewares/products');
const { validatePaymentVerification } = require('razorpay/dist/utils/razorpay-utils');
const { KEY_ID, KEY_SECRET } = process.env;


router.post('/order', isLoggedIn, async (req, res) => {
    try {
        const instance = new Razorpay({ key_id: KEY_ID, key_secret: KEY_SECRET });
        const { amount } = req.body;

        const options = {
            amount: parseInt(amount),
            currency: "INR"
        }

        const order = await instance.orders.create(options);

        await Order.create({
            _id: order.id,
            user: req.user,
            amount: order.amount
        })

        res.status(201).json({
            success: true,
            order
        })
    }
    catch (error) {
        console.log(error);
    }
})

router.post('/verify-payment', async (req, res) => {
    const {
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
    } = req.body;

    const isValid = validatePaymentVerification({
        "order_id": razorpay_order_id,
        "payment_id": razorpay_payment_id
    }, razorpay_signature, KEY_SECRET);

    if (!isValid) {
        return res.json({
            success: false,
            msg: 'Payment verification failed'
        })
    }

    await Order.findOneAndUpdate({ _id: razorpay_order_id }, { paymentStatus: true });

    res.redirect('/products');
})

module.exports = router;