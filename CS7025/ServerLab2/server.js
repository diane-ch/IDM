/* Modules and Variables */

const express = require('express'); //required to use 'express' module that allows to template our pages
const path = require("path"); //required to use 'path' module that gets the current directory
const app = express(); //create an app from express
const port = 3000; //define our port number, this doesn’t have to be 3000

app.use(express.static("assets"));

/* Views Setup */

// Set up the 'views' directory for EJS templates
app.set('views', path.join(__dirname, 'views')); //tells Express to look for EJS templates in the 'views' directory
// Set EJS as the view engine
app.set('view engine', 'ejs'); //configures Express that EJS is the templating engine we want to use


/* Setup a basic route and start the server */

// Define a basic route for the root URL ("/")
app.get('/', (req, res) => {
    res.send('Hello, You\'ve reached your Application babygirl!!');
});

// Start the server
app.listen(port, () => console.log(`App listening on port: ${port}`));

app.get("/greet/:greeting/:personName/:surname", (req, res) => {
    const greeting = req.params.greeting;
    const name = req.params.personName;
    const surname = req.params.surname;
    // const message = `${greeting} ${name} ${surname}`;
    // res.send(message); //res.send can be used for simple text, json or arrays
    return res.render("greetings", {
        data: { greeting, name, surname }
    });
});

app.get("/photo/:user/:username/:filename", (req, res) => {
    const user = req.params.user;
    const username = req.params.username;
    const filename = req.params.filename;
    return res.render("photos", {
        data: { user, username, filename }
    });
})