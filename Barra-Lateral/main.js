const toggleBtn = document.querySelector('.toggle-btn');
const sideBar = document.getElementById('sidebar');

toggleBtn.addEventListener('click', showSideBar);

function showSideBar(e){
    e.preventDefault();
    sideBar.classList.toggle('active');
}

