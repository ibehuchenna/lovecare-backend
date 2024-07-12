const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const jwt = require('jsonwebtoken');
const rp = require('request-promise');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const caretakerProfileRoutes = require('./routes/caretakerProfileRoutes');
const careReceiverRoutes = require('./routes/careReceiverRoutes');
const requestRoutes = require('./routes/requestRoutes');
const messageRoutes = require('./routes/messageRoutes');
const Message = require('./models/Message');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, { cors: { origin: "*" } });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/caretaker-profiles', caretakerProfileRoutes);
app.use('/api/care-receiver', careReceiverRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/messages', messageRoutes);

const config = {
  APIKey: process.env.APIKey,
  APISecret: process.env.APISecret,
};

const payload = {
  iss: config.APIKey,
  exp: new Date().getTime() + 5000,
};

// const token = jwt.sign(payload, config.APISecret);

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6Ilk1WDh1MHZkVENhWDJ6WkltbzNBVVEiLCJleHAiOjE3MjEyMjQ2MjMsImlhdCI6MTcyMDYxOTgyNH0.pFcZ1GfYZQHQIfBy_FFsBUDjHxlOqvTLJ5GeeQMI7Xc";

console.log({token});

app.post('/api/meeting', (req, res) => {
  const email = req.body.email;
  const options = {
    method: "POST",
    uri: `https://api.zoom.us/v2/users/${email}/meetings`,
    body: {
      topic: "Meeting",
      type: 1,
      settings: {
        host_video: true,
        participant_video: true
      },
    },
    auth: {
      bearer: token,
    },
    headers: {
      "User-Agent": "Zoom-api-Jwt-Request",
      "content-type": "application/json",
    },
    json: true,
  };

  rp(options)
    .then((response) => {
      const dataRes = { join_url: response.join_url };
      res.status(200).json(dataRes);
    })
    .catch((err) => {
      console.error("API call failed, reason", err);
      res.status(500).json({ message: "Zoom API call failed" });
    });
});


app.post('/zoom/oauth/token', async (req, res) => {
  const accountId = process.env.ZOOM_ACCOUNT_ID;
  const secretKey = process.env.ZOOM_SECRET_KEY;
  const clientId = process.env.ZOOM_CLIENT_ID;

  const base64Encoded = Buffer.from(`${clientId}:${secretKey}`).toString('base64');

  const data = qs.stringify({
    'account_id': accountId,
    'grant_type': 'account_credentials'
  });

  const config = {
    method: 'post',
    url: 'https://zoom.us/oauth/token',
    headers: {
      'Authorization': `Basic ${base64Encoded}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
  };

  try {
    const response = await axios(config);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('message', async (message) => {
    try {
      const newMessage = new Message({
        text: message.text,
        senderName: message.senderName,
        senderId: message.senderId,
        avatar: message.avatar,
      });

      await newMessage.save();
      console.log("Message saved:", newMessage);

      io.emit('message', newMessage);
    } catch (err) {
      console.error('Error saving message:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
