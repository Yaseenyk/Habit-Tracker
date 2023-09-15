const mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/habittracker';

mongoose.connect(DB_URL, {
    useNewUrlParser :true,
    useUnifiedTopology:true,
});

const db = mongoose.connection;

db.on('error', (error)=>{console.error('MongoDB Connection Error : ',error)});

db.once('open',()=>{
    console.log("Connected to DB")
});

module.exports = db;