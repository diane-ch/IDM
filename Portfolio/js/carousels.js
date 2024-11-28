$(document).ready(function() {
    console.log("Ready 2");

    new Carousel("data/photos.json", "#carousel-container", 1);
    new Carousel("data/photos2.json", "#another-carousel-container", 2);
    console.log("everything okay");
    
});


class Carousel {
    constructor(dataUrl, carouselContainerSelector, id) {
        this.dataUrl = dataUrl; //folder where the images are stored
        this.carouselContainer = $(carouselContainerSelector); // jQuery object conataining the carousel
        this.id = id; // Unique identifier for the carousel


        // Dynamically create jQuery objects for the display and buttons
        this.$display = $(`<div id="image-display-${id}" class="image-display"></div>`);
        this.$prevButton = $(`<button id="prev-button-${id}" class="prev">Previous</button>`);
        this.$nextButton = $(`<button id="next-button-${id}" class="next">Next</button>`);


        this.images = [];
        this.currentIndex = 0;

        // Load data and initialize
        this.loadData().then(() => {
            this.initializeCarousel();
            this.attachEventListeners();
        });

    }


    async loadData() {
        try {
            const response = await $.getJSON(this.dataUrl);
            this.images = response.images.map(img => img.image);
        } catch (error) {
            console.error('Error loading JSON data:', error);
        }
    }


    initializeCarousel() {
        // Append dynamically created elements to the container
        this.carouselContainer.append(this.$prevButton);
        this.carouselContainer.append(this.$display);
        this.carouselContainer.append(this.$nextButton);


        // Load the first image
        if (this.images.length > 0) {
            this.updateImage();
        } else {
            console.warn('No images found in the data.');
        }
    }

    attachEventListeners() {
        // Attach click events to the buttons
        this.$prevButton.on('click', () => this.showPreviousImage());
        this.$nextButton.on('click', () => this.showNextImage());
    }


    showPreviousImage() {
        // Navigate to the previous image
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateImage();
    }

    showNextImage() {
    }


    updateImage() {
    }
}
