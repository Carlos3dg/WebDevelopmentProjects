//VARIABLES
/* Header elements */
const headerSidebar = document.querySelector('.sidebar__menu'); //Sidebar menu
const toggleButton = document.querySelector('.toggle__button');
const navLinks = document.querySelector('.container__nav-links');
const searchButton = document.querySelector('.search__button');
const searchClose = document.querySelector('.search-close__button');

//CLASSES
class UI {
    //Method to show the search bar according to the target that is read (searchType)
    showSearchBar(searchType, placeholder) {
        const searchBar = document.querySelector('.search__container');
        const inputSearch = document.querySelector('.input__search');
        
        if(searchType === 'search') {
            inputSearch.placeholder = placeholder;
        } else if (searchType === 'help') {
            inputSearch.placeholder = placeholder;
        }

        searchBar.classList.add('show__search');
        inputSearch.select();
    }

    //Hide elements that appear with a click
    hideElement(element, className) {
        element.classList.remove(className);
    }

}

/* EVENT LISTENERS */
//Click event in toggle button to open the sidebar:
toggleButton.addEventListener('click', function(){
    const navigation = document.querySelector('.navigation'); //Nav element
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

//Click event in search button 
searchButton.addEventListener('click', function() {
    const ui = new UI();
    ui.showSearchBar('search', 'Buscar...');
});

//Click event to close the search bar
searchClose.addEventListener('click', function() {
    const ui = new UI();
    ui.hideElement(searchClose.parentElement, 'show__search');
})

//Click event in every link from the navigation to open the correct landing
navLinks.addEventListener('click', function(e) {
    e.preventDefault();
    const sesionLink = document.getElementById('sesion');
    const indexLink = document.getElementById('index');
    const helpLink = document.getElementById('help');

    const sesionContainer =  document.querySelector('.sesion__container');
    const indexContainer = document.querySelector('.index__container');
    const helpContainer = document.querySelector('.help__container');
    const ui = new UI();
    //Condition to evaluate the link that is being clicked (e.target)
    if(e.target === sesionLink) {
        //Remove the landing showed by the past nav link
        ui.hideElement(document.querySelector('.show__element'), 'show__element');
        //Remove the border and font-weight from the nav link that was clicked before
        ui.hideElement(document.querySelector('.nav__link-clicked'), 'nav__link-clicked');
        //Add the correct classes to show the landing correspondent and the font-weight and border in the link
        sesionLink.classList.add('nav__link-clicked');
        sesionContainer.classList.add('show__element');

    } else if (e.target === indexLink) {
        ui.hideElement(document.querySelector('.show__element'), 'show__element');
        ui.hideElement(document.querySelector('.nav__link-clicked'), 'nav__link-clicked');

        indexLink.classList.add('nav__link-clicked');
        indexContainer.classList.add('show__element');
        
    } else if (e.target === helpLink) {
        ui.hideElement(document.querySelector('.show__element'), 'show__element');
        ui.hideElement(document.querySelector('.nav__link-clicked'), 'nav__link-clicked');

        helpLink.classList.add('nav__link-clicked');
        helpContainer.classList.add('show__element');

        ui.showSearchBar('help', '¿Cómo podemos ayudarte?');
    }
});

//Click event in subject issues buttons
document.querySelector('.help__container').addEventListener('click', function(e) {
    if(e.target.classList.contains('subject-issue__text')) {
        const id = e.target.getAttribute('data-id');
        const issueId = parseInt(id);

        const xhr = new XMLHttpRequest();

        xhr.open('GET', 'db/faq.json', true);

        xhr.onload = function() {
            if(this.status === 200) {
                const jsonFile = JSON.parse(this.responseText);

                let html = '';

                for(quest in jsonFile[issueId]) {
                    html += `<h5>${quest}</h5>
                             <p>${jsonFile[issueId][quest]}</p>`;
                }

                e.target.nextElementSibling.innerHTML = html;
            }
        }

        xhr.send();
    }
});
