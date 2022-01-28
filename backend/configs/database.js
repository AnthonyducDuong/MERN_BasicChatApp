const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.KEY_MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Something wrong when connect MongoDB: ${error.message}`);
        process.exit();
    }
};

module.exports = connectDB;