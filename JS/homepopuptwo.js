const popup = document.getElementById('popup');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');

let currentContactId = null;

function deleteContact(id) {
    currentContactId = id;
    popup.style.display = 'block';
}

yesBtn.addEventListener('click', () => {
    if (currentContactId !== null) {
        // Remove the contact from localStorage
        localStorage.removeItem('con' + currentContactId);
        localStorage.removeItem('con_list' + currentContactId);
        // Reload contacts
        loadcontacts();
        closePopup();
    }
});

noBtn.addEventListener('click', () => {
    closePopup();
});

// Close the popup when clicking anywhere on it
popup.addEventListener('click', () => {
    closePopup();
});

function closePopup() {
    popup.style.display = 'none';
    currentContactId = null;
}
