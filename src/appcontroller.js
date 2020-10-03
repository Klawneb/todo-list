export class AppController {
    constructor() {
        this.projects = [];
    }

    addProject(title) {
        this.projects.push(new Project(title));
    }

    getProject(index) {
        return this.projects[index];
    }

    removeProject(index) {
        this.projects.splice(index, 1);
    }
}

class Project {
    constructor(title) {
        this.title = title;
        this.todoList = [];
    }

    addTodo(title, description, dueDate, complete) {
        this.todoList.push(new Todo(title, description, dueDate,  complete));
    }

    getTodo(index) {
        return this.todoList[index];
    }
}

class Todo {
    constructor(title, description, dueDate, complete) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.complete = complete;
        this.taskList = [];
    }

    addTask(title) {
        this.taskList.push(new Task(title, false));
    }

    getTask(index) {
        return this.taskList[index];
    }

    toggleComplete() {
        this.complete = !this.complete;
    }

    getNumRemainingTasks() {
        return this.taskList.length;
    }
}

class Task {
    constructor(title, complete) {
        this.title = title;
        this.complete = complete;
    }

    toggleComplete() {
        this.complete = !this.complete;
    }
}