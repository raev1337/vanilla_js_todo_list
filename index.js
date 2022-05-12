const randomId = () => {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
}

const showAllTasks = (taskList, taskWrapper) => {

    if(taskList != null && taskList.length > 0){
        taskWrapper.style.display = 'flex'
        taskList.forEach(task => {
    
            let newTaskDiv = document.createElement('div')
            newTaskDiv.classList.add('task')
    
            let newTaskParagraph = document.createElement('p')
            newTaskParagraph.classList.add('task_name')
            newTaskParagraph.innerText = task.title
    
            let newTaskButton = document.createElement('button')
            newTaskButton.classList.add('delete_task')
            newTaskButton.setAttribute('data-del', task.id)
    
            let newTaskIcon = document.createElement('i')
            newTaskIcon.classList.add('ri-delete-bin-7-line')
    
            newTaskButton.appendChild(newTaskIcon)
    
            newTaskDiv.appendChild(newTaskParagraph)
            newTaskDiv.appendChild(newTaskButton)
    
            taskWrapper.appendChild(newTaskDiv)
        });
    }
}

const addTask = () => {

    const localPrev = JSON.parse(window.localStorage.getItem('tasks'))
    const taskTitle = document.querySelector('.task_input');
    let tasks;

    taskListWrapper.textContent = '';

    if(taskTitle.value !== ''){
        const task = {
            id: randomId(),
            title: taskTitle.value
        }
    
        if(localPrev != null && localPrev.length > 0){
            tasks = localPrev;
        }
        else{
            tasks = [];
        }
    
        tasks.push(task)
    
        showAllTasks(tasks, taskListWrapper)
    
        deleteTaskButton = document.querySelectorAll('.delete_task')
        deleteTaskButton.forEach(button => {
            const delId = button.getAttribute('data-del')
            button.addEventListener('click', () => {removeTask(button, delId)})
        })
    
        window.localStorage.setItem('tasks', JSON.stringify(tasks));
        taskTitle.value = '';
        console.log(JSON.parse(window.localStorage.getItem('tasks')))
    }
    else{
        alert('Enter a task name!')
    }
}

const removeTask = (buttonElement, delId) => {

    let tasksList = JSON.parse(window.localStorage.getItem('tasks'))
    tasksList.forEach((task, i) => {
        if (task.id === delId){
            tasksList.splice(i, 1)
        }
    })

    buttonElement.parentElement.remove()
    console.log(tasksList)


    if(tasksList != null && tasksList.length > 0){
        deleteTaskButton = document.querySelectorAll('.delete_task');
    }else{
        taskListWrapper.style.display = 'none'
    }

    window.localStorage.setItem('tasks', JSON.stringify(tasksList));
}

const taskListWrapper = document.querySelector('.todo_task_list')
const currentTasks = JSON.parse(window.localStorage.getItem('tasks'))
console.log(currentTasks)
const addTaskButton = document.querySelector('.add_task')
let deleteTaskButton;

addTaskButton.addEventListener('click', addTask)

if(currentTasks != null && currentTasks.length > 0){
    showAllTasks(currentTasks, taskListWrapper)
    deleteTaskButton = document.querySelectorAll('.delete_task')
    deleteTaskButton.forEach(button => {
        const delId = button.getAttribute('data-del')
        button.addEventListener('click', () => {removeTask(button, delId)})
    })
}
else{
    taskListWrapper.style.display = 'none'
}