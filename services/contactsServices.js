import Contact from "../db/models/Contacts.js";

// Отримати всі контакти
export const listContacts = async () => {
  try {
    const contacts = await Contact.findAll({
      order: [["id", "ASC"]], // Сортування за id
    });
    return contacts;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
};

// Отримати контакт за ID
export const getContactById = async (contactId) => {
  try {
    const contact = await Contact.findByPk(contactId);
    return contact;
  } catch (error) {
    console.error("Error fetching contact by ID:", error);
    throw error;
  }
};

// Видалити контакт
export const deleteContact = async (contactId) => {
  try {
    const contact = await Contact.findByPk(contactId);
    
    if (!contact) {
      return null;
    }

    await contact.destroy();
    return contact; // Повертаємо видалений контакт
  } catch (error) {
    console.error("Error deleting contact:", error);
    throw error;
  }
};

// Додати новий контакт
export const addContact = async (name, email, phone) => {
  try {
    const newContact = await Contact.create({
      name,
      email,
      phone,
      favorite: false,
    });
    return newContact;
  } catch (error) {
    console.error("Error adding contact:", error);
    throw error;
  }
};

// Оновити контакт
export const updateContact = async (contactId, body) => {
  try {
    const contact = await Contact.findByPk(contactId);
    
    if (!contact) {
      return null;
    }

    // Оновлюємо тільки ті поля, які прийшли в body
    const updatedContact = await contact.update(body);
    return updatedContact;
  } catch (error) {
    console.error("Error updating contact:", error);
    throw error;
  }
};

// Оновити статус favorite
export const updateStatusContact = async (contactId, favorite) => {
  try {
    const contact = await Contact.findByPk(contactId);
    
    if (!contact) {
      return null;
    }

    const updatedContact = await contact.update({ favorite });
    return updatedContact;
  } catch (error) {
    console.error("Error updating contact status:", error);
    throw error;
  }
};