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
}

class Project {
    constructor(title) {
        this.title = title;
        this.todoList = [];
    }

    addTodo(title, description, dueDate, priority, complete) {
        this.todoList.push(new Todo(title, description, dueDate, priority, complete));
    }

    getTodo(index) {
        return this.todoList[index];
    }
}

class Todo {
    constructor(title, description, dueDate, priority, complete) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
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