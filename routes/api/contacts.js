const express = require("express");

const controllers = require("../../controllers");

const { controllerWrapper } = require("../../helpers");

const { validateBody } = require("../../middlewares/index");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", controllerWrapper(controllers.getContacts));

// router.get("/:id", controllerWrapper(controllers.getContactById));

router.post(
	"/",
	validateBody(schemas.addSchema),
	controllerWrapper(controllers.addContact)
);

// router.delete("/:id", controllerWrapper(controllers.deleteContact));

// router.put(
// 	"/:id",
// 	validateBody(schemas.addSchema),
// 	controllerWrapper(controllers.updateContact)
// );

module.exports = router;
