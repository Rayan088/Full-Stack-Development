const todoList = [];

renderToDoList();

// Created todoList
function renderToDoList() {
    let todoListHTML = '';

    for (let i=0; i< todoList.length; i++) {
        const todo = todoList[i]
        const html = `<p>${todo}</p>`
        todoListHTML += html
    }
    console.log(todoListHTML)

    // Adds todoList into div
    document.querySelector('.js-todo-list').innerHTML = todoListHTML;
}

// Adds to list
function addToDo() {
    const inputElement = document.querySelector('.js-name-input');
    const name = inputElement.value;

    todoList.push(name);
    console.log(todoList);

    inputElement.value = ''; // Rest text box to empty

    renderToDoList();
}