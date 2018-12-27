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
        //console.log(taskList.childElementCount);
        //console.log(taskList.querySelectorAll('.greenTasks').length);
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
        /*const taskObject = saveTaskDataInLS();*/
        /*console.log(taskObject);*/

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
        //Add the green class in Storage
        let task;
        let indexTask;
        let taskDone;

        task = changeLSinArray();
        indexTask = divTask.getAttribute('data-id');
        task[indexTask].classTask = 'task__container greenTasks';
        task[indexTask].toDo = 'unchecked';
        task[indexTask].done = 'checked';

        taskDone = task[indexTask];
        task.splice(indexTask, 1);
        task.push(taskDone);

        localStorage.setItem('tasks', JSON.stringify(task));
        
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
        //Add the red class in Storage
        let task;
        let indexTask;
        let taskToDo;

        task = changeLSinArray();
        indexTask = divTask.getAttribute('data-id')
        task[indexTask].classTask = 'task__container redTasks'
        task[indexTask].toDo = 'checked';
        task[indexTask].done = 'unchecked';
        
        taskToDo = task[indexTask];
        task.splice(indexTask, 1);
        task.unshift(taskToDo);

        localStorage.setItem('tasks', JSON.stringify(task));

      //Delete button 'x'  
    } else if (e.target.textContent === 'x') {
        let taskDeleted = e.target.parentElement.getAttribute('data-id');
        e.target.parentElement.remove();
        //Delete taskData in Storage
        removeTaskLS(taskDeleted);
    }
});

//DOMContent loaded event
document.addEventListener('DOMContentLoaded', function() {
    let importTasks;
    importTasks = changeLSinArray();

    importTasks.forEach(function(taskData, index) {
        const divTask = document.createElement('div');
        divTask.className = `${taskData.classTask}`;
        divTask.setAttribute('data-id', index);
        divTask.innerHTML = `<span class="task">${taskData.task}</span>
                            <input type="checkbox" class="task__column" value="toDo" ${taskData.toDo}>
                            <input type="checkbox" class="task__column" value="done" ${taskData.done}>
                            <span class="task__column delete__task">x</span>`;
        
        taskList.appendChild(divTask);
    })
})

//FUNCTIONS 
//Function to save the task data in an object
function getTaskData(taskList) {
    const taskData = {
        classTask: taskList.querySelector('div.task__container').classList.value,
        task: taskList.querySelector(`div[data-id='${i-1}'] span`).textContent,
        id: taskList.querySelector(`div[data-id='${i-1}']`).getAttribute('data-id'),
        toDo: 'checked',
        done: 'unchecked'
    }
    
    saveTaskDataInLS(taskData);
    //return taskData;
}

//Function to save the task data in LS 
function saveTaskDataInLS(newTask) {
    let task;

    task = changeLSinArray();
    //A map function to get all classTask properties as array
    const classArray = task.map(function(task) {
        return task.classTask;
    })
    //The index number of an element with the greenTasks value
    const indexGreenTask = classArray.indexOf('task__container greenTasks')
    //Condition to insert the new tasks before a green one in our storage
    if (indexGreenTask !== -1) {
        task.splice(indexGreenTask, 0, newTask);
    } else {
        task.push(newTask);
    }

    localStorage.setItem('tasks', JSON.stringify(task));
    /*return task;*/
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