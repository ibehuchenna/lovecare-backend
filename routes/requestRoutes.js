// routes/requestRoutes.js

const express = require('express');
const router = express.Router();
const { createRequest, getRequestById, getAllRequests } = require('../controllers/requestController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createRequest);
router.get('/', protect, getAllRequests); // Route to fetch all requests
router.get('/:id', protect, getRequestById);

module.exports = router;
