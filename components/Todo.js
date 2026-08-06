import { v4 as uuidv4 } from "https://jspm.dev/uuid";

class Todo {
    constructor(data, selector) {
        this._data = data;
        this._templateElement = selector;
        this.id = uuidv4();
    };

    _setEventListeners(deleteButton, todoElement) {
        deleteButton.addEventListener("click", () => {
            todoElement.remove();
        });
    }

    _generateCheckedBoxes = (todoElement) => {
        const todoCheckboxEl = todoElement.querySelector(".todo__completed");
        const todoLabel = todoElement.querySelector(".todo__label");
        todoCheckboxEl.checked = this._data.completed;
        todoCheckboxEl.id = `todo-${this.id}`;
        todoLabel.setAttribute("for", `todo-${this.id}`);

    }

    getView = () => {
        const todoElement = this._templateElement.content
            .querySelector(".todo")
            .cloneNode(true);
        const todoNameEl = todoElement.querySelector(".todo__name");
        const todoDate = todoElement.querySelector(".todo__date");
        const todoDeleteBtn = todoElement.querySelector(".todo__delete-btn");

        
        todoNameEl.textContent = this._data.name;

        this._generateCheckedBoxes(todoElement);


        const dueDate = new Date(this._data.date);
        if (!isNaN(dueDate)) {
            todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            })}`;
        }

        this._setEventListeners(todoDeleteBtn, todoElement);

        return todoElement;
    };
}

    export default Todo;