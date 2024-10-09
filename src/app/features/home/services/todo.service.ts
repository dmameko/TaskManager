import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private _baseUrl = 'https://localhost:5000/api';

  constructor(private _http: HttpClient) {}

  public getTodoList() {
    return this._http.get(`${this._baseUrl}/todos`);
  }

  public createTodo(title: string) {
    return this._http.post(`${this._baseUrl}/todos`, { title });
  }

  public deleteTodo(id: string): Observable<void> {
    return this._http.delete<void>(`${this._baseUrl}/todos/${id}`);
  }
}
