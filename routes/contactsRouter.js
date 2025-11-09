import express from 'express';
import { getAllContacts, getContact } from '../controllers/contactsControllers.js';

const contactsRouter = express.Router();

contactsRouter.get('/', getAllContacts);
contactsRouter.get('/:id', getContact);

export default contactsRouter;
