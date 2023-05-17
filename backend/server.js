const express = require('express');
const { errorHandler } = require('../middleware/errorMiddleware');
const connectDB = require('./config/connect');
require('dotenv').config();
require('colors')
const port = process.env.PORT
const app = express();

connectDB()
app.use(express.json()); //sends data in JSON format
app.use(express.urlencoded({extended:false})) // would send in encoded form
app.use('/api/tours',require('./routes/tourismRoutes'))
app.use('/api/users',require('./routes/userRoutes'))
app.use(errorHandler)

app.listen(port,()=>console.log(`server started on port:${port.green}`))



