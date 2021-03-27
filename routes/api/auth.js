const router = require("express").Router();
const userModel = require("../../database/model/User");
const { registerValidationSchema } = require("../../validation/auth");
const bcrypt = require("bcrypt");

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
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(400).json({ error });
    }
});

module.exports = router;
