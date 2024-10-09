import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, take, tap } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api'; 

  constructor(
    private _http: HttpClient,
    private _router: Router,
  ) {}

  public login(username: string, password: string): Observable<any> {
    return this._http.post(`${this.baseUrl}/auth/login`, { username, password }).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  public register(username: string, password: string): Observable<any> {
    return this._http.post(`${this.baseUrl}/auth/register`, { username, password }).pipe(
      take(1),
      tap((response: any) => {
        console.log(response);

        if (response.token) {
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  public logout() {
    localStorage.removeItem('token');
    this._router.navigate(['/', 'login']);
  }
}
