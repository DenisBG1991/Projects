import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToDo } from '../../shared/todo';

@Component({
  selector: 'todo-list',
  templateUrl: './toDoList.component.html',
  styleUrls: ['./toDoLIst.component.css']
})

export class ToDoListComponent {
  @Input() todos: ToDo[];
  @Output() del: EventEmitter<ToDo> = new EventEmitter();
  @Output() toggle: EventEmitter<ToDo> = new EventEmitter();

  onDelete(todo: ToDo) {
    this.del.emit(todo);
  };

  onToggle(todo: ToDo) {
    this.toggle.emit(todo);
  };
}
