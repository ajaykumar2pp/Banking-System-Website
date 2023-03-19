require('dotenv').config()
const mongoose = require('mongoose');
exports.connectMonggose =()=>{
   
    mongoose.connect(process.env.DATABASE_URL,
    {
        useNewUrlParser: true
    })
    .then((e)=>console.log("Connected to Mongodb =>>Banking Website Project"))
    .catch((e)=>console.log("Not Connect Mongodb"))
}
