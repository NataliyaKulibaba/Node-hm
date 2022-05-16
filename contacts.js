const fs = require("fs");
const path = require("path");


const contactsPath = path.resolve("./db/contacts.json");
console.log("contactsPath:", contactsPath);

function listContacts() {
  fs.readFile(contactsPath, "utf8", (error, data) => {
    if (error) {
      console.log(error);
    }
    const contacts = JSON.parse(data);
    console.table(contacts);
  });
}


function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) {
      console.log(error);
    }
    const contacts = JSON.parse(data);

    const newContact = contacts.find((contact) => contact.id === String(contactId));
    console.table(newContact);
    return newContact;
  });
}


function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) {
      console.log(error);
    }
    const contacts = JSON.parse(data);

    const newContacts =contacts.filter((contact) => contact.id !== String(contactId));

    console.table(newContacts);
    return contacts;
  });
}



function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) {
      console.log(error);
    }
    const contacts = JSON.parse(data);

    contacts.push({
      id: String(contacts.length+1),
      name,
      email,
      phone

    })

  
    console.table(contacts)

    fs.writeFile(contactsPath, JSON.stringify(contacts), error => {
      if (error) {
          return console.log(error);
      }
  });
  })


}


module.exports={
  listContacts,
  getContactById,
  removeContact,
  addContact
}
