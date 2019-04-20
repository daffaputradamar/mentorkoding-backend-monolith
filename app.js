const express = require('express');
const cors = require('cors')

const app = express();

//Environtment Variables
require('dotenv').config()

//Connect to Database
require("./config/db");

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Please use /api/v1/meetups or /users or /chats');
});

app.use('/api/v1/users', require('./routes/users'))
app.use('/api/v1/meetups', require('./routes/meetups'))
app.use('/api/v1/chats', require('./routes/chats'))

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server started on Port ${PORT}`))