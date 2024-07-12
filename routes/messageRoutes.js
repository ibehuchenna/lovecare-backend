const express = require('express');

const { protect } = require('../middleware/authMiddleware');
const { getAllMessages } = require('../controllers/messageController');

const router = express.Router();

router.get('/', protect, getAllMessages);

module.exports = router;
