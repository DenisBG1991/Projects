import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'todo-form',
  templateUrl: './toDoForm.component.html',
  styleUrls: ['./toDoForm.component.css']
})

export class ToDoFormComponent {
  Title: string = '';
  @Output() create: EventEmitter<string> = new EventEmitter();

  onSubmit() {
    this.create.emit(this.Title);
  };
}
