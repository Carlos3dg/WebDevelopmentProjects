const headerSidebar = document.querySelector('.sidebar__menu');
const toggleButton = document.querySelector('.toggle__button');

toggleButton.addEventListener('click', function(){
    headerSidebar.classList.toggle('active__sidebar');
});

