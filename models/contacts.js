const fs = require("fs/promises");
const path = require("path");
const { v4: uuid } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const writeFile = async contacts =>
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf8");

const listContacts = async () => {
	const contacts = JSON.parse(await fs.readFile(contactsPath, "utf8"));

	return contacts;
};

const getContactById = async contactId => {
	const contacts = await listContacts();

	const foundContacts = contacts.find(({ id }) => id === contactId);

	return foundContacts || null;
};

const removeContact = async contactId => {
	const contacts = await listContacts();
	const removedContact = contacts.filter(({ id }) => id !== contactId);

	await writeFile(removedContact);
	return contacts;
};

const addContact = async body => {
	const { name, email, phone } = body;

	const addedContact = {
		id: uuid(),
		name,
		email,
		phone,
	};
	const contacts = await listContacts();
	contacts.push(addedContact);

	await writeFile(contacts);
	return addedContact;
};

const updateContact = async (contactId, body) => {
	const contacts = await listContacts();
	const contactById = contacts.findIndex(contact => contact.id === contactId);
	const { name, email, phone } = body;

	if (contactById === -1) {
		return null;
	}
	contacts[contactById] = { name, email, phone };

	await writeFile(contacts);
	return contacts[contactById];
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
