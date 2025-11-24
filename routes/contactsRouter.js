import express from "express";
import {
  getAllContacts,
  getContact,
  postContact,
  removeContact,
  putContact,
  patchContact,
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import authenticate from "../middlewares/authenticate.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", getAllContacts);
contactsRouter.get("/:id", getContact);
contactsRouter.delete("/:id", removeContact);
contactsRouter.post("/", validateBody(createContactSchema), postContact);
contactsRouter.put("/:id", validateBody(updateContactSchema), putContact);
contactsRouter.patch("/:id/favorite", patchContact);

export default contactsRouter;
