//VARIABLES 
const form = document.querySelector('.form__task');
const taskContainer = document.querySelector('.task-list__container');
const taskList = document.querySelector('.task-list')
let i = 0;
//EVENT LISTENERS
//Submit Event
form.addEventListener('submit', function(e) {
    e.preventDefault();
    //Input value
    const task = document.querySelector('.input__task').value;
    //Validate form
    if(task !== ''){
        i++;
        //List Element creation
        const divTask = document.createElement('div');
        divTask.classList.add('task__container', 'redTasks');
        divTask.innerHTML = `<span class="task">${task}</span>
                            <input type="checkbox" class="task__column" value="toDo" checked>
                            <input type="checkbox" class="task__column" value="done">
                            <span class="task__column delete__task">x</span>`;
        //Insertion of the element
        taskList.appendChild(divTask);
    } else {
        alert('Primero escriba una tarea');
    }

    form.reset();
});

taskContainer.addEventListener('click', function(e) {
    //DELEGATION
    //Checkboxes
    if(e.target.value === 'done') {
        //checkbox from toDo to done
        const taskToDo = e.target.previousElementSibling;
        taskToDo.checked = false;
        //move divTask at the end and change its color to green
        const divTask = e.target.parentElement;
        const lastTask = taskList.lastElementChild;
        taskList.insertBefore(divTask, lastTask.nextSibling);
        divTask.classList.remove('redTasks');
        divTask.classList.add('greenTasks');
        
    } else if (e.target.value === 'toDo') {
        const taskDone = e.target.nextElementSibling;
        taskDone.checked = false;
    }
});