document.addEventListener('DOMContentLoaded', function() {
    const editBtn = document.getElementById('editBtn');
    const profileForm = document.getElementById('profileForm');
    const nicknameInput = document.getElementById('nickname');
    const ageInput = document.getElementById('age');
    const genderInput = document.querySelectorAll('.gender-radios');
    const bioTextarea = document.getElementById('bioTextarea');

    editBtn.addEventListener('click', function() {
        if (editBtn.innerText === 'Edit') {
            nicknameInput.removeAttribute('readonly');
            ageInput.removeAttribute('readonly');
            genderInput.forEach((radio)=>{radio.disabled=false;});
            bioTextarea.removeAttribute('readonly');

            nicknameInput.classList.add('editable');
            ageInput.classList.add('editable');
            bioTextarea.classList.add('editable');
            
            editBtn.innerText = 'Submit';
        } else {
            nicknameInput.setAttribute('readonly', 'true');
            ageInput.setAttribute('readonly', 'true');
            bioTextarea.setAttribute('readonly', 'true');

            nicknameInput.classList.remove('editable');
            ageInput.classList.remove('editable');
            bioTextarea.classList.remove('editable');

            profileForm.submit();
            genderInput.forEach((radio)=>{radio.disabled=true;});

        }
    });
});

const addFriendBtn=document.querySelector('#add-friend-Btn');
if(addFriendBtn!==null){
    addFriendBtn.addEventListener('click',async () => {
        const addFriendData={
            requestReceiver: document.querySelector('#username').value,
            action: 'addFriend',
        };
    
        try {
            const response = await fetch('/user/friend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(addFriendData) // Convert data to JSON
            });
    
            if (response.ok) {
                const result = await response.json(); // Parse JSON response
                console.log('Success:', result);
                window.location.reload();
            }
            else if(response.status===400){
                alert('Already friends');
            }
            else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
}

const unsendRequestBtn=document.querySelector('#unsend-request-Btn');
if(unsendRequestBtn!==null){
    unsendRequestBtn.addEventListener('click',async () => {
        const unsendRequestData={
            requestReceiver: document.querySelector('#username').value,
            action: 'unsendRequest',
        };
    
        try {
            const response = await fetch('/user/friend', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(unsendRequestData) // Convert data to JSON
            });
    
            if (response.ok) {
                const result = await response.json(); // Parse JSON response
                console.log('Success:', result);
                window.location.reload();

            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
}

const removeFriendBtn=document.querySelector('#remove-friend-Btn');
if(removeFriendBtn!==null){
    removeFriendBtn.addEventListener('click',async () => {
        const removeFriendData={
            requestReceiver: document.querySelector('#username').value,
            action: 'removeFriend',
        };
    
        try {
            const response = await fetch('/user/friend', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(removeFriendData) // Convert data to JSON
            });
    
            if (response.ok) {
                const result = await response.json(); // Parse JSON response
                console.log('Success:', result);
                window.location.reload();
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
}

const acceptFriendBtn=document.querySelector('#accept-friend-Btn');
if(acceptFriendBtn!==null){
    acceptFriendBtn.addEventListener('click',async () => {
        console.log('accept friend');
            const acceptFriendData={
                requestSender: document.querySelector('#username').value,
                action: 'acceptFriend',
            };
        
            try {
                const response = await fetch('/user/friend', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(acceptFriendData) // Convert data to JSON
                });
        
                if (response.ok) {
                    const result = await response.json(); // Parse JSON response
                    console.log('Success:', result);
                    window.location.reload();
                } else {
                    console.error('Error:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
}

const editPicBtn=document.querySelector('#edit-pic-btn');
if(editPicBtn!==null){
    const pfpForm=document.querySelector('#pfp-form');
    editPicBtn.addEventListener('click',()=>{
        pfpForm.style.display=pfpForm.style.display==='none'?'block':'none';
    });
};

const alertMsg=(msg)=>{
    let alertMessage=document.querySelector('#alert-message');
    alertMessage.innerText=msg;
    alertMessage.style.visibility='visible';
    alertMessage.classList.remove('alert-class');
    alertMessage.offsetHeight;
    alertMessage.classList.add('alert-class');
};





const delPicBtn=document.querySelector('#del-pic-btn');
if(delPicBtn!==null){
    delPicBtn.addEventListener('click',async()=>{
        const delPicData={
            gender: document.querySelector('input[name="gender"]:checked').value.toLowerCase(),
        };
        try {
            const response = await fetch('/user/pfp', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(delPicData) // Convert data to JSON
            });
    
            if (response.ok) {
                if (response.status === 204) {
                    console.log('Profile picture deleted successfully');
                    window.location.reload();
                }
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
};

const rateBtn=document.querySelector('#rate-Btn');
if(rateBtn!==null){
    rateBtn.addEventListener('click',async()=>{
        const rateData={
            rating: document.querySelector('#rating').value,
            ratingReciever: document.querySelector('#username').value,
        };
        try {
            const response = await fetch('/user/rating', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(rateData) // Convert data to JSON
            });
    
            if (response.ok) {
                const result = await response.json(); // Parse JSON response
                console.log('Success:', result);
                window.location.reload();
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
};
