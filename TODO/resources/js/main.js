
var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')):{
    todo: [],
    completed: []
};

// Remove and complete items in SVG form
var removeSVG = '<svg height="25pt" viewBox="0 0 512 512" width="25pt" xmlns="http://www.w3.org/2000/svg"><path class="fill" d="m256 512c-141.164062 0-256-114.835938-256-256s114.835938-256 256-256 256 114.835938 256 256-114.835938 256-256 256zm0-480c-123.519531 0-224 100.480469-224 224s100.480469 224 224 224 224-100.480469 224-224-100.480469-224-224-224zm0 0"/><path class="fill" d="m176.8125 351.1875c-4.097656 0-8.195312-1.554688-11.308594-4.691406-6.25-6.25-6.25-16.382813 0-22.632813l158.398438-158.402343c6.253906-6.25 16.386718-6.25 22.636718 0s6.25 16.382812 0 22.636718l-158.402343 158.398438c-3.15625 3.136718-7.25 4.691406-11.324219 4.691406zm0 0"/><path class="fill" d="m335.1875 351.1875c-4.09375 0-8.191406-1.554688-11.304688-4.691406l-158.398437-158.378906c-6.253906-6.25-6.253906-16.382813 0-22.632813 6.25-6.253906 16.382813-6.253906 22.632813 0l158.398437 158.398437c6.253906 6.25 6.253906 16.382813 0 22.632813-3.132813 3.117187-7.230469 4.671875-11.328125 4.671875zm0 0"/></svg>' 
var completeSVG = '<svg height="25pt" viewBox="0 0 512 512" width="25pt" xmlns="http://www.w3.org/2000/svg"><path class="fill" d="m256 512c-141.164062 0-256-114.835938-256-256s114.835938-256 256-256 256 114.835938 256 256-114.835938 256-256 256zm0-480c-123.519531 0-224 100.480469-224 224s100.480469 224 224 224 224-100.480469 224-224-100.480469-224-224-224zm0 0"/><path class="fill" d="m232 341.332031c-4.097656 0-8.191406-1.554687-11.308594-4.691406l-69.332031-69.332031c-6.25-6.253906-6.25-16.386719 0-22.636719s16.382813-6.25 22.636719 0l58.023437 58.027344 127.363281-127.359375c6.25-6.25 16.382813-6.25 22.632813 0s6.25 16.382812 0 22.632812l-138.667969 138.667969c-3.15625 3.136719-7.25 4.691406-11.347656 4.691406zm0 0"/></svg>'

renderTodoList();

// Click on add button
// If text is in input field, add text to todo list
document.getElementById('add').addEventListener('click', function() {
    var value = document.getElementById('item').value;
    if (value) {
     addItemToDOM(value);
    }
});

document.getElementById('item').addEventListener('keydown', function(e) {
    var value = this.value;
    if (e.code === 'Enter' &&  value) {
        addItem(value);
    }
});

function addItem (value) {
    addItemToDOM(value);
    document.getElementById('item').value = '';

    data.todo.push(value);
    dataObjectUpdated();
}

function renderTodoList() {
    if (!data.todo.length && !data.completed.length) return;

    for (var i = 0; i < data.todo.length; i++){
        var value = data.todo[i];
        addItemToDOM(value);
    }

    for (var j = 0; j < data.completed.length; j++) {
        var value = data.completed[i];
        addItemToDOM(value, true);
    }
}

function dataObjectUpdated() {
    localStorage.setItem('todoList', JSON.stringify(data));
}

function removeItem() {
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var id = parent.id;
    var value = item.innerText;

    if (id === 'todo') {
        data.todo.splice(data.todo.indexOf(value), 1);
    } else {
        data.completed.splice(data.todo.indexOf(value), 1);
    }
    dataObjectUpdated();

    parent.removeChild(item);
}

function completeItem() {
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var id = parent.id;
    var value = item.innerText;

    if (id === 'todo') {
        data.todo.splice(data.todo.indexOf(value), 1);
        data.completed.push(value);
    } else {
        data.completed.splice(data.todo.indexOf(value), 1);
        data.todo.push(value);
    }
    dataObjectUpdated();

    // Check if item should be added to completed or re-added to todo list
    var target = (id === 'todo') ? document.getElementById('completed'):document.getElementById('todo');

    parent.removeChild(item);
    target.insertBefore(item, target.childNodes [0]);
}



// Add new item to todo list
function addItemToDOM(text, completed) {
    var list = (completed) ? document.getElementById('completed'):document.getElementById('todo');

    var item = document.createElement('li');
    item.innerText = text;

    var buttons = document.createElement('div');
    buttons.classList.add('buttons');

    var remove = document.createElement('button');
    remove.classList.add('remove');
    remove.innerHTML = removeSVG;

    // Add click event for remove item
    remove.addEventListener('click', removeItem);

    var complete = document.createElement('button');
    complete.classList.add('complete');
    complete.innerHTML = completeSVG;

    // Add click event for completing item
    complete.addEventListener('click', completeItem);

    buttons.appendChild(remove);
    buttons.appendChild(complete);
    item.appendChild(buttons);

    list.insertBefore(item, list.childNodes [0]);
}

