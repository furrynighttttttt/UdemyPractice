const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv').config();

connectDB()

const PORT = process.env.PORT || 8000

const app = express();

//init middleware => to use body.req
app.use(express.json({extended: false}))

app.use('/api/users', require('./routes/api/userRoute'))
app.use('/api/auth', require('./routes/api/authRoute'))
app.use('/api/profile', require('./routes/api/profileRoute'))
app.use('/api/posts', require('./routes/api/postRoute'))



app.listen(PORT, () => console.log(`Server started on port ${PORT}`));