const path = require('path');
const express = require('express');
const cors = require('cors');
const session = require('express-session')
const mongoose = require('mongoose');
const config = require('config')
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;
app.use(cors());

if(process.env.NODE_ENV === "production"){
    app.use(express.static('client/build'))
}
//mongoose.connect(uri, { 
//    useNewUrlParser: true, 
//    useCreateIndex: true, 
//    useUnifiedTopology: true 
//});

mongoose.connect(uri);

console.log("MongoDB URI:", process.env.ATLAS_URI); // Add this line
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

app.use(express.json());

app.get("/testapi", (req, res) => {
    req.session.isAuth = true
    console.log(req.session)
    res.send("Hello sessions")
})

app.use('/platforms', require('./routes/platforms'));
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));
app.use('/games', require('./routes/games'));

// Serve the static files from the React app
//app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.static(path.join(__dirname, 'client', 'build')));

// An api endpoint that returns a short list of items
app.get('/api/getList', (req,res) => {
	var list = ["item1", "item2", "item3"];
	res.json(list);
	console.log('Sent list of items');
});

// Handles any requests that don't match the ones above
//app.get('*', (req,res) =>{
//	res.sendFile(path.join(__dirname+'/client/build/index.html'));
//});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});



app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
