/* eslint-disable no-throw-literal */
const jwt = require('jsonwebtoken');

const isValidHostname = (req, res, next) => {
    const validHost = ['vc', 'localhost'];
    if (validHost.includes(req.hostname)) {
        next();
    } else {
        res.status(403).send({ status: 'ACCESS_DENIED' });
    }
};

const isAuth = (req, res, next) => {
    try {
        const { token } = req.headers;
        if (token) {
            const data = jwt.verify(token, process.env.JWT_SECRET);

            if (data.userId !== req.body.userId && data.role !== 'admin') {
                throw {
                    code: 403,
                    status: 'ACCESS_DENIED',
                    message: 'Missing permission or invalid role',
                };
            }
            next();
        } else {
            throw {
                code: 403,
                status: 'ACCESS_DENIED',
                message: 'Missing header token',
            };
        }
        // const validHost = ['vc', 'localhost'];
        // console.log('request.hostname', req.hostname);
        // if (validHost.includes(req.hostname)) {
        //     next();
        // } else {
        //     res.status(403).send({ status: 'ACCESS_DENIED' });
        // }
    } catch (e) {
        res.status(e.code || 500).send({
            status: e.status || 'ERROR',
            message: e.message,
        });
    }
};

module.exports = { isValidHostname, isAuth };
