import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { TodoItemComponent } from "./components/todo-item/todo-item.component";
import { TodoItem } from "./models/todo-item.interface";
import { activeItems, doneItems } from "./mocks/todo-items.mock";

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    CommonModule,
    TodoItemComponent,
  ],
})
export class HomePageComponent implements OnInit {
  public activeItems: TodoItem[] = [];
  public doneItems: TodoItem[] = [];

  public ngOnInit(): void {
    if (!this.activeItems.length) {
      this.activeItems = [...activeItems];
    }

    if (!this.doneItems.length) {
      this.doneItems = [...doneItems];
    }
  }

  public add() {
    
  }
}