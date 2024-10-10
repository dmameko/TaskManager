import { CommonModule } from "@angular/common";
import { Component, DestroyRef, EventEmitter, inject, Input, Output } from "@angular/core";
import { TodoItem } from "../../models/todo-item.interface";
import { TodoService } from "../../services/todo.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  standalone: true,
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  providers: [TodoService],
  imports: [
    CommonModule,
  ],
})
export class TodoItemComponent {
  @Input() public todoItem!: TodoItem;
  @Output() public listUpdated = new EventEmitter();

  private _todoService = inject(TodoService);
  private _destroyRef = inject(DestroyRef);

  public doneItem() {
    this._todoService.doneTodo(this.todoItem._id).pipe(
      takeUntilDestroyed(this._destroyRef)
    ).subscribe();
    this.listUpdated.emit();
  }

  public deleteItem() {
    this._todoService.deleteTodo(this.todoItem._id).pipe(
      takeUntilDestroyed(this._destroyRef)
    ).subscribe();
    this.listUpdated.emit();
  }
}
