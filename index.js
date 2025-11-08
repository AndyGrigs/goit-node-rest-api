import express from 'express'
import { getAllContacts, getContact } from './controllers/contactsControllers.js';


const app = express();
app.get('/contacts', getAllContacts);
app.get('/contacts/:id', getContact);

app.listen(3000, () => {
 console.log('Example app is listening on port 3000.');
});