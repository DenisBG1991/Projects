import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './shared/data.service';

import { AppComponent } from './app.component';
import { TodosComponent } from './todos/todos.components';
import { ToDoFormComponent } from './todos/ToDoForm/toDoForm.component';
import { ToDoListComponent } from './todos/ToDoList/toDoList.component';
import { ToDoItemComponent } from './todos/ToDoItem/toDoItem.component';
import { ToDoService } from './shared/todo.service';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    ToDoFormComponent,
    ToDoListComponent,
    ToDoItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  providers: [ ToDoService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
