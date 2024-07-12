
const Message = require('../models/Message');

exports.getAllMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ timestamp: -1 }).limit(50);
        res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};
  