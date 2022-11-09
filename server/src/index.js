const express = require('express');
const cors = require('cors');
const app = express();
const productRoute = require('./routes/product');

require('./db/connection');

const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use(productRoute);

app.get('/', (req, res) => {
    res.send('Hello');
})

app.listen(PORT, () => {
    console.log('Server is running on port: ' + PORT);
});