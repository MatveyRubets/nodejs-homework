const express = require("express");

const controllers = require("../../controllers");

const { controllerWrapper } = require("../../helpers");

const { validateBody, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", controllerWrapper(controllers.getContacts));

router.get("/:id", isValidId, controllerWrapper(controllers.getContactById));

router.post(
	"/",
	validateBody(schemas.addSchema),
	controllerWrapper(controllers.addContact)
);

router.put(
	"/:id",
	isValidId,
	validateBody(schemas.addSchema),
	controllerWrapper(controllers.updateContact)
);

router.patch(
	"/:id/favorite",
	isValidId,
	validateBody(schemas.updateFavoriteSchema),
	controllerWrapper(controllers.updateFavorite)
);

router.delete("/:id", isValidId, controllerWrapper(controllers.deleteContact));

module.exports = router;
