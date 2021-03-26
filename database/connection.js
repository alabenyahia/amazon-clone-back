const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
    .then(()=> console.log("Database connected"))
    .catch(err => console.log("Database connection error", err))