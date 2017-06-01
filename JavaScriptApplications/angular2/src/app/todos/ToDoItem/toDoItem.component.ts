import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToDo } from '../../shared/todo';

@Component({
  selector: 'todo-item',
  templateUrl: './toDoItem.component.html',
  styleUrls: ['./toDoItem.component.css']
})

export class ToDoItemComponent {
  @Input() todo: ToDo;
  @Output() del: EventEmitter<any> = new EventEmitter();
  @Output() toggle: EventEmitter<any> = new EventEmitter();

  onToggle(){
    this.toggle.emit(this.todo);
  };

  onDelete(){
    this.del.emit(this.todo);
  };
}
