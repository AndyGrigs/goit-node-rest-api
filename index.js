import express from 'express'
import { listContacts } from './services/contactsServices.js';


const app = express();
app.get('/contacts', listContacts);

app.listen(3000, () => {
 console.log('Example app is listening on port 3000.');
});