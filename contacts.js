import { log } from "console";
import { promises as fs } from "fs";
import { nanoid } from "nanoid";
import path from "path";

const contactsPath = path.join( "contacts.json");

export async function listContacts() {
  try {
    const readJsonResult = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(readJsonResult);

    return contacts;
  } catch (err) {
    console.log(err);
  }
}
// ============================================
export async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const contact = contacts.find((item) => item.id === contactId);

    return contact || null;
  } catch (error) {
    console.error(error);
  }
}
// ======================================
export async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const removedContact = contacts.find((item) => item.id === contactId);

    if (!removedContact) return null;

    const updatedContacts = contacts.filter((item) => item.id !== contactId);

    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));

    return removedContact;
  } catch (error) {
    console.error(error);
  }
}
// ============================================
export async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };

    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return newContact;
  } catch (error) {
    console.error(error);
  }
}
