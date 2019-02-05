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

}

 // Class to insert and design elements in DOM
class UI {
    constructor() {
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

    checkboxesValidation(unselectedCheck, task, checkBoxType) {
        //Checkbox that becomes not select
        const checkbox = unselectedCheck;
        checkbox.checked = false;
        //Select the task that is clicked and the edge task, the first one or last one depending of the kind of checkbox
        const divTask = task.parentElement;
        const edgeTask = this.edgeTask;
        divTask.classList.remove(this.removeClass);
        divTask.classList.add(this.addedClass);
        if(checkBoxType === 'done') {
            setTimeout(() => {
                taskList.insertBefore(divTask, edgeTask.nextSibling);
           }, 1000);
        } else if (checkBoxType === 'toDo'){
            setTimeout(() => {
                taskList.insertBefore(divTask, edgeTask);
            }, 1000);
        }

    }

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
        ui.checkboxesValidation(e.target.previousElementSibling, e.target, 'done');

    } else if (e.target.value === 'toDo') {
        ui.changeDefaultValues();
        ui.checkboxesValidation(e.target.nextElementSibling, e.target, 'toDo');
    }
});
