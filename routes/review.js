const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");

const reviewController = require("../controllers/review.js");
const review = require("../models/review.js");

//Reviews POST Route
router.post("/", validateReview,isLoggedIn, wrapAsync(reviewController.createReview));

// Delete Review Route
router.delete("/:reviewsId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;
