const express = require("express");

const controllerAuth = require("../../controllers/auth");
const { controllerWrapper } = require("../../helpers");
const { validateBody, authenticate, upload } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
	"/register",
	validateBody(schemas.registerSchema),
	controllerWrapper(controllerAuth.register)
);

router.post(
	"/login",
	validateBody(schemas.loginSchema),
	controllerWrapper(controllerAuth.login)
);

router.get(
	"/current",
	authenticate,
	controllerWrapper(controllerAuth.getCurrent)
);

router.get("/logout", authenticate, controllerWrapper(controllerAuth.logout));

router.patch(
	"/avatars",
	authenticate,
	upload.single("avatar"),
	controllerWrapper(controllerAuth.updateAvatar)
);

router.get(
	"/verify:verificationToken",
	controllerWrapper(controllerAuth.verify)
);
module.exports = router;
