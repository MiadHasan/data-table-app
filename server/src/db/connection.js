const mongoose = require('mongoose');

// For mongoDB atlas connection
const MONGODB_URL = 'mongodb+srv://miadhasan:1234@cluster0.gzkjvqo.mongodb.net/data-table-app';

mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true
});

const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', MONGODB_URL)
});

db.on('error', err => {
  console.error('connection error:', err)
});