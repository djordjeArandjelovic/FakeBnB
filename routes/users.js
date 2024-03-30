const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { storeReturnTo } = require("../middleware");
const {
	getRegisterPage,
	registerUser,
	getLoginPage,
	loginUser,
	logoutUser,
} = require("../controllers/userController");

router.route("/register").get(getRegisterPage).post(wrapAsync(registerUser));

router
	.route("/login")
	.get(getLoginPage)
	.post(
		storeReturnTo,
		passport.authenticate("local", {
			failureFlash: true,
			failureRedirect: true,
		}),
		loginUser
	);

router.get("/logout", logoutUser);

module.exports = router;
