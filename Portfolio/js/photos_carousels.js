$(document).ready(function () {
    console.log("ready");

    new Carousel("data/projects.json", "#carousel-container-programming-1", "programming", "programming-1");
    new Carousel("data/projects.json", "#carousel-container-programming-2", "programming", "programming-2");
    new Carousel("data/projects.json", "#carousel-container-programming-3", "programming", "programming-3");

    new Carousel("data/projects.json", "#carousel-container-modelling-1", "modelling", "modelling-1");
    
    new Carousel("data/projects.json", "#carousel-container-design-1", "design", "design-1");

    console.log("everything okay");
});

class Carousel {
    // Constructor method is automatically called when a new object of the class Carousel is created
    constructor(dataUrl, carouselContainerSelector, category, projectId) {
        this.dataUrl = dataUrl; //url of the folder where the images are stored in
        this.carouselContainer = $(carouselContainerSelector); // jQuery object containing the carousel (the images and the buttons)
        this.category = category; // Category of the project (e.g., "programming", "design")
        this.projectId = projectId; // unique ID of the carousel, to help distinguish between several carousels

        this.images = []; // To stock the images loaded from the JSON file
        this.currentIndex = 0; // Index of the image currently displayed

        // To ensure the data is loaded first (asynchronous operation), we use a 'then' block inside the constructor
        // That way, the carousel is initialized and the event listeners are attached only after the data is ready.        
        this.loadData().then(() => {
            this.createCarousel();
            this.attachEventListeners();
        });
    }

    async loadData() {
        try {
            const response = await $.getJSON(this.dataUrl);
    
            // Checking if the category exists
            const categoryData = response[this.category];
            if (!categoryData) {
                console.error(`Category "${this.category}" not found in the JSON.`);
                return;
            }
    
            // Find the corresponding project inside the category
            const projectData = categoryData.find(p => p["id-project"] === this.projectId);
            if (projectData) {
                // Store both the image paths and alt descriptions
                this.images = projectData.images.map(img => img.image);
                this.imagesData = projectData.images;  // Store image data (including alt)
                console.log(`Images loaded for ${this.projectId}:`, this.images);
            } else {
                console.error(`Project with ID "${this.projectId}" not found in category "${this.category}".`);
            }
        } catch (error) {
            console.error("Error loading JSON data:", error);
        }
    }
    

   /* createCarousel() {
        // Dynamically create jQuery objects for the display and buttons
        this.$prevButton = $('<button class="prev">&lt</button>');
        this.$display = $('<div class="image-display"></div>');
        this.$nextButton = $('<button class="next">&gt</button>');
        this.$description = $('<p class="image-description"></p>');  

        // Append dynamically created elements to the container
        this.carouselContainer.append(this.$prevButton);
        this.carouselContainer.append(this.$display);
        this.carouselContainer.append(this.$nextButton);
        this.carouselContainer.append(this.$description);


        // Display the first image
        if (this.images.length > 0) {
            this.updateImage();
        } else {
            console.warn(`No images found for project ${this.projectId}.`);  // important to check if the images exist, otherwise the code won't work
        }
    }*/

    createCarousel() {
        // Créer les éléments dynamiquement
        this.$prevButton = $('<button class="prev">&lt</button>'); // Bouton précédent
        this.$nextButton = $('<button class="next">&gt</button>'); // Bouton suivant
        this.$display = $('<div class="image-display"></div>'); // Conteneur pour l'image
        this.$description = $('<p class="image-description"></p>'); // Description de l'image
    
        // Conteneur pour la ligne des flèches et de l'image
        const $imageRow = $('<div class="image-row"></div>');
        $imageRow.append(this.$prevButton, this.$display, this.$nextButton); // Ajouter les flèches et l'image à la ligne
    
        // Ajouter les éléments au conteneur principal
        this.carouselContainer.append($imageRow);
        this.carouselContainer.append(this.$description);
    
        // Afficher la première image
        if (this.images.length > 0) {
            this.updateImage();
        } else {
            console.warn(`No images found for project ${this.projectId}.`);
        }
    }
    

    attachEventListeners() {
        // Attach click events to the 'prev/next' buttons
        this.$prevButton.on("click", () => this.showPreviousImage());
        this.$nextButton.on("click", () => this.showNextImage());
    }

    showPreviousImage() {
        // Navigate to the previous image
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateImage();
    }

    showNextImage() {
        // Navigate to the next image
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateImage();
    }

    updateImage() {
        const imageSrc = this.images[this.currentIndex];  // Get the image path
        const imageAlt = this.imagesData[this.currentIndex].alt;  // Access the alt text from the imagesData
    
        const $currentImg = this.$display.find("img");
    
        if ($currentImg.length > 0) {
            $currentImg.fadeOut("slow", function () {
                $(this).attr("src", imageSrc).fadeIn("slow");
            });
        } else {
            this.$display.html(`<img src="${imageSrc}" alt="${imageAlt}" style="display:none;">`);
            this.$display.find("img").fadeIn("slow");
        }
    
        // Update the description dynamically
        this.$description.text(imageAlt);
    }
    

}
