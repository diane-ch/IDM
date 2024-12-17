// This script manages the behavior of a pop-up message on the contact form page.
// When the form is submitted, a "Thank you" message is displayed.
// Once the user has submitted the form, another message is shown to inform them that they have 
// already submitted this form, but they can submit another one if they would like.

$(document).ready(function () {
    const messageElement = $('.message-pop');

    // Check if the form has been submitted previously
    const hasSubmitted = localStorage.getItem('hasSubmitted');

    // If the form has been submitted before, show a message
    if (hasSubmitted) {
        messageElement.text("You have contacted me, feel free to ask again if I have not responded.");
        messageElement.addClass('show');
    }

    // Handle form submission
    $('form').on('submit', function (event) {
        event.preventDefault();

        // Set the form as "submitted" in the local storage
        localStorage.setItem('hasSubmitted', 'true');

        // Display the thank you message
        messageElement.text("Thank you for your message, I will get back to you very soon!");
        messageElement.addClass('show');
        console.log("Thank you message is displayed");
        
        
        // Reset the form after submission
        $('form')[0].reset();

        // Hide the thank you message after 5 seconds and show the other message
        setTimeout(function () {
            messageElement.removeClass('show'); // Hide the thank you message
            
            // Show the message saying the user has contacted before
            messageElement.text("You have contacted me, feel free to ask again if I have not responded after three days.");
            messageElement.addClass('show');
        }, 5000); 
    });
});
