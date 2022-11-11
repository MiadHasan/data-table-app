const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');

require('./db/connection');

dotenv.config();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use(productRoute);
app.use(cartRoute);

app.get('/', (req, res) => {
    res.send('Hello');
})

app.listen(PORT, () => {
    console.log('Server is running on port: ' + PORT);
});