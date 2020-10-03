import {AppController} from "./appcontroller";

let app = new AppController();
let container = document.querySelector("#content");
let formContainer = document.querySelector("#form-container");
let newProjectButton = document.querySelector("#newproject");
newProjectButton.addEventListener("click", () => {
    formContainer.appendChild(DOMController.createProjectInputForm());
})

export class DOMController {
    static renderProjects() {
        container.innerHTML = "";
        app.projects.forEach((project, index) => {
            container.appendChild(this.createProjectCard(project.title))
        });
    }

    static createProjectInputForm() {
        let inputForm = document.createElement("div");
        inputForm.classList.add("input-form");

        let projectTitle = document.createElement("h2");
        projectTitle.textContent = "Project Title:"

        let projectTitleInput = document.createElement("input");

        let addProjectButton = document.createElement("button");
        addProjectButton.textContent = "Add Project";
        addProjectButton.addEventListener("click", () => {
            app.addProject(projectTitleInput.value);
            this.renderProjects()
            formContainer.innerHTML = "";
        })

        inputForm.append(projectTitle, projectTitleInput, addProjectButton);
        return inputForm;
    }

    static createProjectCard(title, index) {
        let projectCard = document.createElement("div");
        projectCard.classList.add("project-card");

        let projectHeader = document.createElement("div");
        projectHeader.classList.add("project-header");
        
        let projectTitle = document.createElement("h2");
        projectTitle.textContent = title;

        let removeButton = document.createElement("button");
        removeButton.textContent = "Remove project";
        removeButton.addEventListener("click", () => {
            app.removeProject(index);
            this.renderProjects();
        })

        let todoContainer = document.createElement("div");
        todoContainer.classList.add("todo-container");

        let newTodoButton = document.createElement("button");
        newTodoButton.textContent = "New Todo";

        projectHeader.append(projectTitle, removeButton);
        projectCard.append(projectHeader, todoContainer, newTodoButton);

        return projectCard;
    }

    static createTodoCard(title, description, dueDate, numTasksRemaining) {
        let todoCard = document.createElement("div");
        todoCard.classList.add("todo-card");

        let todoTitle = document.createElement("h3");
        todoTitle.textContent = title;

        let todoDescription = document.createElement("p");
        todoDescription.textContent = description;

        let todoDate = document.createElement("p");
        todoDate.textContent = dueDate;

        let tasksRemaining = document.createElement("p");
        tasksRemaining.textContent = `${numTasksRemaining} tasks remaining`;

        todoCard.append(todoTitle, todoDescription, todoDate, tasksRemaining);
        return todoCard;
    }

    static addCard(title) {
        container.appendChild(this.createProjectCard(title));
    }
}