// import modules
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

// import db connection
const dbConnection = require("../shared/config/db-connection");
dbConnection(process.env.CONNECTION_STRING)
    .then(res => console.log("Connected to the db!"))
    .catch(err => console.log("Error: ", err));

// import routes
const matchRoutes = require("./routes/matchRouter");

// app initialization
const app = express();

// constants
// const PORT = process.env.PORT;

// utility middlewares
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// custom middlewares
app.use("/api/football/v1/results", matchRoutes);

// all other routes
app.all("/{*splat}", (req, res) => {
    return res.sendFile(path.join(__dirname, "public", "api-docs.html"));
});

// app.listen(PORT, () => console.log(`App listening on PORT:${PORT}`));

module.exports = app;