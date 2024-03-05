//menue logic
document.addEventListener('DOMContentLoaded', function () {
    var navLinks = document.querySelectorAll('.nav-menu .nav-link');
    var navMenu = document.querySelector('.nav-menu'); // Get the nav menu container
    var dot = document.querySelector('.hover-dot');
    var selectedDot = document.querySelector('.selected-dot'); // Get the selected-dot
    var currentLink = document.querySelector('.nav-menu .current'); // Get the current menu item

    // Function to position the selected-dot under the current menu item
    function positionSelectedDot() {
        if (currentLink) {
            var linkRect = currentLink.getBoundingClientRect();
            var menuRect = navMenu.getBoundingClientRect();
            var leftPosition = linkRect.left - menuRect.left + (linkRect.width / 2) - 3; // Center the dot under the current link

            selectedDot.style.left = leftPosition + 'px'; // Move dot to this new position
            selectedDot.style.bottom = '-10px'; // Adjust based on your layout

        }
    }

    // Position the selected-dot under the current menu item on page load
    positionSelectedDot();

    navLinks.forEach(function (link) {
        link.addEventListener('mouseenter', function () {
            var linkRect = link.getBoundingClientRect();
            var menuRect = link.closest('.nav-menu').getBoundingClientRect();
            var leftPosition = linkRect.left - menuRect.left + (linkRect.width / 2) - 3;

            dot.style.opacity = 1;
            dot.style.left = leftPosition + 'px';
        });

        link.addEventListener('mouseleave', function () {
            dot.style.opacity = 0;
            dot.style.left = '-20px';
        });
    });

});

function createCarouselElements(jsonData) {
    var carouselContainer = document.getElementById("carousel-container");
    var first = true;
    jsonData["carousel-elements"].forEach(element => {

        var carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");
        if (first) {
            carouselItem.classList.add("active");
            first = false;
        }

        var cImageContainer = document.createElement("div");
        cImageContainer.classList.add("cImage-container")

        var image = document.createElement("img");
        image.setAttribute("src", element["img-path"]);
        image.setAttribute("alt", element["img-alt"]);
        image.classList.add("d-block");
        image.classList.add("cImage");

        cImageContainer.appendChild(image);

        if (element["credit-desc"] == "") {
            carouselItem.appendChild(cImageContainer)
            carouselContainer.appendChild(carouselItem);
            return;
        }

        var creditAnchor = document.createElement("a");
        creditAnchor.setAttribute("href", element["credit-src"]);
        creditAnchor.innerHTML = element["credit-desc"];

        var creditContainer = document.createElement("div");
        creditContainer.classList.add("image-credit");
        creditContainer.appendChild(creditAnchor);

        cImageContainer.appendChild(creditContainer);
        carouselItem.appendChild(cImageContainer);
        carouselContainer.appendChild(carouselItem);
    })
}


function createBanner(jsonData) {

    var bannerContainer = document.getElementById("banner");
    var bannerText = document.createElement("p");
    bannerText.innerHTML = ''; // Initially empty
    bannerText.classList.add("banner-text");
    bannerContainer.appendChild(bannerText);

    // Start the typing animation for the newly added bannerText
    let typedText = '';
    let index = 0;
    const originalText = jsonData["banner-text"]; // Use the dynamic text from jsonData

    function typeLetter() {
        if (index < originalText.length) {
            const currentChar = originalText.charAt(index);
            if (currentChar === '\n') {
                typedText += '<br>'; // Add a line break for newlines
            } else {
                typedText += currentChar;
            }
            bannerText.innerHTML = typedText;
            index++;
            setTimeout(typeLetter, 100); // Adjust typing speed
        }
    }

    typeLetter(); // Start typing effect
}


//fetchin json data
fetch('../data/index.json')
    .then(response => response.json())
    .then(data => {
        createCarouselElements(data);
        createBanner(data);
    })
    .catch(error => console.error('Error fetching JSON:', error));

$('.carousel').carousel({
    interval: 2000
});
