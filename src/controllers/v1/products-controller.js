const Products = require('../../mongo/models/products');

const createProduct = async (req, res) => {
    try {
        const { title, description, price, images, userId } = req.body;

        const product = await Products.create({
            title,
            description,
            price,
            images,
            user: userId,
        });
        res.send({
            status: 'OK',
            data: product,
        });
    } catch (error) {
        res.status(500).send({
            status: 'ERROR',
            data: error.message,
        });
    }
};

const deleteProduct = (req, res) => {};

const getProducts = async (req, res) => {
    try {
        const products = await Products.find()
            .populate('user', 'username email data role')
            .select('title description price');
        res.send({
            status: 'OK',
            data: products,
        });
    } catch (error) {
        res.status(500).send({
            status: 'ERROR',
            data: error.message,
        });
    }
};

module.exports = {
    createProduct,
    deleteProduct,
    getProducts,
};
