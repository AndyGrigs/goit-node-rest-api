import express from 'express';
import { getAllContacts, getContact, removeContact } from '../controllers/contactsControllers.js';

const contactsRouter = express.Router();

contactsRouter.get('/', getAllContacts);
contactsRouter.get('/:id', getContact);
contactsRouter.delete('/:id', removeContact);
contactsRouter.post('/');

export default contactsRouter;
