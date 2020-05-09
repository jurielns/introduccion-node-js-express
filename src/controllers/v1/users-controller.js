const bcrypt = require('bcrypt');
const User = require('../../mongo/models/users');

const createUser = async (req, res) => {
    try {
        console.log('req.body::', req.body);

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
        console.log('error controller', error);

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
