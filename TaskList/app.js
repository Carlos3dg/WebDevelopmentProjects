//VARIABLES 
const form = document.querySelector('.form__task');
const taskContainer = document.querySelector('.task-list__container');
const taskList = document.querySelector('.task-list')

//EVENT LISTENERS
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
        //Proccess to save task in Storage
        getTaskData(divTask);
        //Add data-id attribute to every div that has been created
        let importTasks;
        importTasks = changeLSinArray();
        importTasks.forEach(function(taskData, index){
            if(divTask.querySelector('.task').textContent === taskData.task){
                divTask.setAttribute('data-id', index);
                if(document.querySelector('.greenTasks') !== null){
                    for(i=index+1; i<=importTasks.length-1; i++){
                        document.querySelectorAll('.task__container')[i].setAttribute('data-id', i);
                    }
                }
            }
        })

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
        task = changeLSinArray();
        
        let indexTask;
        let taskDone;

        indexTask = divTask.getAttribute('data-id');
        task[indexTask].classTask = 'task__container greenTasks';
        task[indexTask].toDo = 'unchecked';
        task[indexTask].done = 'checked';

        taskDone = task[indexTask];
        task.splice(indexTask, 1);
        task.push(taskDone);
        //Change data-id due to the elements order in DOM
        setTimeout(function(){
            const divTaskArray = document.querySelectorAll('.task__container');
            task.forEach(function(taskData, index) {
                divTaskArray[index].setAttribute('data-id', index);
            });
        }, 1000);

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
        //Change data-id due to the elements order in DOM
        setTimeout(function(){
            const divTaskArray = document.querySelectorAll('.task__container');
            task.forEach(function(taskData, index) {
                divTaskArray[index].setAttribute('data-id', index);
            });
        }, 1000);

        localStorage.setItem('tasks', JSON.stringify(task));

      //Delete button 'x'  
    } else if (e.target.textContent === 'x') {
        let taskDeleted = e.target.parentElement;
        e.target.parentElement.remove();
        //Delete taskData in Storage
        removeTaskLS(taskDeleted.firstElementChild.textContent);
    }
});

//FUNCTIONS 
//Function to save the task data in an object
function getTaskData(divTask) {
    const taskData = {
        classTask: divTask.classList.value,
        task: divTask.querySelector(`span`).textContent,
        //id: taskList.querySelector(`div[data-id='${i-1}']`).getAttribute('data-id'),
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

    //Add id attribute to the object
    task.forEach(function(element, index) {
        element.id = index;
    });

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
    //console.log(taskListLS);
    return taskListLS;
}

//Function to remove task from Local Storage 
function removeTaskLS(taskDeleted) {
    let importTasks;

    importTasks = changeLSinArray();

    importTasks.forEach(function(taskData, index){
        if(taskDeleted == taskData.task) {
            importTasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(importTasks));
}