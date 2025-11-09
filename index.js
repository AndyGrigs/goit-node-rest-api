import express from 'express';
import contactsRouter from './routes/contactsRouter.js';

const app = express();

app.use('/contacts', contactsRouter);

app.listen(3000, () => {
 console.log('Example app is listening on port 3000.');
});