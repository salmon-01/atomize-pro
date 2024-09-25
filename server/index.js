const express = require('express');
const cors = require("cors");
const router = require('./router.js');

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow credentials (like cookies) to be sent
};

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors(corsOptions));
app.use(express.json());
// app.use('/api', router);
app.use('/api', router);

app.listen(PORT, (err) => {
    if (err) {
      console.log(`😞 Something went wrong connecting to the server! ${err}`);
    } else {
      console.log(`🚀 The server is running and listening on port ${PORT}!`);
    }
  });