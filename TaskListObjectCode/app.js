//VARIABLES 
const form = document.querySelector('.form__task');
const taskContainer = document.querySelector('.task-list__container');
const taskList = document.querySelector('.task-list')

class Task {
    constructor(task, classTask, toDo, done) {
        this.task = task;
        this.classTask = 'redTasks';
        this.toDo = 'checked';
        this.done = 'unchecked';
    }

}

class UI {
    
    insertTaskInDOM(task) {
        const divTask = document.createElement('div');
        divTask.classList.add('task__container', task.classTask);
        divTask.innerHTML = `<span class="task">${task.task}</span>
                            <input type="checkbox" class="task__column" value="toDo" ${task.toDo}>
                            <input type="checkbox" class="task__column" value="done" ${task.done}>
                            <span class="task__column delete__task">x</span>`;

        return divTask;
    }
}


form.addEventListener('submit', function(e) {
    e.preventDefault();
    //Input value
    const task = document.querySelector('.input__task').value;

    if(task !== ''){
        const taskObj = new Task(task);

        const ui = new UI();
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

})
