const bcrypt = require('bcrypt');
const User = require('../../mongo/models/users');

const createUser = async (req, res) => {
    try {
        const { username, email, password, data } = req.body;

        const hash = await bcrypt.hash(password, 15);

        // await User.create({
        //     username,
        //     email,
        //     data,
        //     password: hash,
        // });

        const user = new User();
        user.username = username;
        user.email = email;
        user.password = hash;
        user.data = data;

        await user.save();

        res.send({
            status: 'OK',
            message: 'user created',
        });
    } catch (error) {
        if (error.code && error.code === 11000) {
            res.status(400).send({
                status: 'ERROR DUPLICATED VALUES',
                message: error.keyValue,
            });
            return;
        }

        // console.log('error controller', error);

        res.status(500).send({
            status: 'ERROR',
            message: error.message,
        });
    }
};

const deleteUser = (req, res) => {
    res.send({
        status: 'OK',
        message: 'user deleted',
    });
};

const getUsers = (req, res) => {
    res.send({
        status: 'OK',
        data: [],
    });
};

const updateUser = (req, res) => {
    res.send({
        status: 'OK',
        message: 'user updated',
    });
};

module.exports = {
    createUser,
    deleteUser,
    getUsers,
    updateUser,
};
