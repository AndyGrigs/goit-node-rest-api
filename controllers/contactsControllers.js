import * as contactsServices from "../services/contactsServices.js";

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
    res.status(500).json({ message: error.message });
  }
};
