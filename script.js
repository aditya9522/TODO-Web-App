let todoList = new Array();

window.onload = function () {
    document.getElementById('loader').style.display = 'none';
    document.getElementsByClassName('main-div')[0].style.display = 'block';
    const storage = JSON.parse(localStorage.getItem('todoItems'));
    if (storage === null) {
        
        let date = new Date();
        todoList = [
            {item: 'Start with demo todo to continue', date: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDay()}`, status: false},
        ];
        localStorage.setItem('todoItems', JSON.stringify(todoList));                   // it is setted when all todo items removed
    }
    todoList = JSON.parse(localStorage.getItem('todoItems'));

    displayTodoList();
    document.querySelector('.popup').style.display = 'block'; // should be block
}

function removePopUp() {
    document.querySelector('.popup').style.display = 'none';
}

function changeStatus(todoListIndex, checkboxId, className) {
    let isChecked = document.querySelector(`#${checkboxId}`).checked;
    let elements = document.getElementsByClassName(className);
    
    for (let index in elements) {
        if (isChecked) {
            elements[index].classList.add('status-completed'); 
            todoList[todoListIndex]['status'] = true;
            localStorage.setItem('todoItems', JSON.stringify(todoList));
        }
        else {
            elements[index].classList.remove('status-completed');
            todoList[todoListIndex]['status'] = false;
            localStorage.setItem('todoItems', JSON.stringify(todoList));
        }
    }
    displayTodoList();
}

function notGetInput () {
    document.querySelector('#todo-input').style.border = '2px solid red';
    document.querySelector('#date-input').style.border = '2px solid red';

    alert(`❌ Error →

            🔸  We did not get any input, please write the todo and date.
            🔸  All fields are mandatory. `)
}

function addItem() {
    let todoInput = document.querySelector('#todo-input');
    let dateInput = document.querySelector('#date-input');
    let todo = todoInput.value;
    let date = dateInput.value;

    if (todo && date) {
        todoInput.value = '';
        dateInput.value = '';
        todoList.push({item: todo, date: date, status: false});
        localStorage.setItem('todoItems', JSON.stringify(todoList));
        document.querySelector('.added-success').style.display = 'block';
        document.querySelector('#todo-input').style.border = '2px solid green';
        document.querySelector('#date-input').style.border = '2px solid green';
        displayTodoList();

        setTimeout(() => {
            document.querySelector('.added-success').style.display = 'none';  // to remove success popup
        }, 6000);
    }
    else {
        notGetInput();
    }
}

function copyURL() {
    let url = document.location.href;
    // url.select()
    // document.execCommand("copy")
    console.log(url)   
    document.querySelector('.copy-url').style.display = 'block';

    setTimeout(() => {
        document.querySelector('.copy-url').style.display = 'none';  // to remove copy popup
    }, 5000);

}

function deleteItem(index) {
    todoList.splice(index, 1); 
    localStorage.setItem('todoItems', JSON.stringify(todoList));
    displayTodoList(); 
}

function displayTodoList() {

    let todoListElement = document.querySelector('.todo-list');
    let todoListTitle =`<div class="list-title">Status</div>
                        <div class="list-title">Title</div>
                        <div class="list-title">Date</div>
                        <div class="list-title">Action</div>

                        <hr color='green'><hr color='green'><hr color='green'><hr color='green'>`;
    todoListElement.innerHTML = todoListTitle;
    
    let newHTML = '';
    for (let index = 0; index < todoList.length; index ++){
        let {item, date, status} = todoList[index];
        if (status) {
            newHTML += `<input type="checkbox" name="status" id="status-${index}" onclick="changeStatus(${index}, 'status-${index}', 'check-${index}')" checked><span class="todoItems check-${index} status-completed">${item}</span><span class='todoItems check-${index} status-completed'>${date}</span><button type="button" id="delete-button" onclick="deleteItem(${index});">Delete</button>`
        }
        else {
            newHTML += `<input type="checkbox" name="status" id="status-${index}" onclick="changeStatus(${index}, 'status-${index}', 'check-${index}')"><span class='todoItems check-${index}'">${item}</span><span class='todoItems check-${index}'>${date}</span><button type="button" id="delete-button" onclick="deleteItem(${index});">Delete</button>`
        }
    }
    todoListElement.innerHTML = todoListTitle + newHTML;

}

