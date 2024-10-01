const todoForm = document.querySelector("form");
const todoListUL = document.getElementById('todolist');
const todoInput = document.querySelector('.inputText');

let allTodos = [getTodos()];
updateTodolist();

todoForm.addEventListener("submit", function(e){
    e.preventDefault();
    addTodo();

})

function addTodo(){
    let todoText = todoInput.value.trim();
    if(todoText.length > 0){
        const todoObject = {
            text: todoText,
            completed: false
        }
        allTodos.push(todoObject);
        updateTodolist(); 
        saveTodo();
        todoInput.value = "";

    }
}

function updateTodolist(){
    todoListUL.innerHTML = "";
    allTodos.forEach((todo, todoIndex)=>{
        todoItem = createTodoItem(todo, todoIndex);
        todoListUL.append(todoItem);
    })
}

function createTodoItem(todo, todoIndex){
    const todoId = "todo-"+todoIndex;
    let todoLI = document.createElement("li");
    const todoText = todo.text;
    todoInput.value = "";
    todoLI.className = "todo";
    todoLI.innerHTML = `
     
                    <input type="checkbox" id="${todoId}" >
                    <label for="${todoId}" class="customcheckbox">
                        <i class="ri-check-fill"></i>
                    </label>
                    <label for="${todoId}" class="todo-text">
                        ${todoText}
                    </label>
                    <button class="dlt-btn">
                        <i class="ri-delete-bin-line"></i>
                    </button>
                
    `

    const deleteButton = todoLI.querySelector(".dlt-btn");
    deleteButton.addEventListener("click", ()=>{
        deleteTodoItem(todoIndex);
    })
    const checkbox = todoLI.querySelector("input");
    checkbox.addEventListener("change", ()=>{
        allTodos[todoIndex].completed = checkbox.checked;
        saveTodos();
    })
    checkbox.checked = todo.completed;
    return todoLI;
}

function deleteTodoItem(todoIndex){
    allTodos = allTodos.filter((_, i)=> i !==todoIndex);
    saveTodos();
    updateTodolist();
}


function saveTodos() {
    const todosJson = JSON.stringify(allTodos)
    localStorage.setItem("todos", todosJson);

}

function getTodos(){
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}
