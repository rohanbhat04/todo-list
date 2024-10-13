let todoinput = document.querySelector(".todoinput");
let addbutton = document.querySelector(".addtask");
let deletebutton = document.querySelector(".deletebutton");

let todoul = document.querySelector(".todolistul");
let inputform = document.querySelector("form");

const todoLists = JSON.parse(localStorage.getItem("todoList")) || [];

todoLists.forEach((todo) => {
  addTodoDOM(todo);
});

function addTodoDOM(todoText) {
  let todoli = document.createElement("li");
  todoli.className = "todoli";
  todoli.innerHTML = `<input type="checkbox" id="todo1">
            <label for="todo1" class="customcheckbox">
                <i class="ri-check-fill"></i>
            </label>
            <label for="todo1"  class="todotext" id="todo">
                ${todoText}
            </label>
            <label ><button class="deletebutton">
                <i class="ri-delete-bin-2-line"></i>
            </button></label>`;
  todoul.appendChild(todoli);
}

inputform.addEventListener("submit", (e) => {
  e.preventDefault();
  let todotext = todoinput.value;
  addTodoDOM(todotext);
  todoinput.value = "";
  todoLists.push(todotext);

  localStorage.setItem("todoList", JSON.stringify(todoLists));
});

todoul.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const li = btn.closest("li");
  const indexOfLi = [...todoul.children].indexOf(li);
  li.remove();
  todoLists.splice(indexOfLi, 1);

  localStorage.setItem("todoList", JSON.stringify(todoLists));
});
