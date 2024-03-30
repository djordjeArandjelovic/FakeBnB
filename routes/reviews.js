const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");
const { postReview, deleteReview } = require("../controllers/reviewController");

//REVIEW ROUTES
router.post("/", validateReview, isLoggedIn, wrapAsync(postReview));
router.delete(
	"/:reviewId",
	isLoggedIn,
	isReviewAuthor,
	wrapAsync(deleteReview)
);

module.exports = router;
