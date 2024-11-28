$(document).ready(function() {
    console.log("Ready");

    // Image carousel
    let images;
    let currentIndex = 0;

    // Load JSON data
    $.ajax({
        url: "data/photos.json",
        success: function(data) {
            images = data;
            initialise();
            console.log(images);
            
        }
    });

    // Initialize the carousel with the first image
    function initialise() {
     updateImage();
}

    // Update image in the carousel
    function updateImage() {
        const oldImage = $('#image-display').find('img');


        if (oldImage.length > 0) {
            oldImage.fadeOut("slow", function() {
                const imageSrc = images.images[currentIndex].image;
                // Update the `src` of the existing `img` and fade it back in
                oldImage.attr('src', imageSrc).fadeIn("slow");
            });
        } else {
            // If no image exists, append a new image and fade it in
            const imageSrc = images.images[currentIndex].image;
            $('#image-display').append(`<img src="${imageSrc}" alt="Product Image" style="display:none;">`).find('img').fadeIn("slow");
        }
    }


    // Next button functionality
    $('#next').on('click', function() {
        if (currentIndex < images.images.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateImage()
    });


    // Previous button functionality
    $('#prev').on('click', function() {});

    
}); // end document ready
