const express = require('express')
const connecttomongo  = require('./db')
const cors = require('cors')
// Connection with mongodb:

try {
    connecttomongo();
} catch (error) {
    console.log('Bad Internet Connection');
}

const Port = 8000;
const app = express();


// Middleware:
app.use(cors())
app.use(express.json())

// Express app:

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(Port, () => {
    console.log('INoteBook Backened is running on Port Number : ', Port);
})
