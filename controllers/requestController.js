// controllers/requestController.js

const Request = require('../models/Request');

exports.createRequest = async (req, res) => {
  const { caretakerId, problem, scheduleTime, additionalRequirements, hours, gender } = req.body;

  try {
    const newRequest = await Request.create({
      caretakerId,
      problem,
      scheduleTime,
      additionalRequirements,
      hours,
      gender,
    });

    res.status(201).json({ message: 'Request submitted successfully', request: newRequest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRequestById = async (req, res) => {
  const requestId = req.params.id;

  try {
    const request = await Request.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




/*
exports.getAllRequests = async (req, res) => {
  const caretakerId = req.user.id; // Assuming you have middleware to extract caretaker ID from authenticated user

  try {
    const requests = await Request.find({ caretakerId }); // Fetch requests only for the authenticated caretaker
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
*/