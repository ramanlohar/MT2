    // script.js

    document.addEventListener("DOMContentLoaded", function () {
    var ellipsisBtn = document.getElementById("ellipsisBtn");
    var optionsSection = document.getElementById("optionsSection");

    // Toggle options section visibility when the ellipsis button is clicked
    ellipsisBtn.addEventListener("click", function (event) {
        event.stopPropagation(); // Stop the click event from propagating
        optionsSection.style.display = optionsSection.style.display === "none" ? "block" : "none";
    });

    // Hide options section when clicking outside of it
    document.addEventListener("click", function (event) {
        if (!optionsSection.contains(event.target)) {
            optionsSection.style.display = "none";
        }
    });
});