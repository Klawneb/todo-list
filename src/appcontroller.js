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

    removeTodo(index) {
        this.todoList.splice(index, 1);
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

    addTask(title, complete) {
        this.taskList.push(new Task(title, complete));
    }

    getTask(index) {
        return this.taskList[index];
    }

    areTasksCompleted() {
        for (let i=0;i<this.taskList.length;i++) {
            if (this.taskList[i].complete === false) {
                return false;
            }
        }
        return true;
    }

    removeTask(index) {
        this.taskList.splice(index, 1);
    }

    toggleComplete() {
        this.complete = !this.complete;
    }

    getNumRemainingTasks() {
        let total = 0;
        this.taskList.forEach((task) => {
            if (!task.complete) {
                total++;
            }
        })
        return total;
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