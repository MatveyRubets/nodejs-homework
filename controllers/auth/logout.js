const { User } = require("../../models/user");

const logout = async (req, res) => {
	const { _id } = req.user;

	await User.findByIdAndUpdate(_id, { token: null });

	res.json({
		message: "You've logged out successfully",
	});
};

module.exports = logout;
