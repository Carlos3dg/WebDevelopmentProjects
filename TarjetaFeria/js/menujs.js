//VARIABLES
const headerSidebar = document.querySelector('.sidebar__menu'); //Sidebar menu
const toggleButton = document.querySelector('.toggle__button');
const navigation = document.querySelector('.navigation'); //Nav element

//Click event in toggle button to open the sidebar:
toggleButton.addEventListener('click', function(){
    //Creation of the shadow next to the sidebar
    const shadow = document.createElement('div');
    shadow.classList.add('active__shadow');
    //Add class that open the sidebar 
    headerSidebar.classList.add('active__sidebar');
    //Insert the shadow element after the sidebar transition is completed
    setTimeout(function() {
        navigation.insertBefore(shadow, document.querySelector('.header__container'));
    }, 500);
    //Click event in the shadow to remove it and close the sidebar
    shadow.addEventListener('click', function() {
        shadow.remove();
        headerSidebar.classList.remove('active__sidebar');
    })
});

