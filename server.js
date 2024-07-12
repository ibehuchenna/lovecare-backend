const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const KJUR = require('jsrsasign');
const jwt = require('jsonwebtoken');
const rp = require('request-promise');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const caretakerProfileRoutes = require('./routes/caretakerProfileRoutes');
const careReceiverRoutes = require('./routes/careReceiverRoutes');
const requestRoutes = require('./routes/requestRoutes');
const http = require('http');

// env file configuration
dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/caretaker-profiles', caretakerProfileRoutes);
app.use('/api/care-receiver', careReceiverRoutes);
app.use('/api/requests', requestRoutes);

// Video SDK API credentials
const VIDEO_SDK_API_KEY = 'tOkpm3LKRCWWR7CdUPUGWg';
const VIDEO_SDK_API_SECRET = 'B7vnzBlL7Gz5S03Gp2EuhlJJcCJqZgjswMWt';

// Function to generate Video SDK token
const generateVideoSDKToken = (sdkKey, sdkSecret, sessionName, role) => {
  const iat = Math.round(new Date().getTime() / 1000) - 30;
  const exp = iat + 60 * 60 * 2;
  const oHeader = { alg: 'HS256', typ: 'JWT' };

  const oPayload = {
    app_key: sdkKey,
    tpc: sessionName,
    role_type: role,
    version: 1,
    iat,
    exp
  };

  const sHeader = JSON.stringify(oHeader);
  const sPayload = JSON.stringify(oPayload);
  const sdkJWT = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, sdkSecret);
  return sdkJWT;
};

// Route to generate Video SDK token
app.post('/generate-token', (req, res) => {
  try {
    const { role, sessionName } = req.body;

    // Validate if role and sessionName are present
    if (!role || !sessionName) {
      return res.status(400).json({ message: 'Role and session name are required.' });
    }

    const signature = generateVideoSDKToken(
      VIDEO_SDK_API_KEY,
      VIDEO_SDK_API_SECRET,
      sessionName,
      role
    );

    res.status(200).json({ signature });
  } catch (error) {
    console.error('Error generating signature:', error);
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
