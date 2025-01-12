const mongoose = require('mongoose');
const mongouri = 'mongodb+srv://kronos0477:manyug4908@kronos-first.j23r4.mongodb.net/Inotebook?retryWrites=true&w=majority&appName=Kronos-First';

const connecttomongo = async () => {
    try {
        await mongoose.connect(mongouri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

module.exports = connecttomongo;