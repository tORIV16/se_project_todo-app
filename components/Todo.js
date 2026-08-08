import { v4 as uuidv4 } from "https://jspm.dev/uuid";

class Todo {
    constructor(data, template, id) {
        this._data = data;
        this.id = data.id; // uuidv4();
        this.template = template;
        this._todoElement = template.content.querySelector(".todo").cloneNode(true);
        this.label = this._todoElement.querySelector(".todo__label");
        this.name = this._todoElement.querySelector(".todo__name");
        this.date = this._todoElement.querySelector(".todo__date");
        this.checkbox = this._todoElement.querySelector(".todo__completed");
        this.deleteButton = this._todoElement.querySelector(".todo__delete-btn");
    };

    _setIds() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }

    _setEventListeners() {
        this.deleteButton.addEventListener("click", () => {
            this.todoElement.remove();
        });
    }

    _generateCheckedBoxes = () => {
        this.checkbox.checked = this._data.completed;
        this.checkbox.id = `todo-${this.id}`;
        this.label.setAttribute("for", `todo-${this.id}`);

    }

    getView = () => {
        this.name.textContent = this._data.name;
        const dueDate = new Date(this._data.date);
        if (!isNaN(this._data.date)) {
            this.date.textContent = `Due: ${dueDate.toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            })}`;
        }
        this._setIds()
        this._generateCheckedBoxes();
        this._setEventListeners();
        return this._todoElement;
    };
}

    export default Todo;