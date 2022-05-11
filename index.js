const randomId = () => {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
}

const addTask = () => {

    const localPrev = JSON.parse(window.localStorage.getItem('tasks'))
    const taskTitle = document.querySelector('.task_input').value;
    let tasks;

    const task = {
        id: randomId(),
        title: taskTitle
    }

    if(localPrev != null){
        tasks = localPrev;
    }
    else{
        tasks = [];
    }

    tasks.push(task)

    window.localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log(JSON.parse(window.localStorage.getItem('tasks')))
}

const removeTask = () => {

    const tasksList = JSON.parse(window.localStorage.getItem('tasks'))

}


const addTaskButton = document.querySelector('.add_task')

addTaskButton.addEventListener('click', addTask)

