const express = require("express");

const controllerAuth = require("../../controllers/auth");
const { controllerWrapper } = require("../../helpers");
const { validateBody } = require("../../middlewares");

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
)

module.exports = router;
