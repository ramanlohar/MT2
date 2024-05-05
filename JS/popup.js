const popupOverlay = document.getElementById('popupOverlay');
const closePopupBtn = document.getElementById('closePopup');
const cancelBtn = document.getElementById('cancelBtn');
const popupForm = document.getElementById('popupForm');

// Show popup form
function showPopup() {
    popupOverlay.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Hide popup form
function hidePopup() {
    popupOverlay.style.display = 'none';
    document.body.style.overflow = ''; // Enable scrolling
    popupForm.reset();
}

// Event listeners
document.addEventListener('click', function(event) {
    if (event.target === popupOverlay) {
        hidePopup();
    }
});

closePopupBtn.addEventListener('click', hidePopup);
cancelBtn.addEventListener('click', hidePopup);
// popupForm.addEventListener('submit', function(event) {
//     event.preventDefault();
//     // Handle form submission here (save data or perform validation)
//     hidePopup();
// });
