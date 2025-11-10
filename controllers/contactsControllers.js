import * as contactsServices from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export async function getAllContacts(req, res, next) {
  try {
    const contacts = await contactsServices.listContacts();
    // Validate that it's an array
    if (!Array.isArray(contacts)) {
      throw HttpError(500, "contacts.json must contain an array");
    }
    res.json(contacts);
  } catch (error) {
    next(error);
  }
}

export const getContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contactsServices.getContactById(id);

    if (!contact) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

export const removeContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contactsServices.deleteContact(id);

    if (!contact) {
      throw HttpError(404, "Not found");
    }

    
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

export const postContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const newContact = await contactsServices.addContact(name, email, phone);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

export const putContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedContact = await contactsServices.updateContact(id, req.body);

    if (!updatedContact) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};