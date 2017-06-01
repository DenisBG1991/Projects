interface IToDo {
  title: string;
  completed: boolean;
}

export class ToDo implements IToDo {
  id: number;
  constructor(public title: string,
              public completed: boolean = false){}
}
