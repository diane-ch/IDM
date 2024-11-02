document.addEventListener("DOMContentLoaded", () => {
    console.log("ready");

    // Creating a paragraph and adding it to the html page
    let paragraph = document.createElement("p");
    paragraph.textContent = "Hello World!";    
    document.body.appendChild(paragraph);

    // Creating a button that says "click" and adding it to the html page
    let btn = document.createElement("button");
    btn.textContent = "Click";
    document.body.appendChild(btn);

    // Changing the ID of an element
    document.getElementById("items").setAttribute("id", "list");


})