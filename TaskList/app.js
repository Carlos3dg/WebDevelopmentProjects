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
        //List Element creation
        const divTask = document.createElement('div');
        divTask.classList.add('task__container', 'redTasks');
        divTask.setAttribute('data-id', i++);
        divTask.innerHTML = `<span class="task">${task}</span>
                            <input type="checkbox" class="task__column" value="toDo" checked>
                            <input type="checkbox" class="task__column" value="done">
                            <span class="task__column delete__task">x</span>`;
        //Insertion of the element
        const greenTask = document.querySelector('.greenTasks');
        //Verification to see if the element is inserted before or not a done task
        if (greenTask === null ) {
            taskList.appendChild(divTask);
        } else {
            taskList.insertBefore(divTask, greenTask);
        }

        getTaskData(taskList);

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
        divTask.classList.remove('redTasks');
        divTask.classList.add('greenTasks');
        setTimeout(function() {
            taskList.insertBefore(divTask, lastTask.nextSibling);
        }, 1000);
        
    } else if (e.target.value === 'toDo') {
        //checkbox from done to toDo
        const taskDone = e.target.nextElementSibling;
        taskDone.checked = false;
        //move divTask at the end and change its color to red
        const divTask = e.target.parentElement;
        const firstTask = taskList.firstElementChild;
        divTask.classList.remove('greenTasks');
        divTask.classList.add('redTasks');
        setTimeout(function() {
            taskList.insertBefore(divTask, firstTask);
        }, 1000);
      //Delete button 'x'  
    } else if (e.target.textContent === 'x') {
        e.target.parentElement.remove();
    }
});

//FUNCTIONS 
//Function to save the task data in an object
function getTaskData(taskList) {
    const taskData = {
        classTask: taskList.querySelector('div.task__container').classList.value,
        task: taskList.querySelector(`div[data-id='${i-1}'] span`).textContent,
        id: taskList.querySelector(`div[data-id='${i-1}']`).getAttribute('data-id')
    }
    
    saveTaskDataInLS(taskData);
}

//Function to save the task data in LS 
function saveTaskDataInLS(newTask) {
    let task;

    task = changeLSinArray();

    task.push(newTask);

    localStorage.setItem('tasks', JSON.stringify(task));
}

//Function to change LS in an array
function changeLSinArray() {
    let taskListLS;

    if (localStorage.getItem('tasks') === null) {
        taskListLS = [];
    } else {
        taskListLS = JSON.parse(localStorage.getItem('tasks'));
    }

    return taskListLS;
}