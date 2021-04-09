const express = require("express");
const app = express();
require("dotenv").config();
require("./database/connection");

app.use(require("cors")());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/user", require("./routes/api/auth"));
app.use("/api/product", require("./routes/api/product"));

app.listen(process.env.PORT, () => {
    console.log("Server running on port", process.env.PORT);
});
