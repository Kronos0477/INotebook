const mongoose = require('mongoose');
const mongouri = 'Enter Your Mongodb Uri'
const connecttomongo = async () => {
    try {
        await mongoose.connect(mongouri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

module.exports = connecttomongo;
