import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { TodoItemComponent } from "./components/todo-item/todo-item.component";
import { TodoItem } from "./models/todo-item.interface";
import { activeItems, doneItems } from "./mocks/todo-items.mock";
import { AuthService } from "../../core/services/auth.service";
import { HttpClient, HttpClientModule } from "@angular/common/http";

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    AuthService,
    HttpClient,
  ],
  imports: [
    CommonModule,
    TodoItemComponent,
    HttpClientModule,
  ],
})
export class HomePageComponent implements OnInit {
  public activeItems: TodoItem[] = [];
  public doneItems: TodoItem[] = [];

  private _authService = inject(AuthService);

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

  public logout() {
    this._authService.logout();
  }
}