export class Todo {
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