const { User } = require("../../models/user");

const { RequestError } = require("../../helpers");

const verify = async (req, res) => {
	const { verificationToken } = req.params;
	const user = User.findOne({ verificationToken }); // User's verif-token
	if (!user) {
		throw RequestError(404);
	}
	// Проверка

	await User.findByIdAndUpdate(user._id, {
		verify: true,
		verificationToken: null,
	});
	// Verified

	res.json({
		message: "Verification success",
	});
	// Message
};

module.exports = verify;
