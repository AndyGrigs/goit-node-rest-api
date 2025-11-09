import express from 'express';
import contactsRouter from './routes/contactsRouter.js';

const app = express();

app.use(express.json());

app.use('/contacts', contactsRouter);

// Error handler middleware
app.use((err, _, res, __) => {
  const { status = 500, message = 'Internal server error' } = err;
  res.status(status).json({ message });
});

app.listen(3000, () => {
 console.log('Example app is listening on port 3000.');
});