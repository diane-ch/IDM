require('dotenv').config({ path: './credentials.env' }); // Load environment variables from .env file


const DBCONFIG = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
}; // Save into a variable


// server.js
// Import required modules
const express = require('express'); // Express framework for handling HTTP requests
const mysql = require('mysql2'); // MySQL2 client for Node.js
const cors = require('cors'); // For web security
const port = 3040;
// Create an instance of express
const app = express();
app.use(cors());


// save connection
let connection = mysql.createConnection(DBCONFIG);


//make callback function for DB connection
function onConnectionReady(error) {
    if (error != null) {
        //there's an error - deal with it
    } else {
        //there's no error - success
    }
}
//connect to database
connection.connect(onConnectionReady);


// Define a route for the root URL '/'
app.get('/', (req, res) => {
    // Respond with a JSON message
    return res.json("Success!");
});

// Define a route to fetch all items from the 'items' table
app.get('/students', (req, res) => {
    const sql = "SELECT * FROM students"; 
    connection.query(sql, (err, data) => { // <-- Use 'connection' instead of 'db'
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).json({ error: "Database query failed" });
        }
        return res.json(data);
    });
});


// Define a route to fetch an item from the 'students' table
app.get("/testmysql/:username", (req, res) => {
    const query = "SELECT * FROM `students` WHERE email ='" + req.params.username + "'";
    console.log(query); //you can remove this later
    connection.query(query, (err, data) => { // Execute the SQL query
        if (err) return res.json(err); // If there's an error, return the error
        return res.json(data); // Otherwise, return the data as JSON
    })
});



// Start the server
app.listen(port, () => console.log(`App listening on port ${port}!`));