const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
    },
});

module.exports = mongoose.model("Product", productSchema);
