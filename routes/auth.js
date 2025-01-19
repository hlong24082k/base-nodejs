const router = require("express").Router()

const User = require("../models/User");


router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(409).json({ message: "User doesn't exists!" });
        }

        if (username === user.username && password === user.password) {
            res.status(200).json({ message: 'success' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

module.exports = router;