const express = require("express");

const controllerAuth = require("../../controllers/auth");
const { controllerWrapper } = require("../../helpers");
const { validateBody, authenticate } = require("../../middlewares");

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

module.exports = router;
