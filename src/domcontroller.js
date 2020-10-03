import {AppController} from "./appcontroller";

let app = new AppController();
let container = document.querySelector("#content");

export class DOMController {
    static createProjectCard(title) {
        let projectCard = document.createElement("div");
        projectCard.classList.add("project-card");

        let projectHeader = document.createElement("div");
        projectHeader.classList.add("project-header");
        
        let projectTitle = document.createElement("h2");
        projectTitle.textContent = title;

        let removeButton = document.createElement("button");
        removeButton.textContent = "Remove project";

        let todoContainer = document.createElement("div");
        todoContainer.classList.add("todo-container");

        let newTodoButton = document.createElement("button");
        newTodoButton.textContent = "New Todo";

        projectHeader.append(projectTitle, removeButton);
        projectCard.append(projectHeader, todoContainer, newTodoButton);

        return projectCard;
    }

    static addCard(title) {
        container.appendChild(this.createProjectCard(title));
    }
}