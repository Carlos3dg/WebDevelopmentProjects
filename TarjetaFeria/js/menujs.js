//VARIABLES
/* Header elements */
const headerSidebar = document.querySelector('.sidebar__menu'); //Sidebar menu
const toggleButton = document.querySelector('.toggle__button');
const navigation = document.querySelector('.navigation'); //Nav element
const navLinks = document.querySelector('.container__nav-links');
const sesionLink = document.getElementById('sesion');
const indexLink = document.getElementById('index');
const helpLink = document.getElementById('help');

// Content elements
const sesionContainer =  document.querySelector('.sesion__container');
const indexContainer = document.querySelector('.index__container');
const helpContainer = document.querySelector('.help__container');

/* EVENT LISTENERS */
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

//Click event in every link from the navigation to open the correct landing
navLinks.addEventListener('click', function(e) {
    e.preventDefault();
    //Condition to evaluate the link that is being clicked (e.target)
    if(e.target === sesionLink) {
        //Remove the landing showed by the past nav link
        document.querySelector('.show__element').classList.remove('show__element');
        //Remove the border and font-weight from the nav link that was clicked before
        document.querySelector('.nav__link-clicked').classList.remove('nav__link-clicked');
        //Add the correct classes to show the landing correspondent and the font-weight and border in the link
        sesionLink.classList.add('nav__link-clicked');
        sesionContainer.classList.add('show__element');
    } else if (e.target === indexLink) {
        document.querySelector('.show__element').classList.remove('show__element');
        document.querySelector('.nav__link-clicked').classList.remove('nav__link-clicked');
        indexLink.classList.add('nav__link-clicked');
        indexContainer.classList.add('show__element')
    } else {
        document.querySelector('.show__element').classList.remove('show__element');
        document.querySelector('.nav__link-clicked').classList.remove('nav__link-clicked');
        helpLink.classList.add('nav__link-clicked');
        helpContainer.classList.add('show__element');
    }
})
