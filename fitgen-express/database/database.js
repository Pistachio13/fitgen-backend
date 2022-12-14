const mongoose = require('mongoose');
const { MONGODB_URI } = process.env


const mongoDBConfig = {
    autoIndex: true,
    useNewUrlParser: true
}

mongoose.set('strictQuery', false)

async function connectDatabase() {
    try {
        await mongoose.connect( MONGODB_URI, mongoDBConfig )
        console.log('Connected MongoDB')

    } catch(err) {
        console.log('Error connecting to database', err)
    }
  
}

module.exports = connectDatabase