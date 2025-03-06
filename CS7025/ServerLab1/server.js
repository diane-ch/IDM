// Import the built-in 'http' module
var http = require("http");


// Define a port number for the server to listen on
// The port can be any number between 0 and 65535, but it's common practice to use ports like 3000 or 8000.
const PORT = 3000;

/*
// Create the server
var server = http.createServer((request, response) => {
  // Send a simple response to the client
  response.write("Hello");
  response.end();
});
*/

// Create a server with different routes
var server = http.createServer((request, response) => {
    if (request.url === "/") {
        response.write("Welcome to the Home Page");
    } else if (request.url === "/about") {
        response.write("About Us");
    } else {
        response.write("404: Page Not Found");
    }
    response.end();
})


// Start the server and listen on the specified port
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
