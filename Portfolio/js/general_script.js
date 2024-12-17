// This script adds typewriting effects to some headers.


document.addEventListener("DOMContentLoaded", function () {
    // My name on the homepage
    const my_name = document.querySelector("#my-name");
    
    // Checking if the element exists before applying the typewriter effect
    if (my_name) {
        applyTypewriterEffectIfVisible(my_name, 50); 
    }

    // Header "About Me" on the homepage
    const about_me = document.querySelector(".about-me h2");
    if (about_me) {
        applyTypewriterEffectIfVisible(about_me, 120);
    }
});


// Function to create the typewriter effect on an element
function typewriterEffect(element, text, delay = 100) {
    let index = 0;  // Start at the first character

    element.textContent = "";  // Clear any existing content in the element to avoid writing the text twice

    //Typing effect is made by adding one character at a time
    function type() {
        if (index < text.length) {
            element.textContent += text[index];  // Append the next character
            index++;  
            setTimeout(type, delay);  // Call the function again after a delay to simulate typing
        }
    }
    type();  // Initial call to the type function to start the effect (it's a recursive function)
}

// An IntersectionObserver triggers the typewriter effect only when the element is visible
// Without this, by the time the user scrolls down, the effect has already happened.
function applyTypewriterEffectIfVisible(element, delay) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Check if the element is visible in the viewport
            if (entry.isIntersecting) {
                typewriterEffect(element, element.textContent, delay);  
                // Once the effect is applied, stop observing the element to prevent it from running again
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 1
    });

    // Necessary to add the .observe() method. IntersectionObserver does not start without it.
    observer.observe(element);
}