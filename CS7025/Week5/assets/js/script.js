let images = ["barbie.jpg", "harry_potter.jpg", "joker.jpg", "pride_and_prejudice.jpg"];

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded");

    document.getElementById("pickImageButton").addEventListener('click', () => {
        console.log("click");

        let max = 4;
        let randomInt = Math.floor(Math.random() * max);
        console.log("random nb", randomInt);
        let img_value= "../img/"+ images[randomInt];
        console.log("img", img_value);
        document.getElementById("moviePoster").setAttribute("src", img_value)

    });
})

