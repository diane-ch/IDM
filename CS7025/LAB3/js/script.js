$(document).ready(function() {
    console.log("Ready");

    // Read in and print the data from our JSON file
    $.ajax({
        url: "data/idm.json",
        success: function(data) {
            console.log(data);
            
            let modules_list = data.module;            
            let nb_modules = modules_list.length;         

            for (i=0;i<nb_modules;i++) {
                $('.modules').append(data.module[i].lecturer + '<br>');
            }
        }

    })

    $('#img1').click(function() {
        $(this).hide();
    });
    $('#img2').dblclick(function() {
        $(this).hide();
    });

    $('.colourblock').mouseenter(function () {
        $(this).css('background-color', 'green');
    });
    $('.colourblock').mouseleave(function () {
        $(this).css('background-color', 'blue');
    });

    $('.colourblockhover').hover(function() {
        $(this).css('background-color', 'yellow');
    },
    function() {
        $(this).css('background-color', 'red');
    });

    $(".colourblockevents").on({
        mouseenter: function() {$(this).css('background-color', 'pink')},
        mouseleave: function() {$(this).css('background-color', 'purple')},
        click: function() {$(this).css('width', '200px', 'height', '200px')}
    }); 


    $(".sliderbutton").click(function() {
        $(".slidercontent").slideToggle("slow");
    });





    
}); // end document ready