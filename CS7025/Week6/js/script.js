$(document).ready(function () {
    let data = [];

/*     $.ajax({
        url: "images.json",
        dataType: "json",
        success: function (data) {
            console.log(data);

            $('#changeBg').click(function() {
                changeBackground($('.wrapper'), 'london.jpg')
            })
        },

        error: function(){
            console.log("Error while loading the JSON file")
        }
    }); */

    let cities = ['barcelona', 'london', 'new-york', 'paris'];
    let currentCityIndex = 0;


    $('#changeBg').click(function() {
        changeBackground($('.wrapper'), cities[currentCityIndex]);
        currentCityIndex = (currentCityIndex + 1) % cities.length;
    })
    
    function changeBackground(element, city){
        element.css("background-image", `url("images/${city}.jpg")`);
    }
});

