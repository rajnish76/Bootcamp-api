const express = require('express');
const router = express.Router({ mergeParams: true });

const Review = require('../models/review');

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

const {
  getReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview,
} = require('../controllers/review');

router.get('/', advancedResults(Review, 'bootcamp'), getReviews);

router.get('/:id', getReview);

router.post('/', protect, authorize('user', 'admin'), addReview);

router.put('/:id', protect, authorize('user', 'admin'), updateReview);

router.delete('/:id', protect, authorize('user', 'admin'), deleteReview);

module.exports = router;
