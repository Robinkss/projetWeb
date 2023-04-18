// wiki.js - Wiki route module.

const express = require('express');
const membersRoutes = require('./routes/membersRoutes');
const songsRoutes = require('./routes/songsRoutes'); 
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use("/members", membersRoutes);
app.use("/songs", songsRoutes);


module.exports = app;



