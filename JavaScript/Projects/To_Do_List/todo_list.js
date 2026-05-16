const todoList = [
    {name: 'make dinner', dueDate: '2026-12-1'},
    {name: 'wash dishes', dueDate: '2026-10-4'}]

renderToDoList();

// Created todoList
function renderToDoList() {
    let todoListHTML = '';

    for (let i=0; i< todoList.length; i++) {
        const todoObject = todoList[i]
        const {name, dueDate} = todoObject
        const html = `<p>
        ${name} ${dueDate}
        <button onclick="
        todoList.splice(${i}, 1); // Removes from list
        renderToDoList();
        ">Delete</button>
        </p>`
        todoListHTML += html
    }

    // Adds todoList into div
    document.querySelector('.js-todo-list').innerHTML = todoListHTML;
}

// Adds to list
function addToDo() {
    const inputElement = document.querySelector('.js-name-input');
    const name = inputElement.value;

    const dateInputElement = document.querySelector('.js-due-date-input');
    const dueDate = dateInputElement.value;

    todoList.push({
        name: name,
        dueDate: dueDate
    });

    inputElement.value = ''; // Rest text box to empty

    renderToDoList();
}