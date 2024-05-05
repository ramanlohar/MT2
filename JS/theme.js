function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-mode');

    // Update colors of elements
    updateElementColors();
}

function updateElementColors() {
    // alert("hello");
    const elementsToUpdate = document.querySelectorAll('.theme-color');

    elementsToUpdate.forEach(element => {
        const computedStyle = getComputedStyle(document.body);

        // Get color variables from computed styles
        const bgColor = computedStyle.getPropertyValue(`--${element.dataset.bgColor}`);
        const textColor = computedStyle.getPropertyValue(`--${element.dataset.textColor}`);
        const borderColor = computedStyle.getPropertyValue(`--${element.dataset.borderColor}`);

        // Apply colors to the element
        element.style.backgroundColor = bgColor;
        element.style.color = textColor;
        element.style.borderColor = borderColor;
    });
}

// Check system preference
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-mode');
    console.log("dark-theme");
}

// Update element colors on page load
updateElementColors();
