const User = require('../models/user');


const delivery = async (req, res, next) => {
    console.log('SAME DELIVERY ADDRESS: ', req.body);
    try {
        res.json({ status: 'Item will be sent to the invoice address' });
    } catch (error) {
        next(error);
    }
};

const deliveryOtherAddress = async (req, res, next) => {
    console.log('DELIVERY: ', req.body);
    try {
        const id = req.body[0]._id;
        console.log('ID: ', id);
        const user = await User.findByIdAndUpdate({ _id: id }, { deliveryAddress: req.body[1] });

        console.log('user: ', user);
        // console.log('userUpdated: ', userUpdated);
        res.json({ status: 'New delivery address registered', data: user });
    } catch (error) {
        next(error);
    }
};


module.exports = { delivery, deliveryOtherAddress };