const router = require("express").Router();
const userModel = require("../../database/model/User");
const { registerValidationSchema, loginValidationSchema } = require("../../validation/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../../middleware/auth");

router.get("/", authMiddleware, async (req, res) => {
    try {
        const usr = await userModel.findById(req.user.id);
        return res.status(200).json({
            user: {
                id: usr.id,
                name: usr.name,
                email: usr.email,
            },
        });
    } catch (err) {
        return res.status(500).json({ error: "Something went wrong" });
    }
});

router.post("/register", async (req, res) => {
    const { error } = registerValidationSchema.validate(req.body, { abortEarly: false });

    if (error) {
        let errObj = {};
        error.details.forEach((er) => (errObj = { ...errObj, [er.context.label]: er.message }));
        return res.status(400).json({ registerValidationError: errObj });
    }

    // check if email exists
    const emailIsNotUnique = await userModel.findOne({ email: req.body.email });
    if (emailIsNotUnique)
        return res.status(400).json({ registerValidationError: { email: "Email already exists" } });

    const pwdSalt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(req.body.password, pwdSalt);

    try {
        const user = await userModel.create({ ...req.body, password: hashedPwd });
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
        return res
            .status(200)
            .json({ user: { id: user.id, name: user.name, email: user.email }, token });
    } catch (err) {
        return res.status(500).json({ serverError: "Something went wrong" });
    }
});

router.post("/login", async (req, res) => {
    const { error } = loginValidationSchema.validate(req.body, {
        abortEarly: false,
    });
    if (error) {
        let errObj = {};
        error.details.forEach((er) => (errObj = { ...errObj, [er.context.label]: er.message }));
        return res.status(400).json({ loginValidationError: errObj });
    }

    let user = null;
    try {
        user = await userModel.findOne({ email: req.body.email });
    } catch (err) {
        return res.status(500).json({ serverError: "Something went wrong" });
    }

    if (!user) {
        return res.status(400).json({ loginValidationError: { email: "Email doesn't exist" } });
    }

    const isPwdValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPwdValid)
        return res.status(400).json({ loginValidationError: { password: "Invalid password" } });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
    res.status(200).json({ user: { id: user.id, name: user.name, email: user.email }, token });
});

module.exports = router;
