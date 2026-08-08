import { initialTodos, validationConfig } from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import Todo from "../components/Todo.js";

const addTodoButton = document.querySelector(".button_action_add");

const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todoTemplate = document.querySelector("#todo-template");
const todosList = document.querySelector(".todos__list");

//Form Validation
const formValidation = new FormValidator(validationConfig, addTodoForm)
formValidation.enableValidation();

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});


//GENERATES TODOs
const generateTodo = (data) => {
  const todoElement = new Todo(data, todoTemplate);
  console.log(todoElement);
  return todoElement.getView();
};

//Append Todos
const renderTodo = (item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
}

//Innitial Todos
initialTodos.forEach((item) => {
    renderTodo(item);
});

// APPENDS TODOs
addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  const values = { name, date };


  renderTodo(values);
  closeModal(addTodoPopup);
  formValidation.resetValidation();
});
