let deferredPrompt;
const installButton = document.getElementById('install-button');

// Listen for the beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the default install prompt from showing automatically
    event.preventDefault();
    
    // Save the event so it can be triggered later
    deferredPrompt = event;

    // Make the install button visible
    installButton.style.display = 'block';
});

// Add click event listener to the install button
installButton.addEventListener('click', () => {
    // Show the install prompt when the button is clicked
    if (deferredPrompt) {
        deferredPrompt.prompt();
        
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the PWA installation');
            } else {
                console.log('User dismissed the PWA installation');
            }
            deferredPrompt = null; // Reset the deferred prompt
        });
    }
});

// Optionally, hide the button once the user has installed the PWA
window.addEventListener('appinstalled', () => {
    installButton.style.display = 'none';
});
