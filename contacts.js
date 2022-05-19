const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  try {
    const contactList = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(contactList);
    console.table(contacts);
    return contacts;
  } catch (err) {
    console.error(err);
  }
};

const getContactById = async (contactId) => {
  try {
    const allContacts = await listContacts();
    const findContact = allContacts.find(
      (contact) => contact.id === String(contactId)
    );
    console.table(findContact);
    return findContact;
  } catch (err) {
    console.error(err);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const allContacts = await listContacts();
    allContacts.push({
      id: uuidv4(),
      name,
      email,
      phone,
    });
    await fs.writeFile(contactsPath, JSON.stringify(allContacts));

    console.table(allContacts);
  } catch (err) {
    console.error(err);
  }
};

const removeContact = async (contactId) => {
  try {
    const allContacts = await listContacts();

    const deleteContact = allContacts.filter(
      (contact) => contact.id !== String(contactId)
    );
    await fs.writeFile(contactsPath, JSON.stringify(deleteContact));
    console.table(allContacts);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
