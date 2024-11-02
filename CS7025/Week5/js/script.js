let images = ["barbie.jpg", "harry_potter.jpg", "joker.jpg", "pride_and_prejudice.jpg"];

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded");

    document.getElementById("pickImageButton").addEventListener('click', () => {
        console.log("click");

        // Pick a random integer between 0 and 3
        let max = 4;
        let randomInt = Math.floor(Math.random() * max);
        console.log("random nb", randomInt);

        // Pick an image using the random number
        let img_value= "img/"+ images[randomInt];
        console.log("img", img_value);

        // Setting the source of the image with the ID #moviePoster 
        document.getElementById("moviePoster").setAttribute("src", img_value)

    });
})

