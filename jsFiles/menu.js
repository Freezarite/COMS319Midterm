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
            selectedDot.style.bottom = '0px'; // Adjust based on your layout

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