class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
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