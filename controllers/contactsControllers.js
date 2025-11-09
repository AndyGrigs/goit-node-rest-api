import * as contactsServices from "../services/contactsServices.js";
import { createContactSchema } from '../schemas/contactsSchemas.js';

export async function getAllContacts(req, res) {
  try {
    const contacts = await contactsServices.listContacts();
    // Validate that it's an array
    if (!Array.isArray(contacts)) {
      throw new Error("contacts.json must contain an array");
    }
    res.json(contacts);
  } catch (error) {
    console.error("Error reading contacts:", error.message);
    throw error;
  }
}

export const getContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await contactsServices.getContactById(id);

    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(contact);
  } catch (error) {
    console.log(error);
  }
};

export const removeContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await contactsServices.deleteContact(id);

    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json({message: "Contact deleted!"});
  } catch (error) {
    console.log(error);
  }
};

export const postContact = async (req, res) => {
  try {
    const { error } = createContactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const { name, email, phone } = req.body;
    const newContact = await contactsServices.addContact(name, email, phone);
    res.status(201).json(newContact);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};