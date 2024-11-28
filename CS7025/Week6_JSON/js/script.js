// The use of the JSON file is working if the webpage is open through the www folder
// https://www.scss.tcd.ie/~chounlad/javascript/Week6/index.html

$(document).ready(function () {
    let cities = [];
    let currentCityIndex = 0;

    $.ajax({
        url: "images.json",
        dataType: "json",
        success: function (data) {
            // Store the data from JSON into the cities array
            cities = data;

            // Button click event to change the background
            $('#changeBg').click(function() {
                const city = cities[currentCityIndex];
                changeBackground($('.wrapper'), city.img_path);
                currentCityIndex = (currentCityIndex + 1) % cities.length;
            });
        },

        error: function(){
            console.log("Error while loading the JSON file");
        }
    });

    function changeBackground(element, imgPath){
        element.css("background-image", `url("images/${imgPath}")`);
    }
});
