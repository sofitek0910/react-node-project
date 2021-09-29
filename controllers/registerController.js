const User = require('../models/user');

const register = async (req, res, next) => {
    try {
        console.log(req.body);
        const newUser = await new User(req.body);
        await newUser.save();
        res.json({ status: 'New user successfully registered', data: newUser });

    } catch (error) {
        // console.log(Object.keys(error.errors)[0]);
        const err = Object.keys(error.errors)[0];
        if (err === 'username') {
            return res.json({ status: `Sorry, the username ${req.body.username} is already taken` });
        } else if (err === 'email') {
            return res.json({ status: `Sorry, the email ${req.body.email} was already used` });
        };
    }
};

module.exports = { register };