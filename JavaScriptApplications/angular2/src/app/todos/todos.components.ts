import { Component, OnInit } from '@angular/core';
import { ToDoService } from '../shared/todo.service';
import { ToDo } from '../shared/todo';

@Component({
  selector: 'todos',
  templateUrl: 'todos.components.html',
  styleUrls: ['todos.components.css']
})

export class TodosComponent implements OnInit{
  todos: ToDo[];

  constructor(private todoService: ToDoService) {
    this.todos = [];
  };

  ngOnInit() {
    this.todoService.getTodos()
      .subscribe(todos => this.todos = todos);
  };

  create(title: string) {
    this.todoService.createTodo(title).subscribe(todo => this.todos.push(todo));
  }

  del(todo: ToDo) {
    this.todoService.deleteTodo(todo).subscribe(res => {
      let index = this.todos.indexOf(todo);
      if (index > -1) {
        this.todos.splice(index, 1);
      }
    });
  };

  toggle(todo: ToDo) {
    this.todoService.toggleTodo(todo).subscribe(res => {
      todo.completed = !todo.completed;
    });
  };
}
