$(document).ready(function () {
    const messageElement = $('.message-pop');

    // Check if the form has been interacted with before
    const hasInteracted = localStorage.getItem('hasInteracted');
    const hasSubmitted = localStorage.getItem('hasSubmitted');

    // If the user has interacted with the form before, show the message
    if (hasInteracted) {
        messageElement.text("You started to fill this form before already! Do not hesitate anymore, and contact me :)");
        messageElement.addClass('show');
    }

    // If the user has submitted the form, show a different message
    if (hasSubmitted) {
        messageElement.text("You have contacted me: if I don't get back to you in 3 days, don't hesitate to send another message!");
        messageElement.addClass('show');
    }

    // Monitor form field interactions (first time interaction)
    $('form input, form textarea').on('input', function () {
        if (!hasInteracted) {
            localStorage.setItem('hasInteracted', 'true'); // Flag interaction
            messageElement.text("You started to fill this form before already! Do not hesitate anymore, and contact me :)");
            messageElement.addClass('show');
        }
    });

    // Handle form submission
    $('form').on('submit', function (event) {
        event.preventDefault();
        
        // Flag the form as submitted
        localStorage.setItem('hasSubmitted', 'true');
        messageElement.text("You have contacted me: if I don't get back to you in 3 days, don't hesitate to send another message!");
        messageElement.addClass('show');
        
        // Reset the form after submission
        $('form')[0].reset();
    });
});
