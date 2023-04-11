// wiki.js - Wiki route module.

const express = require('express');
const membersRoutes = require('./routes/routes'); 
const app = express();


app.use(express.json());



app.use("/members", membersRoutes);


module.exports = app;



