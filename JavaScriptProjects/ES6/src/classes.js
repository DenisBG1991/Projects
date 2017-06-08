class Task {
    constructor(title = Task.getDefaultTitle()) {
        Task.count += 1;
        this.title = title;
        this._done = false;
    }

    get done() {
        return this._done === true ? "Выполнена" : "Не выполнена";
    }

    set done(value) {
        if (value !== undefined && typeof value === "boolean") {
            this._done = true;
        } else {
            console.error("Укажите значение либо true, либо false");
        }
    }

    complete() {
        this.done = true;
        console.log(`Задача ${this.title} выполнена!`);
    }

    static getDefaultTitle() {
        return "Позвони мне!";
    }
}

Task.count = 0;

let task = new Task("Позвони Марине");

console.log(task.done, task._done);

task.complete();

console.log(task.done, task._done);