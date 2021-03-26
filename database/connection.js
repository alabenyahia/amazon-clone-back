const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URL)
    .then(()=> console.log("Database connected"))
    .catch(err => console.log("Database connection error", err))