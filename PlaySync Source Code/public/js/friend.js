document.addEventListener('DOMContentLoaded', () => {
    const clearResultsBtn = document.querySelector('#clear-results-btn');
    if (clearResultsBtn) {
        clearResultsBtn.addEventListener('click', () => {
            const searchResults = document.querySelector('.search-results');
            if (searchResults) {
                searchResults.remove();
            }
        });
    }

    const searchBar = document.querySelector('#search-bar');
    const searchBtn = document.querySelector('#search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', (event) => {
            event.preventDefault();
            if (searchBar) {
                searchBar.value = '';
            }
        });
    }

    // Event delegation for accept buttons
    document.addEventListener('click', async (event) => {
        if (event.target.classList.contains('accept-btn')) {
            event.preventDefault();
            const btn = event.target;
            console.log('Accept button clicked:', btn.id);

            const acceptFriendData = {
                requestSender: btn.id,
                action: 'acceptFriend',
            };

            try {
                const response = await fetch('/user/friend', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(acceptFriendData)
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log('Success:', result);
                    window.location.reload();
                } else {
                    console.error('Error:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    });
});