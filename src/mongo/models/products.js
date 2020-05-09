const mongoose = require('mongoose');

// const Shema = mongoose.Schema;
const { Schema } = mongoose;

const productSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        images: [{ type: String, required: true }],
        user: { type: mongoose.Shema.Types.ObjectId, ref: 'User' },
    },
    {
        timestamp: true,
    }
);

const model = mongoose.model('Product', productSchema);

module.exports = model;
