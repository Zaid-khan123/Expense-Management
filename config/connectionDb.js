const mongoose = require('mongoose');
const color = require('color');

const connectDb = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Server is Running on ${mongoose.connection.host}`)
    } catch (error) {
        console.log(`${error}`.bgRed);
        }

}

module.exports = connectDb; 