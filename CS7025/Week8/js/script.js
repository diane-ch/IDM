// Writing a cookie
function setCookie(cookieKey, cookieValue, exdays) {
    const cookieDate = new Date(); // get the current day
    const expiryDaysInMs = exdays * 24 * 60 * 60 * 1000; // expiration day in ms
    console.log(expiryDaysInMs);
    
    cookieDate.setTime(cookieDate.getTime() + expiryDaysInMs); // expiration time added to the current time
    console.log(cookieDate);
    
    let expires = "expires=" + cookieDate.toUTCString(); // converts to a UTC string for compatibility with cookie format
    console.log(expires);
    
    document.cookie = cookieKey + "=" + cookieValue + ";" + expires + ";path=/"; // "path=/" makes the cookie available for the whole site
}

$(document).ready(function () {
    // Stores this cookie for 1 day 
    setCookie("username", "Diane", 1);

    const button = document.getElementById("like-btn");
    const nb_likes = document.getElementById("click-count");

    // Option 1 : If we want to reset the nb of likes when the page is reloaded 
    let clickCount = 0;
    localStorage.setItem("clickCount", clickCount);

    // Option 2 : If we don't want to reset the nb of likes
    // let clickCount = localStorage.getItem("clickCount") || 0;


    nb_likes.textContent = clickCount;

    button.addEventListener("click", function() {
        clickCount++;
        localStorage.setItem("clickCount", clickCount);
        nb_likes.textContent = clickCount;
    })

});






