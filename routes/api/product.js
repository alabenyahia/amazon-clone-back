const router = require("express").Router();
const productModel = require("../../database/model/Product");

router.post("/", async (req, res) => {
    try {
        const product = await productModel.create(req.body);
        return res.status(200).json({ product });
    } catch (err) {
        return res.status(500).json({ serverError: "Something went wrong" });
    }
});

module.exports = router;
