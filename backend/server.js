const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./configs/database.js');
const userRoutes = require('./routes/user.js');

require('dotenv').config();


const app = express();

app.use(bodyParser.json({
    limit: '30mb',
    extended: true,
}));

app.use(bodyParser.urlencoded({
    limit: '30mb',
    extended: true,
}));

app.use(cors());

const PORT = process.env.PORT || 5000;
// const CONNECTION_URL = 'mongodb+srv://anthony:Thang1407@cluster0.tmrz6.mongodb.net/EcommerceHandmade?retryWrites=true&w=majority';
// const CONNECTION_URL = process.env.KEY_MONGODB;

// mongoose.connect(CONNECTION_URL)
//     .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
//     .catch((er) => console.log(er.message));

app.use('/api/user', userRoutes);

connectDB()
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((er) => console.log(er.message));