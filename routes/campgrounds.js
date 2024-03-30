const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, validateCamp, isAuthor } = require("../middleware");
const {
	index,
	getNewForm,
	postNewCamp,
	getSingleCamp,
	getEditForm,
	editCamp,
	deleteCamp,
} = require("../controllers/campgroundsController");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

router
	.route("/")
	.get(wrapAsync(index))
	.post(
		isLoggedIn,
		upload.array("image"),
		validateCamp,
		wrapAsync(postNewCamp)
	);

router.get("/new", isLoggedIn, getNewForm);

router
	.route("/:id")
	.get(wrapAsync(getSingleCamp))
	.put(
		isLoggedIn,
		isAuthor,
		upload.array("image"),
		validateCamp,
		wrapAsync(editCamp)
	)
	.delete(isLoggedIn, isAuthor, wrapAsync(deleteCamp));

router.get("/:id/edit", isLoggedIn, isAuthor, wrapAsync(getEditForm));

module.exports = router;
