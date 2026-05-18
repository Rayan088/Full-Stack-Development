const todoList = [
    {name: 'make dinner', dueDate: '2026-12-1'},
    {name: 'wash dishes', dueDate: '2026-10-4'}]

renderToDoList();

// Created todoList
function renderToDoList() {
    let todoListHTML = '';

    todoList.forEach((todoObject, index) => {
        const {name, dueDate} = todoObject

        const html =
        `<div>${name}</div>
        <div>${dueDate}</div>
        <button class="delete-todo-button js-delete-todo-button">Delete</button>`
        todoListHTML += html
        }
    )

    // Adds todoList into div
    document.querySelector('.js-todo-list').innerHTML = todoListHTML;
    
    // Selected all queries with this class
    // Closure: if a function has access to a value it will always have access even after deletion. E.g index 
    document.querySelectorAll('.js-delete-todo-button')
    .forEach((deleteButton, index) => {
        deleteButton.addEventListener('click', () => {
            todoList.splice(index, 1);
            renderToDoList();
        })
    });
}

document.querySelector('.js-add-todo-button')
.addEventListener('click', () => {addToDo();});

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