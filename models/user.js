const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        address: { type: String, required: true },
        addressNr: { type: Number, required: true },
        postCode: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        deliveryAddress: {
            firstName: {
                type: String, default: function () { return this.firstName }
            },
            lastName: {
                type: String, default: function () { return this.lastName }
            },
            address: {
                type: String, default: function () { return this.address }
            },
            addressNr: {
                type: Number, default: function () { return this.addressNr }
            },
            postCode: {
                type: String, default: function () { return this.postCode }
            },
            city: {
                type: String, default: function () { return this.city }
            },
            country: {
                type: String, default: function () { return this.country }
            }
        }
    }
    // ,
    // {
    //     toObject: {
    //         virtuals: true
    //     },
    //     toJSON: {
    //         virtuals: true
    //     }
    // }
);

UserSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', UserSchema);
