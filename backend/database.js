const mongoose = require('mongoose')
const mongoURI = 'mongodb://0.0.0.0:27017/iNotebook'

const connectToMongo = ()=>{
    mongoose.connect(mongoURI)
    .then(() => console.log('connected to mongo'))
    .catch((err) => console.log('Connection failed',err));
}

module.exports = connectToMongo;