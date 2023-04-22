// wiki.js - Wiki route module.

const express = require('express');
const membersRoutes = require('./routes/membersRoutes');
const songsRoutes = require('./routes/songsRoutes');
const genresRoutes = require('./routes/genresRoutes'); 
const typesRoutes = require('./routes/typesRoutes'); 
const projectsRoutes = require('./routes/projectsRoutes'); 

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use("/members", membersRoutes);
app.use("/songs", songsRoutes);
app.use("/genres", genresRoutes);
app.use("/types", typesRoutes);
app.use("/projects", projectsRoutes);


module.exports = app;



