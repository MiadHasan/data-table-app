const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// For mongoDB atlas connection
const MONGODB_URL = process.env.MONGODB_URL;
mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true
});

const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected')
});

db.on('error', err => {
  console.error('connection error:', err)
});