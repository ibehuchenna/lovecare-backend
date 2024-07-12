// routes/careReceiverRoutes.js
const express = require('express');
const router = express.Router();
const {
  createCareReceiver,
  getCareReceiver,
  updateCareReceiver,
  deleteCareReceiver
} = require('../controllers/careReceiverController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createCareReceiver)
  .get(protect, getCareReceiver);

router.route('/:id')
  .put(protect, updateCareReceiver)
  .delete(protect, deleteCareReceiver);

module.exports = router;
