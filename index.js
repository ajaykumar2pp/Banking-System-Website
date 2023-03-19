require('dotenv').config()
const express =require('express');
const path = require('path');
const bodyParser = require('body-parser')
const app = express();

// *******************    Set Template Engine  ***********************************//

app.set("view engine","ejs")
app.set('views', path.join(__dirname, 'views'))
console.log(app.get("view engine"))

// ************************  Database Connection  **********************************//
const {connectMonggose} = require('./app/database/db')
connectMonggose();


// *************************    Assets    ****************************************//
const publicPath = path.join(__dirname,"public");
app.use(express.static(publicPath));
app.use(express.static(__dirname + '/public'));
app.use("/uploads",express.static("uploads"))
app.use( bodyParser.urlencoded({ extended: true }) );
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// ***********************************Routes ********************************//
require('./routes/api')(app)

// ************************* PORT ***********************************//
const PORT = process.env.PORT || 3500;
app.listen(PORT,()=>{
    console.log(`My server start on this port ${PORT}`)
})

