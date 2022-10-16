const express = require("express");

const controllers = require("../../controllers/contacts");

const { controllerWrapper } = require("../../helpers");

const { validateBody, isValidId, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, controllerWrapper(controllers.getContacts));

router.get(
	"/:id",
	authenticate,
	isValidId,
	controllerWrapper(controllers.getContactById)
);

router.post(
	"/",
	authenticate,
	validateBody(schemas.addSchema),
	controllerWrapper(controllers.addContact)
);

router.put(
	"/:id",
	isValidId,
	authenticate,
	validateBody(schemas.addSchema),
	controllerWrapper(controllers.updateContact)
);

router.patch(
	"/:id/favorite",
	isValidId,
	authenticate,
	validateBody(schemas.updateFavoriteSchema),
	controllerWrapper(controllers.updateFavorite)
);

router.delete(
	"/:id",
	authenticate,
	isValidId,
	controllerWrapper(controllers.deleteContact)
);

module.exports = router;
