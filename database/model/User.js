const mongoose = require("mongoose");

userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    cart: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
        default: [],
    },
});

module.exports = mongoose.model("User", userSchema);
