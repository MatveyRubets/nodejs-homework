const contacts = require("../models/contacts");

const { RequestError } = require("../helpers");

const updateContact = async (req, res) => {
	const { id } = req.params;
	const result = await contacts.updateContact(id, req.body);
	if (!result) {
		throw RequestError(404, "Contact was not found");
	}

	res.json(result);
};

module.exports = updateContact;
