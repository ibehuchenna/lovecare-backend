const express = require('express');
const router = express.Router();
const {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
  getAllCaretakers,
  getCaretakerProfile
} = require('../controllers/caretakerProfileController');
const { protect } = require('../middleware/authMiddleware');
const multerConfig = require('../config/multer');

router.route('/')
  .post(protect, multerConfig.single('profilePhoto'), createProfile)
  .put(protect, multerConfig.single('profilePhoto'), updateProfile)
  .delete(protect, deleteProfile)
  .get(protect, getAllCaretakers);

router.get('/me', protect, getProfile);

router.get('/profile', protect, getCaretakerProfile);


module.exports = router;
