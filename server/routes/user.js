const router = require("express").Router();
const { User, validateUser } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	try {
		const { error } = validateUser(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const { employeeId } = req.body;
		const user = await User.findOne({ employeeId });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given employeeId already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: "Internal Server Error", error: error.message });
	}
});

module.exports = router;