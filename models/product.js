const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema(
    {
        name: { type: String, required: true },
        picture: { type: String, required: true },
        price: Number,
        initial_stock: Number,
        stock: Number,
        type: String
    },
    {
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    }
);

ProductSchema.virtual('quantity').get(function () { return this.initial_stock - this.stock });

module.exports = mongoose.model('Product', ProductSchema);
