const mongoose = require('mongoose')

const connectionString = process.env.MONGO_URI

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(connectionString);
        console.log("Connection Established", connect.connection.host);
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDb;