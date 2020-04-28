const express = require('express');
const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');
const Course = require('../models/course');

const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/course');

router.get('/', advancedResults(Course, 'bootcamp'), getCourses);

router.get('/:id', getCourse);

router.post('/', protect, authorize('publisher', 'admin'), addCourse);

router.put('/:id', protect, authorize('publisher', 'admin'), updateCourse);

router.delete('/:id', protect, authorize('publisher', 'admin'), deleteCourse);

module.exports = router;
