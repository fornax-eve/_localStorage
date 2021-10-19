const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

let toDoData = [];

const render = function () {
    localStorage.clear();
    todoList.innerHTML = '';
    todoCompleted.innerHTML = '';
    toDoData.forEach(function (item, i) {
        // todo-item
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            ' </div>';
        item.completed ? todoList.append(li) : todoCompleted.append(li);
        li.querySelector('.todo-complete').addEventListener('click', function () {
            item.completed = !item.completed;
            render();
        })
        li.querySelector('.todo-remove').addEventListener('click', function () {
            toDoData.splice(i, 1);
            render();
        })
    })
    localStorage.name = JSON.stringify(toDoData);
};

const isString = function (str) {
    let pattern = /^[\s]+$/;
    if (parseFloat(str)) {
        alert('Сами числа не подходят');
        return false
    } else if (pattern.test(str)) {
        alert('Сами пробелы не подходят');
        return false;
    } else if (str) {
        return true
    } else {
        return false
    }
};

todoControl.addEventListener('submit', function (event) {
    event.preventDefault();
    if (isString(headerInput.value)) {
        const newToDo = {
            text: headerInput.value,
            completed: false
        };
        toDoData.push(newToDo);
        headerInput.value = '';
        render();
    }
});

toDoData = JSON.parse(localStorage.getItem('name'));

if (toDoData) {
    render();
} else {
    toDoData = [];
};

