const express = require("express");
const path = require("path");
const PORT = 8000;

const app = express();

// "static" route of evth i want to send to my cliends that is not gonna change
app.use(express.static(path.join(__dirname, "./assets")));

// whenever a request for "/" this specific location, do that
app.get("/", function (req, res) {
res.sendFile(path.join(__dirname, "/index.html"));
});

// do that by listening to this PORT
app.listen( PORT, () => {
console.log( "App running on http://localhost:" + PORT );
});