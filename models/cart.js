const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartSchema = new Schema(
    {
        name: { type: String, required: true },
        price: Number,
        quantity: Number
    }
);

module.exports = mongoose.model('Cart', CartSchema);
