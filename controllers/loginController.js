const User = require('../models/user');

const login = async (req, res, next) => {
    const { username, password } = req.body;
    const userInDB = await User.findOne({ username, password });
    console.log(userInDB);

    try {
        if (userInDB) {
            res.json({ status: 'Username and password correct', data: userInDB });
        } else {
            res.json({ status: 'Username or password incorrect' });
        }
    } catch (error) {
        next(error);
    }

};

module.exports = { login };