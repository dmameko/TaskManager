import { CommonModule } from "@angular/common";
import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { TodoItemComponent } from "./components/todo-item/todo-item.component";
import { TodoItem } from "./models/todo-item.interface";
import { AuthService } from "../../core/services/auth.service";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { AddEditTodoPopupComponent } from "./components/add-edit-todo-popup/add-edit-todo-popup.component";
import { DialogService } from "../../shared/dialog/dialog.service";
import { TodoService } from "./services/todo.service";
import { FormsModule } from "@angular/forms";
import { take } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    AuthService,
    HttpClient,
    TodoService,
    DialogService,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TodoItemComponent,
    HttpClientModule,
    AddEditTodoPopupComponent,
  ],
})
export class HomePageComponent implements OnInit {
  public activeItems: TodoItem[] = [];
  public doneItems: TodoItem[] = [];
  public searchValue = '';

  private _authService = inject(AuthService);
  private _dialogService = inject(DialogService);
  private _todoService = inject(TodoService);
  private _destroyRef = inject(DestroyRef);

  public ngOnInit(): void {
    this.fetchList();
  }

  public add(type: 'add' | 'edit') {
    this._dialogService.open(
      AddEditTodoPopupComponent,
      {
        data: type,
      },
    ).afterClosed().pipe(take(1)).subscribe(data => {
      if (data) {
        this._todoService.createTodo(data.title).subscribe();
        this.fetchList();
      }
    });
  }

  public logout() {
    this._authService.logout();
  }

  public fetchList() {
    this._todoService.getTodoList().pipe(
      takeUntilDestroyed(this._destroyRef)
    ).subscribe(items => {
      this.activeItems = [...items.filter(item => item.active)];
      this.doneItems = [...items.filter(item => !item.active)];
    });
  }

  public filter() {
    if (this.searchValue.trim() === '') {
      this.fetchList();
    } else {
      const searchLower = this.searchValue.toLowerCase();
      this.activeItems = this.activeItems.filter(item => 
        item.title.toLowerCase().includes(searchLower)
      );
      this.doneItems = this.doneItems.filter(item => 
        item.title.toLowerCase().includes(searchLower)
      );
    }
  }  
}