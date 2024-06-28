const mongoose = require('mongoose');;
const orderSchema = mongoose.Schema({
    _id: String,
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    amount: {
        type: Number,
        min: 0
    },
    paymentStatus:{
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;