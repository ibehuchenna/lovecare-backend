const CaretakerProfile = require('../models/CaretakerProfile');
const User = require('../models/User');

exports.createProfile = async (req, res) => {
  const { fullName, email, phoneNumber, address, city, state, postalCode, experience, scheduleGap, skills, priceHourly } = req.body;
  const userId = req.user._id;

  try {
    const profile = new CaretakerProfile({
      userId,
      fullName,
      email,
      phoneNumber,
      address,
      city,
      state,
      postalCode,
      experience,
      scheduleGap,
      skills,
      priceHourly,
      profilePhoto: req.file ? req.file.path : null,
    });

    await profile.save();
    res.status(201).json({ message: 'Profile created successfully', profile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const profile = await CaretakerProfile.findOne({ userId: req.user._id });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCaretakerProfile = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch the user with their associated caretaker profile
    const userWithProfile = await User.findById(userId)
      .populate('userId', 'fullName email phoneNumber address city state postalCode experience scheduleGap skills priceHourly profilePhoto');

    if (!userWithProfile) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(userWithProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  const { fullName, email, phoneNumber, address, city, state, postalCode, experience, scheduleGap, skills, priceHourly } = req.body;
  const userId = req.user._id;

  try {
    let profile = await CaretakerProfile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    profile.fullName = fullName || profile.fullName;
    profile.email = email || profile.email;
    profile.phoneNumber = phoneNumber || profile.phoneNumber;
    profile.address = address || profile.address;
    profile.city = city || profile.city;
    profile.state = state || profile.state;
    profile.postalCode = postalCode || profile.postalCode;
    profile.experience = experience || profile.experience;
    profile.scheduleGap = scheduleGap || profile.scheduleGap;
    profile.skills = skills ? skills.split(',').map(skill => skill.trim()) : profile.skills;
    profile.priceHourly = priceHourly || profile.priceHourly;
    profile.profilePhoto = req.file ? req.file.path : profile.profilePhoto;

    profile = await profile.save(); // Save updated profile

    res.status(200).json({ message: 'Profile updated successfully', profile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProfile = async (req, res) => {
  const userId = req.user._id;

  try {
    const profile = await CaretakerProfile.findOneAndDelete({ userId });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllCaretakers = async (req, res) => {
  try {
    const caretakers = await CaretakerProfile.find();
    res.status(200).json(caretakers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
