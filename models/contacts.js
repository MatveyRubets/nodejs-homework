const fs = require("fs/promises");
const path = require("path");
const { v4: uuid } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const writeFile = async contacts =>
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf8");

const listContacts = async () => {
	const contacts = JSON.parse(await fs.readFile(contactsPath, "utf8"));

	return contacts || null;
};

const getContactById = async id => {
	const contacts = await listContacts();

	const foundContacts = contacts.find(contact => contact.id === id);

	return foundContacts || null;
};

const removeContact = async id => {
	const contacts = await listContacts();
	const removedContact = contacts.filter(contact => contact.id !== id);

	await writeFile(removedContact);
	return contacts || null;
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
	return addedContact || null;
};

const updateContact = async (id, { name, email, phone }) => {
	const contacts = await listContacts();
	const index = contacts.findIndex(contact => contact.id === id);

	if (index === -1) {
		return null;
	}

	contacts[index] = { id, name, email, phone };

	await writeFile(contacts);
	return contacts[index] || null;
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
