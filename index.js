const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {register, login} = require('./controller/user-controller')
const userRoutes = require("./routes/user-route")
const todoRoutes = require('./routes/todo-route');
require('dotenv').config();
const authMiddelware = require("./middelwares/authentication")
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port =  process.env.port || 3001;
const mongo_url = process.env.MONGO_URI;

app.use('/user', userRoutes);
app.use('/todo', todoRoutes);

mongoose.connect(mongo_url)
.then(() =>{
    app.listen(port, () => {
        console.log(`Server running on localhost:${port}`)
    })
})
