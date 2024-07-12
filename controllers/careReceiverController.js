// controllers/careReceiverController.js
const CareReceiver = require('../models/CareReceiver');
const User = require('../models/User');

exports.createCareReceiver = async (req, res) => {
  try {
    const careReceiver = new CareReceiver({ ...req.body, userId: req.user.id });
    await careReceiver.save();
    res.status(201).json(careReceiver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCareReceiver = async (req, res) => {
  try {
    const careReceiver = await CareReceiver.findOne({ userId: req.user.id });
    if (!careReceiver) return res.status(404).json({ message: 'Care receiver not found' });
    res.json(careReceiver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCareReceiver = async (req, res) => {
  try {
    const careReceiver = await CareReceiver.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!careReceiver) return res.status(404).json({ message: 'Care receiver not found' });
    res.json(careReceiver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCareReceiver = async (req, res) => {
  try {
    const careReceiver = await CareReceiver.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!careReceiver) return res.status(404).json({ message: 'Care receiver not found' });
    res.json({ message: 'Care receiver deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
