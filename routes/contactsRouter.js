import express from 'express';
import { getAllContacts, getContact, postContact, removeContact, putContact } from '../controllers/contactsControllers.js';
import validateBody from '../helpers/validateBody.js';
import { createContactSchema, updateContactSchema } from '../schemas/contactsSchemas.js';

const contactsRouter = express.Router();

contactsRouter.get('/', getAllContacts);
contactsRouter.get('/:id', getContact);
contactsRouter.delete('/:id', removeContact);
contactsRouter.post('/', validateBody(createContactSchema), postContact);
contactsRouter.put('/:id', validateBody(updateContactSchema), putContact);

export default contactsRouter;
