// Select DOM elements
const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const List = document.getElementById("todo-list");

//Try to load todos from localStorage (if any)
const saved = localStorage.getItem("todos");
const todos = saved ? JSON.parse(saved) : [];

function saveTodos() {
  // Save todos to localStorage
  localStorage.setItem("todos", JSON.stringify(todos));
}

//create a dom node for a todo object and append it to the list
function createTodoNode(todo, index) {
  const li = document.createElement("li");

  //checkbox to toggle completion
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = !!todo.completed;
  checkbox.addEventListener("change", () => {
    todo.completed = checkbox.checked;

    // TODO: Visual feedback: strike-through when completed
    textSpan.style.textDecoration = todo.completed ? "line-through" : "";
    saveTodos();
  });

  // text of the todo
  const textSpan = document.createElement("span");
  textSpan.textContent = todo.text;
  textSpan.style.margin = "0 8px";
  if (todo.completed) {
    textSpan.style.textDecoration = "line-through";
  }
  //Add double-click event to edit the todo text
  textSpan.addEventListener("dblclick", () => {
    const newText = prompt("Edit todo:", todo.text);
    if (newText !== null) {
      todo.text = newText.trim();
      textSpan.textContent = todo.text;
      saveTodos();
    }
  });

  // Delete Todo Button
  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.addEventListener("click", () => {
    todos.splice(index, 1);
    render();
    saveTodos();
  });

  li.appendChild(checkbox);
  li.appendChild(textSpan);
  li.appendChild(delBtn);
  return li;
}

//Render the whole todo list from todos array
function render() {
  List.innerHTML = "";

  //Recreate each item
  todos.forEach((todo, index) => {
    const node = createTodoNode(todo, index);
    List.appendChild(node);
  });
}

function addTodo() {
  const text = input.value.trim();
  if (!text) {
    return;
  }

  // Push a new todo object
  todos.push({ text: text, completed: false });
  input.value = "";
  render();
  saveTodos();
}

addBtn.addEventListener("click", addTodo);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});
render();

