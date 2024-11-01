const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const color = require('color');
const connectDb = require('./config/connectionDb');

// config and env file

dotenv.config( );
// database call
connectDb()
//rest object
const app = express();

//middleware 
app.use(morgan('dev'))
app.use(express.json())
app.use(cors());


//routes
// user routes
app.use('/api/v1/users', require('./routes/userRoute'))
//transection routes
app.use('/api/v1/transections', require('./routes/transectionRoutes'))

// PORT 
const PORT = 8080 || process.env.PORT


//listening server
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})