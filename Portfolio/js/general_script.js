// Appliquer l'effet sur un titre
document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector(".topic-name");
    if (header) {
        typewriterEffect(header, header.textContent, 100);
    }

    const my_name = document.querySelector("#my-name");
    if (my_name) {
        typewriterEffect(my_name, my_name.textContent, 50);
    }
});



function typewriterEffect(element, text, delay = 100) {
    let index = 0;

    element.textContent = "";

    function type() {
        if (index < text.length) {
            element.textContent += text[index];
            index++;
            setTimeout(type, delay);
        }
    }
    type();
}

