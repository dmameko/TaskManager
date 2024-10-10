import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { TodoItem } from "../models/todo-item.interface";

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private _baseUrl = 'http://localhost:3000/api';
  private token = localStorage.getItem('token');
  private headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

  constructor(private _http: HttpClient) {}

  public getTodoList(): Observable<TodoItem[]> {
    return this._http.get<TodoItem[]>(`${this._baseUrl}/todos`, { headers: this.headers }).pipe(
      catchError(error => {
        console.error('Error fetching todos:', error);
        return throwError(error); // Make sure to rethrow the error after logging
      }),
    );;
  }

  public createTodo(title: string) {
    return this._http.post(`${this._baseUrl}/todos`, { title }, { headers: this.headers });
  }

  public deleteTodo(id: string): Observable<void> {
    return this._http.delete<void>(`${this._baseUrl}/todos/${id}`, { headers: this.headers });
  }

  public doneTodo(id: string): Observable<void> {
    return this._http.put<void>(`${this._baseUrl}/todos/${id}/active`, { active: false }, { headers: this.headers });
  }
}
