import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { TodoItem } from "../../models/todo-item.interface";

@Component({
  standalone: true,
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  imports: [
    CommonModule,
  ],
})
export class TodoItemComponent {
  @Input() public todoItem!: TodoItem;

  public doneItem() {
    console.log(this.todoItem);
  }

  public deleteItem() {
    console.log(this.todoItem);
  }
}
