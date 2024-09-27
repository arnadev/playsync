document.addEventListener('DOMContentLoaded', function() {
    const usernameInput = document.getElementById('username');

    usernameInput.addEventListener('input', function() {
        this.value = this.value.toLowerCase();
    });
});

const data1=document.querySelectorAll('.data1');
const data2=document.querySelectorAll('.data2');


const nextBtn=document.querySelector('#next-btn');
nextBtn.addEventListener('click', async () => {
    data1.forEach((data)=>{
        data.style.display='none';
    });
    data2.forEach((data)=>{
        data.style.display='block';
    });
});

const backBtn=document.querySelector('#back-btn');
backBtn.addEventListener('click', async () => {
    data1.forEach((data)=>{
        data.style.display='block';
    });
    data2.forEach((data)=>{
        data.style.display='none';
    });
});