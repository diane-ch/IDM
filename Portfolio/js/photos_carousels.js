// This script generates photo carousels for my projects.
// For each project, it is possible to navigate between several illustrations.
// The user can choose to navigate with the arrows on the "normal page". Or, the user can
// click on the images to open a modal box. With the modal box, the user may navigate with the
// arrows or with the keyboard.


$(document).ready(function () {
    console.log("Ready");

    // Creation of the five different carousels
    // For each carousel, a category and project ID are defined to filter the images.
    new Carousel("data/projects.json", "#carousel-container-programming-1", "programming", "programming-1");
    new Carousel("data/projects.json", "#carousel-container-programming-2", "programming", "programming-2");
    new Carousel("data/projects.json", "#carousel-container-programming-3", "programming", "programming-3");
    new Carousel("data/projects.json", "#carousel-container-modelling-1", "modelling", "modelling-1");
    new Carousel("data/projects.json", "#carousel-container-design-1", "design", "design-1");

    console.log("Carousels created.");
});


// Creation of the class Carousel
class Carousel {
    // Constructor initializes the carousel with the given project data and container.
    // It loads the project data, then creates the carousel and attaches event listeners.
    constructor(dataUrl, carouselContainerSelector, category, projectId) {
        this.dataUrl = dataUrl; // URL of the folder where the images are stored in
        this.carouselContainer = $(carouselContainerSelector); //jQuery object containing the carousel (image, buttons)
        this.category = category; // Category of the project ("programming", "modelling", "design")
        this.projectId = projectId; // Unique ID of the carousel, to help distinguish between the several carousels

        this.images = []; // To stock the images loaded from the JSON file
        this.currentIndex = 0; // Index of the image currently displayed

        // To ensure the data is loaded first (asynchronous operation), we use a 'then' block inside the constructor
        // That way, the carousel is initialized and the event listeners are attached only after the data is ready.        
        this.loadData().then(() => {
            this.createCarousel();
            this.attachEventListeners();
        });
    }

    // Loads the project data from the JSON file, filters by category and project ID,
    // and stores the images for the specified project.
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
                // Store the images for the specific project within this category
                this.images = projectData.images.map(img => img.image); // Creates an array with the URL of the images only
                this.imagesData = projectData.images;
                console.log(`Images loaded for ${this.projectId}:`, this.images);
            } else {
                console.error(`Project with ID "${this.projectId}" not found in category "${this.category}".`);
            }
        } catch (error) {
            console.error("Error loading JSON data:", error);
        }
    }

    // Creates the carousel by adding navigation buttons, an image display area,
    // and setting up the modal for image viewing.
    createCarousel() {
        this.$prevButton = $('<button class="prev">&lt</button>'); // The "previous" and "next" buttons are the arrows "<" and ">"
        this.$nextButton = $('<button class="next">&gt</button>');
        this.$display = $('<div class="image-display"></div>');
        this.$description = $('<p class="image-description"></p>');

        const $imageRow = $('<div class="image-row"></div>'); // To keep the image and the arrows aligned on the same line
        $imageRow.append(this.$prevButton, this.$display, this.$nextButton);

        this.carouselContainer.append($imageRow);
        this.carouselContainer.append(this.$description);


        // Update the image unless no images are found (then, warning message)
        if (this.images.length > 0) {
            this.updateImage();
        } else {
            console.warn(`No images found for project ${this.projectId}.`);
        }

        // If the modal doesn't already exist, create it dynamically.
        if ($("#image-modal").length === 0) {
            $("body").append(`
                <div class="image-modal" id="image-modal" style="display: none;">
                    <span class="close-modal">&times;</span>
                    <button class="modal-prev">&lt;</button>
                    <div class="modal-content">
                        <img src="" alt="Modal Image">
                    </div>
                    <button class="modal-next">&gt;</button>
                </div>
            `);
        }
    }

    // Attach event listeners for the previous and next buttons, image clicks, and modal actions.
    attachEventListeners() {
        this.$prevButton.on("click", () => this.showPreviousImage());
        this.$nextButton.on("click", () => this.showNextImage());
        
        // Opens the modal when you click on the image
        this.$display.on("click", "img", () => this.openModal());
        // Closes the modal by clicking on the cross
        $(document).on("click", ".close-modal", () => this.closeModal());
        // Keyboard navigation in the modal
        $(document).on("keydown", (e) => this.handleKeyboardNavigation(e));
        // Arrows navigation in the modal
        $(document).on("click", ".modal-prev", () => this.showPreviousImageInModal());
        $(document).on("click", ".modal-next", () => this.showNextImageInModal());
    }

    // Opens the modal to display the image at the current index 
    openModal() {
        const imageSrc = this.images[this.currentIndex];

        const $modal = $("#image-modal");
        $modal.find("img").attr("src", imageSrc); // browses to find to all the images and changes the URL to the one of the current index
        $modal.fadeIn("fast");  

        this.isModalOpen = true;
    }

    // Closes the modal
    closeModal() {
        $("#image-modal").fadeOut("fast");
        this.isModalOpen = false;
    }

    // Handles keyboard navigation (left and right arrows for image change,
    // and escape key for closing the modal)
    handleKeyboardNavigation(e) {
        // No navigation if the modal is not open
        if (!this.isModalOpen) return;

        if (e.key === "ArrowLeft") {
            this.showPreviousImageInModal();
        } else if (e.key === "ArrowRight") {
            this.showNextImageInModal();
        } else if (e.key === "Escape") {
            this.closeModal();
        }
    }

    // Navigates to the previous image in the modal.
    showPreviousImageInModal() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateModalImage();
    }

    // Navigates to the next image in the modal.
    showNextImageInModal() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateModalImage();
    }

    // Updates the modal image based on the current index.
    updateModalImage() {
        const imageSrc = this.images[this.currentIndex];
        const imageAlt = this.imagesData[this.currentIndex].alt;

        const $modal = $("#image-modal");
        $modal.find("img").fadeOut("fast", function () {
            $(this).attr("src", imageSrc).attr("alt", imageAlt).fadeIn("fast");
        });
    }

    // Navigates to the previous image on the carousel.
    showPreviousImage() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateImage();
    }

    // Navigates to the next image on the carousel.
    showNextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateImage();
    }

    // Updates the carousel display with the current image and its description.
    updateImage() {
        const imageSrc = this.images[this.currentIndex];
        const imageAlt = this.imagesData[this.currentIndex].alt;

        const $currentImg = this.$display.find("img"); // Find the image in the current container ($display)

        // If the image already exists (has already been displayed)
        if ($currentImg.length > 0) {
            $currentImg.fadeOut("fast", function () {
                $(this).attr("src", imageSrc).fadeIn("fast");
            });
        } else { // If it is the first time the image is displayed
            // the image is added and immediately hidden (display:none) so it can be displayed smoothly
            this.$display.html(`<img src="${imageSrc}" alt="${imageAlt}" style="display:none;">`);
            this.$display.find("img").fadeIn("fast");
        }

        this.$description.text(imageAlt);
    }
}
