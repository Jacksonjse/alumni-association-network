const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();


const alumniRoutes = require('./routes/alumniroutes');

const app = express();
app.use(cors());


app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.use('/api/alumni', alumniRoutes);

app.get('/', (req, res) => {
    res.send("Server API running successfully ✅");
  });

app.listen(5000, () => console.log("Server running on port 5000"));
