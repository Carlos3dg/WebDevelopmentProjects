//VARIABLES 
const form = document.querySelector('.form__task');
const taskList = document.querySelector('.task-list');

//CLASSES
//Class to create the taskData object and save in LS
class Task {
    constructor(task, classTask, toDo, done) {
        this.task = task;
        this.classTask = 'redTasks';
        this.toDo = 'checked';
        this.done = 'unchecked';
    }
    //Method to save taskData in LS
    saveTaskDataInLS(newTask) {
        let task;
        //We call the changeLSinArray method to get the data as array
        task = this.changeLSinArray();
        //A map function to get all classTask properties as array
        const classArray = task.map(function(task) {
            return task.classTask;
        });
        //The index number of an element with the greenTasks value
        const indexGreenTask = classArray.indexOf('greenTasks');
        //Condition to insert the new tasks before a green one in our storage
        if (indexGreenTask !== -1) {
            task.splice(indexGreenTask, 0, newTask);
        } else {
            task.push(newTask);
        }

        localStorage.setItem('tasks', JSON.stringify(task));

    }
    //Method to get the data from LS as array
    changeLSinArray() {
        let taskListLS;

        if(localStorage.getItem('tasks') === null) {
            taskListLS = [];
        } else {
            taskListLS = JSON.parse(localStorage.getItem('tasks'));
        }

        return taskListLS;
    }

}

 // Class to insert and design elements in DOM
class UI {
    constructor() {
        //Default values for a done task
        this.edgeTask = taskList.lastElementChild;
        this.removeClass = 'redTasks';
        this.addedClass = 'greenTasks';
    }
    //Method to insert the task in DOM 
    insertTaskInDOM(task) {
        //List element creation
        const divTask = document.createElement('div');
        divTask.classList.add('task__container', task.classTask);
        divTask.innerHTML = `<span class="task">${task.task}</span>
                            <input type="checkbox" class="task__column" value="toDo" ${task.toDo}>
                            <input type="checkbox" class="task__column" value="done" ${task.done}>
                            <span class="task__column delete__task">x</span>`;

        return divTask;
    }
    //Method to change the checkbox and the position of a task
    checkboxesValidation(unselectedCheck, task, checkBoxType) {
        //Checkbox that becomes not select
        const checkbox = unselectedCheck;
        checkbox.checked = false;
        //Select the task that is clicked and the edge task, the first one or last one depending of the kind of checkbox
        const divTask = task.parentElement;
        const edgeTask = this.edgeTask;
        divTask.classList.remove(this.removeClass);
        divTask.classList.add(this.addedClass);
        //Evakuate the kidn of checkbox to determine if this task is inserted at the end or at the beginning
        setTimeout(() => {
            if(checkBoxType === 'done') {
                taskList.insertBefore(divTask, edgeTask.nextSibling);
            } else if (checkBoxType === 'toDo') {
                taskList.insertBefore(divTask, edgeTask);
            }
        }, 1000);

    }
    //Method to remove a task from the DOM
    removeTask(task) {
        task.remove();
    }
    //Method to change the default values when a task change to toDo
    changeDefaultValues() {
        this.edgeTask = taskList.firstElementChild;
        this.removeClass = 'greenTasks';
        this.addedClass = 'redTasks';
    }
}

//Event Listeners
//Submit event
form.addEventListener('submit', function(e) {
    e.preventDefault();
    //Input value
    const task = document.querySelector('.input__task').value;
    //Validate form
    if(task !== ''){
        //Create the taskData Object 
        const taskObj = new Task(task);

        const ui = new UI();
        //Take the return element that has been created in the method
        const divTask= ui.insertTaskInDOM(taskObj);
        //Insertion of the element
        const greenTask = document.querySelector('.greenTasks');
        //Verification to see if the element is inserted before or not a done task
        if (greenTask === null ) {
            taskList.appendChild(divTask);
        } else {
            taskList.insertBefore(divTask, greenTask);
        }
        //Call the saveTaskData Method to save the taskObj in LS
        taskObj.saveTaskDataInLS(taskObj);
    
    } else {
        alert('Please type a task before submit');
    }
    
    form.reset();

});

//Click event in Checkbox
taskList.addEventListener('click', function(e) {
    //DELEGATION
    //Checkboxes
    const ui = new UI()
    if(e.target.value === 'done') {
        //We call the method with the task, checkbox and the kind of check as parameters
        ui.checkboxesValidation(e.target.previousElementSibling, e.target, 'done');

    } else if (e.target.value === 'toDo') {
        //When the kind of check is toDo it is necessary to change the defaultValues
        ui.changeDefaultValues();
        ui.checkboxesValidation(e.target.nextElementSibling, e.target, 'toDo');

    } else if (e.target.textContent === 'x') {
        ui.removeTask(e.target.parentElement);
    }
});
