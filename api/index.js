

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const movieRoute = require('./routes/movies');
const listRoute = require('./routes/lists');

dotenv.config();

const app = express();

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => console.log('DB connection successful'))
  .catch((error) => console.log(error));

// CORS configuration   , 'http://localhost:4000' 'http://localhost:5173'
const allowedOrigins = ['http://localhost:4000', 'http://localhost:5173'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// Define routes
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/movies', movieRoute);
app.use('/api/lists', listRoute);

// Start the server
app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
