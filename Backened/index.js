const express = require('express')
const connecttomongo  = require('./db')

// Connection with mongodb:

try {
    connecttomongo();
} catch (error) {
    console.log('Bad Internet Connection');
}

const Port = 8000;
const app = express();


// Middleware:
app.use(express.json())

// Express app:

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(Port, () => {
    console.log('Server is running on port:', Port);
})
