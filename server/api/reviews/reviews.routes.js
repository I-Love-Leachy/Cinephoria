const express = require("express");
const reviewsRoutes = express.Router();
const {
  getReviews,
  getReviewsById,
  deleteReviewsById,
  postReviews,
  updateReviewsById,
} = require("../../controllers/reviews/reviews.controller");

// Validator
const {
  postReviewsValidator,
  validateReviews,
} = require("../../middlewares/validator/reviews.validator");

// get all reviews
reviewsRoutes.get("/reviews", getReviews);

// get reviews by Id
reviewsRoutes.get("/reviews/:id", getReviewsById);

// delete reviews by Id
reviewsRoutes.delete("/reviews/:id", deleteReviewsById);

// post reviews
reviewsRoutes.post("/reviews", postReviews);

// update reviews
reviewsRoutes.put("/reviews/:review_id", updateReviewsById);

module.exports = reviewsRoutes;
