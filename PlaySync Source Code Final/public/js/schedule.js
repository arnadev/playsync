joinBtns=document.querySelectorAll('.join-btn');

joinBtns.forEach((btn) => {
    btn.addEventListener('click',async () => {
        const location=document.querySelector('#location').innerText;
        const sport=document.querySelector('#sport').innerText;
        const joinData={
            location: location,
            sport: sport,
            scheduleTime: btn.id,
        };
    
        try {
            const response = await fetch('/user/schedule', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(joinData) // Convert data to JSON
            });
    
            if (response.ok) {
                console.log('Success:');
                window.location.reload();

            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    })
});
