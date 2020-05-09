const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../mongo/models/users');

const expiresIn = 60 * 10;

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });

        if (user) {
            const isOk = await bcrypt.compare(password, user.password);
            if (isOk) {
                const token = jwt.sign(
                    { userId: user._id, role: user.role },
                    process.env.JWT_SECRET,
                    { expiresIn }
                );
                res.status(200).send({
                    status: 'OK',
                    data: {
                        token,
                        expiresIn,
                    },
                });
            } else {
                res.status(403).send({
                    status: 'INVALID_PASSWORD',
                    message: '',
                });
            }
        } else {
            res.status(401).send({ status: 'USER_NOT_FOUN', message: '' });
        }
    } catch (e) {
        res.status(500).send({ status: 'ERROR', message: e.message });
    }
};

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

const updateUser = async (req, res) => {
    try {
        const { username, email, data, userId } = req.body;
        await User.findByIdAndUpdate(userId, {
            username,
            email,
            data,
        });

        res.send({
            status: 'OK',
            message: 'user updated',
        });
    } catch (error) {
        console.log(error);
        if (error.code && error.code === 11000) {
            res.status(400).send({
                status: 'ERROR DUPLICATED VALUES',
                message: error.keyValue,
            });
            return;
        }
        res.status(500).send({
            status: 'ERROR',
            message: 'error on updated',
        });
    }
};

module.exports = {
    login,
    createUser,
    deleteUser,
    getUsers,
    updateUser,
};
