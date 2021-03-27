const router = require("express").Router();
const userModel = require("../../database/model/User");

router.post("/register", async (req, res) => {
    try {
        const user = await userModel.create({ ...req.body });
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(400).json({ error });
    }
});

module.exports = router;
