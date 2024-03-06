document.addEventListener('DOMContentLoaded', function () {
    var navLinks = document.querySelectorAll('.nav-menu .nav-link');
    var navMenu = document.querySelector('.nav-menu');
    var dot = document.querySelector('.hover-dot');
    var selectedDot; // Define selectedDot here but do not select it yet
    var currentLink; // Define currentLink here but do not select it yet

    function positionSelectedDot() {
        selectedDot = document.querySelector('.selected-dot');
        currentLink = document.querySelector('.nav-menu .current');

        if (currentLink) {
            var linkRect = currentLink.getBoundingClientRect();
            var menuRect = navMenu.getBoundingClientRect();
            var leftPosition = linkRect.left - menuRect.left + (linkRect.width / 2) - 3;

            selectedDot.style.left = leftPosition + 'px';
            selectedDot.style.bottom = '0px';
        }
    }

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

    // Fetch the header data, then position the dot
    fetch('../data/profile.json')
        .then(response => response.json())
        .then(data => {
            putDataIntoHeader(data);
            positionSelectedDot();
        })
        .catch(error => console.error('Error fetching JSON:', error));
});

function putDataIntoHeader(json) {
    let headerImg = document.getElementById("header-main-img");
    let mainButton = document.getElementById("header-main-button");

    headerImg.src = json["img-src"];
    headerImg.alt = json["img-alt"];

    mainButton.innerHTML = json["name"];
}
