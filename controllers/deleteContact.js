const { Contact } = require("../models/contact");

const { RequestError } = require("../helpers");

const deleteContact = async (req, res) => {
	const { id } = req.params;
	const result = await Contact.findByIdAndDelete(id);
	if (!result) {
		throw RequestError(400, { message: "missing field favorite" });
	}
	res.json({
		message: `Contact by id:${id} was removed`,
	});
};

module.exports = deleteContact;
