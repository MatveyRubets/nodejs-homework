const { User } = require("../../models/user");
const { RequestError, createVerifyEmail, sendEmail } = require("../../helpers");

const resendVerify = async (req, res) => {
	const { email } = req.params;
	const user = await User.findOne(email);
	if (!user) {
		throw RequestError(400, "Email not found");
	}

	const mail = createVerifyEmail(email, user.verificationToken);
	await sendEmail(mail);

	res.json({
		message: "Verification complete",
	});
};

module.exports = resendVerify;
