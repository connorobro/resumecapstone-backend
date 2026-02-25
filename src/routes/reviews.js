const express = require('express');
const router = express.Router();
const { createReview, getAllReviews, getReviewById } = require('../controllers/reviewsController');
const authenticateToken = require('../middleware/auth');
const upload = require('../config/multer');

// All review routes require a valid JWT
router.use(authenticateToken);

// POST /reviews — upload resume and trigger AI review
router.post('/', upload.single('resume'), createReview);

// GET /reviews — get all reviews for the authenticated user
router.get('/', getAllReviews);

// GET /reviews/:id — get a single review
router.get('/:id', getReviewById);

module.exports = router;
