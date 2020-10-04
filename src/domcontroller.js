import { AppController } from "./appcontroller";
import { format } from "date-fns"

export class DOMController {
    constructor() {
        this.app = new AppController();
        this.container = document.querySelector("#content");
        this.formContainer = document.querySelector("#form-container");
        this.newProjectButton = document.querySelector("#newproject");
    }

    renderProjects() {
        this.container.innerHTML = "";
        this.app.projects.forEach((project, index) => {
            this.container.appendChild(this.createProjectCard(project, index))
        });
    }

    createProjectInputForm() {
        let inputForm = document.createElement("div");
        inputForm.classList.add("focus-view");

        let projectTitle = document.createElement("h2");
        projectTitle.textContent = "Project Title:"

        let projectTitleInput = document.createElement("input");

        let addProjectButton = document.createElement("button");

        addProjectButton.textContent = "Add Project";
        addProjectButton.addEventListener("click", () => {
            if (projectTitleInput.value) {
                this.app.addProject(projectTitleInput.value);
                this.renderProjects()
                this.formContainer.innerHTML = "";
            } else {
                alert("Please enter a value");
            }
        });

        inputForm.append(projectTitle, projectTitleInput, addProjectButton);
        return inputForm;
    }

    createTodoInputForm(project) {
        let inputForm = document.createElement("div");
        inputForm.classList.add("focus-view");

        let todoName = document.createElement("h2");
        todoName.textContent = "Todo name:"

        let todoNameInput = document.createElement("input");

        let todoDescription = document.createElement("h2");
        todoDescription.textContent = "Description:"

        let todoDescriptionInput = document.createElement("input");

        let todoDate = document.createElement("h2");
        todoDate.textContent = "Date due:"

        let todoDateInput = document.createElement("input");
        todoDateInput.setAttribute("type", "date");

        let addTodoButton = document.createElement("button");
        addTodoButton.textContent = "Add Project";
        addTodoButton.addEventListener("click", () => {
            project.addTodo(todoNameInput.value, todoDescriptionInput.value, new Date(todoDateInput.value), false);
            this.renderProjects();
            this.formContainer.innerHTML = "";
        })

        inputForm.append(todoName, todoNameInput, todoDescription, todoDescriptionInput,
            todoDate, todoDateInput, addTodoButton);

        return inputForm;
    }

    createProjectCard(project, index) {
        let projectCard = document.createElement("div");
        projectCard.classList.add("project-card");

        let projectHeader = document.createElement("div");
        projectHeader.classList.add("project-header");

        let projectTitle = document.createElement("h2");
        projectTitle.textContent = project.title;

        let removeButton = document.createElement("button");
        removeButton.textContent = "Remove project";
        removeButton.addEventListener("click", () => {
            this.app.removeProject(index);
            this.renderProjects();
        })

        let todoContainer = document.createElement("div");
        todoContainer.classList.add("todo-container");

        project.todoList.forEach((todo) => {
            let todoCard = this.createTodoCard(todo);
            todoContainer.appendChild(todoCard);
        })

        let newTodoButton = document.createElement("button");
        newTodoButton.textContent = "New Todo";
        newTodoButton.addEventListener("click", () => {
            this.formContainer.appendChild(this.createTodoInputForm(project));
        })

        projectHeader.append(projectTitle, removeButton);
        projectCard.append(projectHeader, todoContainer, newTodoButton);

        return projectCard;
    }

    createTodoCard(todo) {
        let todoCard = document.createElement("div");
        todoCard.classList.add("todo-card");

        let todoHeader = document.createElement("div");
        todoHeader.classList.add("todo-card-header");

        let todoTitle = document.createElement("h3");
        todoTitle.textContent = todo.title;

        let todoDate = document.createElement("p");
        todoDate.textContent = format(todo.dueDate, "do MMM yy");

        let todoDescription = document.createElement("p");
        todoDescription.textContent = todo.description;

        let todoComplete = document.createElement("p");
        todoComplete.textContent = "Uncompleted";

        let tasksRemaining = document.createElement("p");
        tasksRemaining.textContent = `${todo.getNumRemainingTasks()} tasks remaining`;

        let todoFooter = document.createElement("div");
        todoFooter.classList.add("todo-card-footer");

        todoHeader.append(todoTitle, todoDate)
        todoFooter.append(todoComplete, tasksRemaining)
        todoCard.append(todoHeader, todoDescription, todoFooter);
        
        todoCard.addEventListener("click", () => {
            this.formContainer.appendChild(this.createTodoView(todo));
        })

        return todoCard;
    }

    createTodoView(todo) {
        let todoView = document.createElement("div");
        todoView.classList.add("focus-view");

        let todoComplete = document.createElement("input");
        todoComplete.type = "checkbox";
        todoComplete.addEventListener("change", () => {
            todo.toggleComplete();
        })

        let todoHeader = document.createElement("div");
        todoHeader.classList.add("todo-view-header");
        
        let todoTitle = document.createElement("h2");
        todoTitle.textContent = todo.title;

        let todoDate = document.createElement("p");
        todoDate.textContent = format(todo.dueDate, "do MMM yy");

        todoHeader.append(todoTitle, todoDate);

        let todoCenter = document.createElement("div");
        todoCenter.classList.add("todo-view-center");

        let todoDescription = document.createElement("p");
        todoDescription.textContent = todo.description;

        let newTaskButton = document.createElement("button");
        newTaskButton.textContent = "New Task";
        newTaskButton.addEventListener("click", () => {
            this.formContainer.appendChild(this.createTaskInputForm(todo));
        })

        let todoTasklist = document.createElement("div");
        todoTasklist.classList.add("todo-view-tasklist");
        todoTasklist.appendChild(newTaskButton);
        todo.taskList.forEach((task, index) => {
            todoTasklist.appendChild(this.createTaskCard(task, todo, index));
        })
        
        todoCenter.append(todoDescription, todoTasklist);
        todoView.append(todoHeader, todoCenter);
        
        return todoView;
    }

    createTaskCard(task, todo, index) {
        let taskCard = document.createElement("div");
        taskCard.classList.add("task-card");

        let taskCheckbox = document.createElement("input");
        taskCheckbox.type = "checkbox";
        taskCheckbox.addEventListener("change", () => {
            task.toggleComplete();
        })

        let taskTitle = document.createElement("p");
        taskTitle.textContent = task.title;

        let removeTaskButton = document.createElement("button");
        removeTaskButton.textContent = "Remove task";
        removeTaskButton.addEventListener("click", () => {
            todo.removeTask(index);
            this.formContainer.innerHTML = "";
            this.formContainer.appendChild(this.createTodoView(todo));
        })

        taskCard.append(taskCheckbox, taskTitle, removeTaskButton);
        
        return taskCard;
    }

    createTaskInputForm(todo) {
        let inputForm = document.createElement("div");
        inputForm.classList.add("focus-view");

        let taskTitle = document.createElement("h2");
        taskTitle.textContent = "Task Title:"

        let taskTitleInput = document.createElement("input");

        let addTaskButton = document.createElement("button");

        addTaskButton.textContent = "Add Task";
        addTaskButton.addEventListener("click", () => {
            todo.addTask(taskTitleInput.value);
            this.formContainer.innerHTML = "";
            this.formContainer.appendChild(this.createTodoView(todo));
        });

        inputForm.append(taskTitle, taskTitleInput, addTaskButton);
        return inputForm;
    }

    start() {
        this.newProjectButton.addEventListener("click", () => {
            this.formContainer.appendChild(this.createProjectInputForm());
        })
    }
}