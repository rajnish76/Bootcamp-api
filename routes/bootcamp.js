const express = require('express');
const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
const Bootcamp = require('../models/bootcamp');
const { protect, authorize } = require('../middleware/auth');

const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} = require('../controllers/bootcamp');

// Include other resource routers
const courseRouter = require('./course');
const reviewRouter = require('./review');

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);
router.use('/:bootcampId/reviews', reviewRouter);

router.get('/', advancedResults(Bootcamp, 'courses'), getBootcamps);

router.get('/:id', getBootcamp);

router.post('/', protect, authorize('publisher', 'admin'), createBootcamp);

router.put('/:id', protect, authorize('publisher', 'admin'), updateBootcamp);

router.delete('/:id', protect, authorize('publisher', 'admin'), deleteBootcamp);

router.get('/radius/:zipcode/:distance', getBootcampsInRadius);

router.put(
  '/:id/photo',
  protect,
  authorize('publisher', 'admin'),
  bootcampPhotoUpload
);

module.exports = router;
